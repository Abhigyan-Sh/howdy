import { useEffect, useState, createContext, useContext } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/transactions/constants'

let ethereum
const TransactionContext = createContext()

const TransactProvider = ({ children }) => {
  const ALCHEMY_API = process.env.NEXT_PUBLIC_ALCHEMY_API
  
  const [ userAccount, setUserAccount ] = useState('')
  const [ formData, setFormData ] = useState({ 
    addressTo: '', amount: '', keyword: '', message: ''
  })
  const [isLoading, setIsLoading ] = useState(false)
  const [ transactionCount, setTransactionCount ] = useState()
  const [transactions, setTransactions] = useState([])

  const handleChange = (e, name) => {
    setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
  }

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
      contractAddress, 
      contractABI, 
      signer
    )
    // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API}')
    // const transactionContract = new ethers.Contract(contractAddress, contractABI, provider)
    
    // const code = await provider.getCode(contractAddress)
    // console.log(code)
    return transactionContract
  }
  
  const getAllTxn = async() => {
    try {
      if (ethereum) {
        const transfer_contract = await getContract()
        // console.log(Object.keys(transfer_contract.getAllTransactions))
        const available_transactions = await transfer_contract.getAllTransactions()
        // console.log(available_transactions)
        const structured_transactions = 
          available_transactions.map((transaction) => ({
            addressTo: transaction.receiver, 
            addressFrom: transaction.sender, 
            timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message, 
            keyword: transaction.keyword, 
            amount: parseInt(transaction.amount._hex) / (10 ** 18)
          }))
        console.log(structured_transactions)
        setTransactions(structured_transactions)
      }
      else {
        console.log('no ethereum object !')
      }
    }
    catch (error) {
      console.log(error)
      throw new Error('error while parsing')
    }
  }

  const detectWallet = async () => {
    try {
      if(!ethereum) 
        return alert('please install metamask !')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      // console.log(accounts)
      if (accounts.length) {
        setUserAccount(accounts[0])
      } else {
        console.log('no accounts found')
      }
      // if(!accounts.length) return
      // getAllTxn()
    }
    catch (error) {
      console.log(error)
      throw new error('No ethereum object !')
    }
  }

  const connectWallet = async () => {
    try {
      if(!ethereum) 
        return alert('please install metamask !')
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      setUserAccount(accounts[0])
    }
    catch (error) {
      console.log(error)
      throw new Error('no ethereum object !')
    }
  }

  const sendTransaction = async () => {
    try {
      if(!ethereum) 
        return alert('install metamask wallet !')

      setIsLoading(true)
      // get smart-contract and get input form data
      const { addressTo, amount, keyword, message } = formData
      const transactionContract = await getContract()

      /* STEP 1/2: send transaction (first instance where wallet 
        appears for user confirmation or sign) */
      const parsedAmount = ethers.utils.parseEther(amount)
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: userAccount, 
          to: addressTo, 
          gas: '0x5208', 
          value: parsedAmount._hex,
        }]
      })
      setIsLoading(false)

      /* STEP 2/2: transact data on blockchain (second instance where 
        wallet appears for user confirmation or sign) */
      const transactionHash = await transactionContract
          .addToBlockchain(addressTo, parsedAmount, message, keyword)
      setIsLoading(true)
      console.log(`loading: ${transactionHash.hash}`)
      await transactionHash.wait()
      setIsLoading(false)
      console.log(`Success: ${transactionHash.hash}`)

      // local data update
      const transactionCount = await transactionContract.getTransactionCount()
      setTransactionCount(transactionCount.toNumber())
      // update the state after transaction
      setFormData({ addressTo: '', amount: '', keyword: '', message: '' })
      getAllTxn()
    } catch (error) {
      console.log(error)
      throw new error ('no ethereum object !')
    }
  }

  const detectWalletTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await getContract()
        // console.log(Object.keys(transactionsContract.getTransactionCount))
        const currentTransactionCount = await transactionsContract.getTransactionCount()
        window.localStorage.setItem('transactionCount', currentTransactionCount)
      }
    } catch (error) {
      console.log(error)
      throw new Error('ethereum absent')
    }
  }
  
  useEffect(() => {
    if(!window) return
    
    ethereum = window.ethereum
    setTransactionCount(localStorage.getItem('transactionCount'))
    detectWallet()
  }, [])

  useEffect(() => {
    if(!userAccount) return

    detectWalletTransactions()
    getAllTxn()
  }, [userAccount])

  return (
    <TransactionContext.Provider value= {{
      connectWallet, 
      userAccount, 
      formData, 
      setFormData, 
      handleChange, 
      sendTransaction, 
      transactions, 
      isLoading
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

const transactionState = () => (
  useContext(TransactionContext)
)

export { TransactProvider, transactionState }
export default TransactProvider