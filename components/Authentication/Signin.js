import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import { 
  FormControl, 
  InputLabel, 
  Input, 
  Stack, 
  Button 
} from '@mui/material'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { useSnackbar } from '../../context/SnackbarToast'

const Signin = () => {
  const router = useRouter()
  const { showSnackbar } = useSnackbar()
  const [ show, setShow ] = useState(false)
  const [ loader, setLoader ] = useState(false)

  const { register, handleSubmit, watch, formState: {errors} } = useForm()
  
  const handleShow = () => 
    setShow(!show)

  const onSubmit = async (data) => {
    setLoader(true)

    if (!data.emailId || !data.password) {
      showSnackbar({
        message: "Please fill in all the fields !", 
        severity: "warning", 
      })
      setLoader(false)
      return
    }

    fetch('/api/user/signin', {
      method: 'POST',
      body: JSON.stringify({ 
        email: data.emailId, 
        password: data.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(data => data.json())
    /* @dev::: data has ok(true for 201 & 200) & status properties from 
    class response, well now converting that to a promise */
    .then(response => {
      if (response.statusCode === 401) {
        showSnackbar({
          message: "Unauthorized Request: " + response.message, 
          severity: "error", 
        })
      } else if (response.statusCode === 200) {
        showSnackbar({
          message: "Login Successful", 
          severity: "success", 
        })
        localStorage.setItem('userInfo', JSON.stringify(response))
        router.push('/chats')
      }
    })
    .catch((err) => {
      showSnackbar({
        message: "Error Occurred ! " + err, 
        severity: "error", 
      })
    })
    .finally(() => {
      setLoader(false)
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {/* -------email------- */}
        <FormControl required>
          <InputLabel htmlFor="email-id">Email address</InputLabel>
          <Input 
            {...register("emailId")} 
            type="email" 
            id="email-id" 
            autoComplete="email" />
        </FormControl>
        {/* -------password------- */}
        <div className='flex flex-row justify-between'>
          <FormControl required>
            <InputLabel htmlFor="password-id">password</InputLabel>
            <Input 
              {...register('password')} 
              type= {show ? 'text' : 'password'}
              id="password-id"
              autoComplete="password" />
          </FormControl>
          <Button variant="outlined" onClick={handleShow}>
            {show 
            ? <IoIosEyeOff style={{ color: 'black', fontSize: '24px' }} title="hide" /> 
            : <IoIosEye style={{ color: '#0369a1', fontSize: '24px' }} title="look" />}
          </Button>
        </div>
        {/* -------submit button------- */}
        <div className='mb-4'></div>
        <LoadingButton
          type='submit' 
          variant="contained"
          className='mt-2 text-black font-bold hover:text-white'
          loading={loader}>
            Sign-in
        </LoadingButton>
      </Stack>
    </form>
  )
}

export default Signin