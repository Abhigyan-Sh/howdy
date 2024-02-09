import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { LoadingButton } from '@mui/lab';
import { 
  FormControl, 
  InputLabel, 
  Input, 
  FormHelperText, 
  Stack, 
  Button 
} from '@mui/material';
import SnackbarToast, { setToastVisible } from '../../utils/SnackbarToast.js';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const [ showPass, setShowPass ] = useState(false);
  const [ showConfirmPass, setShowConfirmPass ] = useState(false);
  const [ open, onOpen ] = useState(false);
  const [ message, setMessage ] = useState("");
  const [ severity, setSeverity ] = useState("");
  const [ loader, setLoader ] = useState(false);

  const [pic, setPic] = useState();
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  
  const handleShowPass = () => setShowPass(!showPass);
  const handleShowConfirmPass = () => setShowConfirmPass(!showConfirmPass);
  const handleClose = () => onOpen(false);

  const postDetails = (pics) => {
    setLoader(true)
    if (pics === undefined) {
      setToastVisible({
        _message: "Please Select an Image !", 
        _severity: "warning", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onOpen
      });
      setLoader(false);
      return;
    }
    if (pics.type === 'image/jpg' || pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'howdie')
      data.append('cloud_name', 'dfgh07xa9')
      fetch('https://api.cloudinary.com/v1_1/dfgh07xa9/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data)=> {
          setPic(data.url.toString())
          setLoader(false)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setToastVisible({
        _message: "Please Select an Image (jpg, jpeg, png) !", 
        _severity: "warning", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onOpen
      });
      setLoader(false)
      return
    }
  }
  const onSubmit = async (data) => {
    setLoader(true);
    if (!data.username || !data.emailId || !data.password || !data.confirmPassword) {
      setToastVisible({
        _message: "Please fill all the required fields !", 
        _severity: "error", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onOpen
      });
      setLoader(false);
      return;
    }
    if (data.password !== data.confirmPassword) {
      setToastVisible({
        _message: "Passwords do not match !", 
        _severity: "error", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onOpen
      });
      setLoader(false);
      return;
    }
    try {
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
          setToastVisible({
            _message: "Registration is successful !", 
            _severity: "success", 
            setMessage: setMessage, 
            setSeverity: setSeverity, 
            onOpen: onOpen
          });
          localStorage.setItem('userInfo', JSON.stringify(response));
          Router.push('/chats');
          setLoader(false);
        })
    } catch (err) {      
      setToastVisible({
        _message: "Error Occurred !", 
        _severity: "error", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onOpen
      });
      setLoader(false);
    }
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
            autoComplete="true" />
        </FormControl>
        {/* -------email------- */}
        <FormControl>
          <InputLabel htmlFor="email-id">Email address</InputLabel>
          <Input 
            {...register('emailId')}
            type='email'
            id="email-id" 
            autoComplete="true" 
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
              autoComplete="true" />
          </FormControl>
          <Button variant="outlined" onClick={handleShowPass}>
            {showPass 
            ? <VisibilityOffIcon className="text-black" color="" titleAccess="hide"/> 
            : <VisibilityIcon className="text-black" titleAccess="look"/>}
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
              autoComplete="true" />
          </FormControl>
          <Button variant="outlined" onClick={handleShowConfirmPass}>
            {showConfirmPass 
            ? <VisibilityOffIcon className="text-black" color="" titleAccess="hide"/> 
            : <VisibilityIcon className="text-black" titleAccess="look"/>}
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
            className='bg-rose-10 '
            autoComplete="true" />
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
        {/* -------toast------- */}
        <SnackbarToast 
          // key={"key-00"} 
          message={message} 
          open={open} 
          onClose={handleClose} 
          transition="SlideTransition" 
          delay={5000} 
          vertical="bottom" 
          horizontal="center" 
          severity={severity} 
          variant="filled"
          sx={{ width: '100%' }} 
          actionNumber={1} 
        />
      </Stack>
      {/* </div> */}
    </form>
  )
}

export default Signup;