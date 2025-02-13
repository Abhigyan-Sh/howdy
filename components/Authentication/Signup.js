import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import { 
  FormControl, 
  InputLabel, 
  Input, 
  FormHelperText, 
  Stack, 
  Button 
} from '@mui/material'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { useSnackbar } from '@context/index'

const Signup = () => {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  const router = useRouter()
  const { showSnackbar } = useSnackbar()

  const [ showPass, setShowPass ] = useState(false)
  const [ showConfirmPass, setShowConfirmPass ] = useState(false)
  const [ loader, setLoader ] = useState(false)

  const [pic, setPic] = useState()
  const { register, handleSubmit, watch, formState: {errors} } = useForm()
  
  const handleShowPass = () => 
    setShowPass(!showPass)
  const handleShowConfirmPass = () => 
    setShowConfirmPass(!showConfirmPass)

  const postDetails = (pics) => {
    setLoader(true)
    if (pics === undefined) {
      showSnackbar({
        message: "Please Select an Image !", 
        severity: "warning", 
      })
      setLoader(false)
      return
    }
    if (pics.type === 'image/jpg' || pics.type === 'image/jpeg' || pics.type === 'image/png'
    ) {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', uploadPreset)
      data.append('cloud_name', cloudName)
      fetch('https://api.cloudinary.com/v1_1/'+ cloudName +'/image/upload', {
        method: 'post',
        body: data,
      })
      .then((res) => res.json())
      .then((data)=> {
        setPic(data.url.toString())
        setLoader(false)
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      showSnackbar({
        message: "Please Select an Image (jpg, jpeg, png) !", 
        severity: "warning", 
      })
      setLoader(false)
      return
    }
  }
  const onSubmit = async (data) => {
    setLoader(true)
    if (!data.username || !data.emailId || !data.password || !data.confirmPassword) {
      showSnackbar({
        message: "Please fill all the required fields !", 
        severity: "error", 
      })
      setLoader(false)
      return
    }
    if (data.password !== data.confirmPassword) {
      showSnackbar({
        message: "Passwords do not match !", 
        severity: "error", 
      })
      setLoader(false)
      return
    }
    
    fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: data.username, 
        email: data.emailId, 
        password: data.password, 
        pic,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(data => data.json())
    .then(response => {
      if(response.statusCode && [400, 500].includes(response.statusCode)) {
        showSnackbar({
          message: response.error, 
          severity: 'error', 
        })
      } else if(response.statusCode === 201) {
        showSnackbar({
          message: response.message, 
          severity: 'success', 
        })
        router.push('/checkYourMail')
      }
    })
    .catch((error) => {
      showSnackbar({
        message: `error while parsing: ${error.message}`, 
        severity: "error", 
      })
    })
    .finally(() => {
      setLoader(false)
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className='flex flex-col bg-rose-10 justify-between gap-6'> */}
      <Stack spacing={2}>
        {/* -------username------- */}
        <FormControl>
          <InputLabel htmlFor="username-id">Username</InputLabel>
          <Input 
            {...register('username')}
            // {...register('username', {required: true, minLength: 3})}
            type='text'
            id="username-id"
            autoComplete="username" />
        </FormControl>
        {/* -------email------- */}
        <FormControl>
          <InputLabel htmlFor="email-id">Email address</InputLabel>
          <Input 
            {...register('emailId')}
            type='email'
            id="email-id" 
            autoComplete="email" 
            aria-describedby="helper-text-email" />
          <FormHelperText id="helper-text-email">We'll never share your email.</FormHelperText>
        </FormControl>
        {/* -------password ------- */}
        <div className='flex flex-row justify-between'>
          <FormControl>
            <InputLabel htmlFor="password-id">password</InputLabel>
            <Input 
              {...register('password')}
              type= {showPass ? 'text' : 'password'}
              id="password-id"
              autoComplete="current-password" />
          </FormControl>
          <Button variant="outlined" onClick={handleShowPass}>
            {showPass 
            ? <IoIosEyeOff style={{ color: 'black', fontSize: '24px' }} title="hide" />
            : <IoIosEye style={{ color: '#0369a1', fontSize: '24px' }} title="look" />}
          </Button>
        </div>
        {/* -------confirm password------- */}
        <div className='flex flex-row justify-between'>
          <FormControl>
            <InputLabel htmlFor="confirmPassword-id">confirm password</InputLabel>
            <Input 
              {...register('confirmPassword')}
              type= {showConfirmPass ? 'text' : 'password'}
              id="confirmPassword-id" 
              autoComplete="current-password" />
          </FormControl>
          <Button variant="outlined" onClick={handleShowConfirmPass}>
            {showConfirmPass 
            ? <IoIosEyeOff style={{ color: 'black', fontSize: '24px' }} title="hide" />
            : <IoIosEye style={{ color: '#0369a1', fontSize: '24px' }} title="look" />}
          </Button>
        </div>
        {/* DISCARDED INPUT CODE BELOW ⚰️ */}
        {/* upload your picture */}
        {/* <FormControl>
              <FormLabel>upload your picture</FormLabel>
              <Input 
                {...register('profilePic')}
                type='file'
                accept= '/image/*'/>
          </FormControl> */}
        {/* -------upload your picture------- */}
        <FormControl>
          <InputLabel htmlFor="picture-id"></InputLabel>
          <Input 
            type='file'
            id="picture-id"
            accept= 'image/*'
            onChange = {e => postDetails(e.target.files[0])}
            // className=''
            autoComplete="on" />
        </FormControl>
        {/* -------submit button------- */}
        <div className='mb-4'></div>
        <LoadingButton
          type='submit' 
          variant="contained"
          className='mt-2 text-black font-bold hover:text-white'
          loading={loader}>
            Sign-up
        </LoadingButton>
      </Stack>
      {/* </div> */}
    </form>
  )
}

export default Signup