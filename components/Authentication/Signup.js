import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { LoadingButton } from '@mui/lab';
import { 
  FormControl, 
  InputLabel, 
  Input, 
  FormHelperText 
} from '@mui/material';
import SnackbarToast from '../../utils/SnackbarToast.js';

const Signup = () => {
  const [ show, setShow ] = useState(false);
  const [ open, onOpen ] = useState(false);
  const [ message, setMessage ] = useState("");
  const [ severity, setSeverity ] = useState("");
  const [ loader, setLoader ] = useState(false);

  const [pic, setPic] = useState();
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  
  const handleShow = () => setShow(!show);
  const handleClose = () => onOpen(false);
  const handleClick = () => onOpen(true);
  const setToastVisible = ({_message, _severity}) => {
    setMessage(_message);
    setSeverity(_severity);
    handleClick();
  }

  const postDetails = (pics) => {
    setLoader(true)
    if (pics === undefined) {
      setToastVisible({
        _message: "Please Select an Image !", 
        _severity: "warning"
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
        _severity: "warning"
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
        _severity: "error"
      });
      setLoader(false);
      return;
    }
    if (data.password !== data.confirmPassword) {
      setToastVisible({
        _message: "Passwords do not match !", 
        _severity: "error"
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
            _severity: "success"
          });
          localStorage.setItem('userInfo', JSON.stringify(response));
          Router.push('/chats');
          setLoader(false);
        })
    } catch (err) {
      setToastVisible({
        _message: "Error Occurred !", 
        _severity: "error"
      });
      setLoader(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex'>
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
        <FormControl>
          <InputLabel htmlFor="password-id">password</InputLabel>
          <div className='flex justify-between'>
            <Input 
              {...register('password')}
              type= {show ? 'text' : 'password'}
              id="password-id"
              autoComplete="true" />
            <button pr='1.5rem' onClick={handleShow}>
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </FormControl>
        {/* -------confirm password------- */}
        <FormControl>
          <InputLabel htmlFor="confirmPassword-id">confirm password</InputLabel>
          <div className='flex justify-between'>
            <Input 
              {...register('confirmPassword')}
              type= {show ? 'text' : 'password'}
              id="confirmPassword-id" 
              autoComplete="true" />
            <button pr='1.5rem' onClick={handleShow}>
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </FormControl>
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
          <InputLabel htmlFor="picture-id">upload your picture</InputLabel>
          <Input 
            type='file'
            accept= 'image/*'
            onChange = {e => postDetails(e.target.files[0])}
            id="picture-id"
            autoComplete="true" />
        </FormControl>
        {/* -------submit button------- */}
        {loader ? (
          <LoadingButton
            type='submit' 
            variant="contained"
            className='mt-2 text-black font-bold'
            loading>
              Sign-up
          </LoadingButton>
        ) : (
          <LoadingButton
            type='submit' 
            variant="contained"
            className='mt-2 text-black font-bold'>
              Sign-up
          </LoadingButton>
        )}
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
      </div>
    </form>
  )
}

export default Signup;