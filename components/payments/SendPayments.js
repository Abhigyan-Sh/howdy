import { useEffect } from 'react'
import BarLoader from 'react-spinners/BarLoader'
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import { transactionState } from '../../context/TransactProvider'
import { TrimAddress } from '../../utils/transactions/TrimAddress'
import { InputPay } from '../elements/Input'

const SendPayments = ({ address }) => {
  const { 
    connectWallet, 
    userAccount, 
    formData, 
    setFormData, 
    handleChange, 
    sendTransaction, 
    isLoading 
  } = transactionState()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { addressTo, amount, keyword, message } = formData
    
    if (!addressTo || !amount || !keyword || !message) return
    sendTransaction()
  }
  useEffect(() => {
    setFormData({ addressTo: address })
  }, [])
  return (
    <div className='flex w-full justify-center items-center gradient-bg-services'>
      <div className='flex mf:flex-row flex-col items-start justify-between px-0 md:p-20 py-12 w-10/12'>
        <div className='flex flex-1 justify-start items-start flex-col mf:mr-10 w-full sm:w-11/12'>
          {/* connect button */}
          {!userAccount && (
            <button 
              type='button' 
              onClick={connectWallet}
              className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover: bg-[2546bd]'>
                <p className='text-white text-base font-semibold'>connect wallet</p>
            </button>
          )}
          {/* card element & input area */}
          <div className='flex flex-col items-center justify-around w-full gap-8 md:gap-14 mt-10 lg:flex-row'>
            {/* card element */}
            <div className='p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full eth-card white-glassmorphism'>
              <div className='flex justify-between flex-col w-full h-full'>
                <div className='flex justify-between items-start'>
                  <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                    <SiEthereum fontSize={21} color='#fff'/>
                  </div>
                  <BsInfoCircle fontSize={17} color='#fff' />
                </div>
                <div>
                  <p className='text-white font-light tracking-wider text-sm'>
                    0x {TrimAddress(userAccount, 20)}
                  </p>
                  <p className='text-white font-semibold text-lg mt-1'>
                    ETHEREUM
                  </p>
                </div>
              </div>
            </div>
            {/* input area */}
            <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
              <div className='my-2 w-full text-white text-sm'>
                <p className='tracking-wider'>paying to: </p>
                <p className='p-2 break-words'>
                  {formData.addressTo}
                </p>
              </div>
              <InputPay 
                placeholder='Amount (ETH)' 
                name='amount' 
                type='number' 
                handleChange={handleChange} />
              <InputPay 
                placeholder='keyword (GIF)' 
                name='keyword' 
                type='text' 
                handleChange={handleChange} />
              <InputPay 
                placeholder='enter message' 
                name='message' 
                type='text' 
                handleChange={handleChange} />
              <div className='my-2' />
              {isLoading ? (
                <BarLoader 
                  color='white' 
                  margin={2} 
                  width={'100%'} 
                  size={55} 
                  speedMultiplier={1} />
              ) : (
                <button
                  type='button'
                  onClick={handleSubmit}
                  className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c ] rounded-full pointer-cursor'
                >
                  send now !
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendPayments