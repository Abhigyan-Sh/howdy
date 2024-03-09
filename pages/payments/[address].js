import { useRouter } from 'next/router'
import PaymentNavbar from '@components/layout/PaymentNavbar'
import SendPayments from '@components/payments/SendPayments'
import Services from '@components/payments/Services'
import TransactionHistory from '@components/payments/TransactionHistory'
import Footer from '@components/layout/Footer'

const payments = () => {
  const router = useRouter()
  return (
    <div className='gradient-bg-welcome'>
      <PaymentNavbar />
      <SendPayments address={router.query.address} />
      <Services />
      <TransactionHistory />
      <Footer />
    </div>
  )
}

export default payments