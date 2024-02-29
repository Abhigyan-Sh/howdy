import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { LoadingButton } from '@mui/lab'
import { 
  FormControl, 
  InputLabel, 
  Input, 
  Stack, 
  Button 
} from '@mui/material'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import SnackbarToast, { setToastVisible } from '../widgets/SnackbarToast'

const Signin = () => {
  const [ show, setShow ] = useState(false)
  const [ loader, setLoader ] = useState(false)
  const [ message, setMessage ] = useState("")
  const [ open, onClose ] = useState(false)
  const [ severity, setSeverity ] = useState("")

  const { register, handleSubmit, watch, formState: {errors} } = useForm()
  
  const handleShow = () => setShow(!show)
  const handleClose = () => onClose(false)

  const onSubmit = async (data) => {
    setLoader(true)
    if (!data.emailId || !data.password) {
      setToastVisible({
        _message: "Please fill in all the fields !", 
        _severity: "warning", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onClose
      })
      setLoader(false)
      return
    }
    try {
      // const user = await axios.post(
      //   '/api/user/signin', 
      //   { email: data.emailId, password: data.password }
      // )
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
            setToastVisible({
              _message: "Unauthorized Request: " + response.message, 
              _severity: "error", 
              setMessage: setMessage, 
              setSeverity: setSeverity, 
              onOpen: onClose
            })
          } else if (response.statusCode === 200) {
            setToastVisible({
              _message: "Login Successful", 
              _severity: "success", 
              setMessage: setMessage, 
              setSeverity: setSeverity, 
              onOpen: onClose
            })
            localStorage.setItem('userInfo', JSON.stringify(response))
            Router.push('/chats')
          }
          setLoader(false)
        })
    } catch (err) {
      setToastVisible({
        _message: "Error Occurred ! " + err.response.data.message, 
        _severity: "error", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onClose
      })
      setLoader(false)
    }
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
            autoComplete="true" />
        </FormControl>
        {/* -------password------- */}
        <div className='flex flex-row justify-between'>
          <FormControl required>
            <InputLabel htmlFor="password-id">password</InputLabel>
            <Input 
              {...register('password')}
              type= {show ? 'text' : 'password'}
              id="password-id"
              autoComplete="true" />
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
        {/* -------toast------- */}
        <SnackbarToast 
          // key={"key-00"} 
          message={message} 
          open={open} 
          onClose={handleClose} 
          delay={5000} 
          vertical="bottom" 
          horizontal="center" 
          severity={severity} 
          variant="filled"
          sx={{ width: '100%' }} 
          actionNumber={1} 
        />
      </Stack>
    </form>
  )
}

export default Signin