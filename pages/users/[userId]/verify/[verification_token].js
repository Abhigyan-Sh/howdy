import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { PacmanLoader } from 'react-spinners'
import { useSnackbar } from '../../../../context/SnackbarToast'
import { getBaseUrl } from '../../../../utils/getBaseUrl'

export default function verification_token ({ statusCode, error, ...user }) {
  const router = useRouter()
  const { showSnackbar } = useSnackbar()
  
  useEffect(() => {
    if(statusCode && [400, 401, 404, 500].includes(statusCode)) {
      showSnackbar({
        message: error, 
        severity: 'error', 
      })
    } else {
      showSnackbar({
        message: `${user.username} you're verified 🙀; ⚡`, 
        severity: 'success', 
      })
      localStorage.setItem('userInfo', JSON.stringify(user))
      router.push('/chats')
    }
  }, [])
  return (
    <div className='w-full h-screen bg-black text-slate-200 flex flex-row items-center justify-center'>
      <PacmanLoader 
        color='white'
        margin={0}
        size={30}
        speedMultiplier={1}
      />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { userId, verification_token: verificationTokenIs } = params

  const response = await fetch(`${getBaseUrl()}/api/user/verify_user`, {
    method: 'POST',
    body: JSON.stringify({ 
      userId, 
      verification_token: verificationTokenIs 
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  .then(response => response.json())
  .then(data => data)

  return {
    props: {
      ...response
    }
  }
}