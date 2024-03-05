import PaymentNavbar from '../components/layout/PaymentNavbar'
import SendPayments from '../components/payments/SendPayments'
import Services from '../components/payments/Services'
import TransactionHistory from '../components/payments/TransactionHistory'
import Footer from '../components/layout/Footer'

const payments = () => {
  return (
    <div className='gradient-bg-welcome'>
      <PaymentNavbar />
      <SendPayments />
      <Services />
      <div className='gradient-bg-services h-[14rem] w-full'></div>
      <TransactionHistory />
      <Footer />
    </div>
  )
}

export default payments