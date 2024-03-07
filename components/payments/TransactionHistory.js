import { transactionState } from '../../context/TransactProvider'
import { TrimAddress } from '../../utils/transactions/TrimAddress'
import { useFetch } from '../../utils/transactions/useFetch'

const TransactionCard = ({ 
  keyword, 
  message, 
  timestamp, 
  addressFrom, 
  amount, 
  addressTo 
}) => {
  const gifUrl = useFetch(keyword)
  return (
    <div className='text-white bg-[#181918] m-4 flex flex-col flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] p-3 rounded-md hover:shadow-2xl'>
      <div className='flex flex-col items-center w-full mt-3'>
        <div className='w-full mb-6 p-2'>
          <a 
            href={`https://sepolia.etherscan.io/address/${addressFrom}`} 
            target= '_blank' 
            rel='noopener noreferrer'
          >
            <p className='text-white text-base'>
              from: <span className='text-blue-500 hover:underline hover:underline-offset-1'>{TrimAddress(addressFrom, 20)}</span>
            </p>
          </a>
          <a 
            href={`https://sepolia.etherscan.io/address/${addressTo}`} 
            target= '_blank' 
            rel='noopener noreferrer'
          >
            <p className='text-white text-base'>
              to: <span className='text-blue-500 hover:underline hover:underline-offset-1'>{TrimAddress(addressTo, 20)}</span>
            </p>
          </a>
          <p className='text-white text-base'>amount: {amount} ether</p>
          {message && (
            <>
              <br/>
              <p className='text-white text-base'>
                  message: {message}
              </p>
            </>
          )}
        </div>
        <img 
          src= {gifUrl} 
          alt= 'gif' 
          className='w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover hidden sm:block'
        />
          <div className='bg-black p-3 rounded-full px-5 w-max mt-5 shadow-2xl'>
            <p className='text-[#e389b9]'>{timestamp}</p>
          </div>
      </div>
    </div>
  )
}

const Transaction = () => {
  const { userAccount, transactions, transactionCount } = transactionState()
  return (
    <>
      <div className='gradient-bg-services h-[14rem] w-full'></div>
      <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
        <div className='flex flex-col md:p-12 py-12 px-0 sm:px-4'>
          {userAccount ? (
            <h1 className='text-white text-2xl sm:text-3xl text-center my-2'>
              Latest Transactions.. 
              <p className='text-slate-400 text-bold text-sm'>
                on application transactions: {transactionCount}
              </p>
            </h1>
          ) : (
            <h1 className='text-white text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
              Connect your wallet to see more..
            </h1>
          )}
          <div className='flex flex-wrap justify-center items-center mt-10'>
            {transactions.slice().reverse().map((transaction, index) => (
              <TransactionCard key={index} {...transaction} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Transaction