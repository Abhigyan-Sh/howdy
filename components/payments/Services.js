import { FaShieldVirus } from 'react-icons/fa'
import { FaStudiovinari } from 'react-icons/fa'
import { GiHand } from 'react-icons/gi'
import { BsSearch } from 'react-icons/bs'

const ServiceCard = ({ color, title, icon, subtitle }) => {
  return (
    <div className='flex-3 flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl'>
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
        {icon}
      </div>
      <div className='ml-5 flex flex-col flex-1'>
        <h3 className='mt-2 text-white text-lg'>{title}</h3>
        <p className='mt-1 text-white text-sm'>
          {subtitle}
        </p>
      </div>
    </div>
  )
}
const Services = () => {
  return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full md:w-3/4 mx-0 md:mx-auto gradient-bg-transactions'>
        <ServiceCard 
          color='bg-sky-500'
          // color='bg-[#2952E3]'
          title='Secure transactions'
          icon={<FaShieldVirus fontSize={21} className='text-white' />}
          subtitle='Security is one thing that everyone in the world is always concerned about.In a time where all the data is easily available on the internet, it becomes mandatory to pay special attention to it.'
        />
        <ServiceCard 
          color='bg-amber-300'
          title='Speed helps you scale.'
          icon={<FaStudiovinari fontSize={21} className='text-black' />}
          subtitle='Cryptos are disrupting traditional wire transfers which can take hours, days, or even weeks to clear. While digital funds offer frictionless and faster cross-border solutions.'
        />
        <ServiceCard 
          color='bg-rose-200'
          // color='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
          title='Trust worthy ?'
          icon={<GiHand fontSize={21} className='text-black' />}
          subtitle='crypto provides swift transactions which can be traced down to the users and can be used to provide any legal proof of a ownership of balance.'
        />
        <ServiceCard 
          color='bg-violet-500'
          title='Traceability'
          icon={<BsSearch fontSize={21} className='text-white' />}
          subtitle='Blockchain-based traceability has the potential to identify counterfeits or fake transactions, tracking/tracing product origin, and supply chain activities at the same time can ease paperwork processing.'
        />
      </div>
  )
}

export default Services