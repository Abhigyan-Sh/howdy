import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { 
    FormControl, 
    FormLabel, 
    FormErrorMessage, 
    FormHelperText, 
    Stack, HStack, VStack, 
    useToast } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import axios from 'axios'

const Signup = () => {
  const [ show, setShow ] = useState(false)
  const handleShow = () => setShow(!show)
  const toast = useToast()
  const [ loading, setLoading ] = useState(false)
  const [ picLoading, setPicLoading ] = useState(false)
  const [pic, setPic] = useState()
  const { register, handleSubmit, watch, formState: {errors} } = useForm()

  const postDetails = (pics) => {
    setPicLoading(true)

    if (pics === undefined) {
      toast ({
        title: "Please Select an Image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      setPicLoading(false)
      return
    }
    /*@dev::: we upload blob to cloudinary and 
    get url to access img as response */
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
        console.log(data.url.toString())
        setPicLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false)
      return
    }
  }
  const onSubmit = async (data) => {
    // console.log(data)
    setPicLoading(true)
    if (!data.username || !data.emailId || !data.password || !data.confirmPassword){
      toast ({
        title: "Please fill all the required fields !",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      setPicLoading(false)
    }
    if (data.password !== data.confirmPassword) {
      toast ({
        title: "Passwords do not match !",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      setPicLoading(false)
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      const { data } = await axios.post(
        '/api/user', 
        {
          username: data.username, 
          email:data.emailId, 
          password: data.password, 
          pic,
        }, 
        config)
        toast ({
          title: "Registration is successful !",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        setLoading(false)
        history.push('/chats')
    } catch (err) {
      toast ({
        title: "Error Occurred !",
        description: err.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
    }
  }
  console.log(pic)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="10px">
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input 
                  {...register('username')}
                  type='text'
                  placeholder= 'username'/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input 
                  {...register('emailId')}
                  type='email'
                  placeholder= 'email address'/>
                <FormHelperText>We will never share your email.</FormHelperText>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>password</FormLabel>
                <InputGroup>
                    <Input 
                      {...register('password')}
                      type= {show ? 'text' : 'password'}
                      placeholder= 'password'/>
                    <InputRightElement>
                      <Button pr='1.5rem' onClick={handleShow}>
                       {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>confirm password</FormLabel>
                <InputGroup>
                    <Input 
                      {...register('confirmPassword')}
                      type= {show ? 'text' : 'password'}
                      placeholder= 'confirm password'/>
                    <InputRightElement>
                      <Button pr='1.5rem' onClick={handleShow}>
                       {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            {/* <FormControl>
                <FormLabel>upload your picture</FormLabel>
                <Input 
                  {...register('profilePic')}
                  type='file'
                  accept= '/image/*'/>
            </FormControl> */}
            <FormControl>
                <FormLabel>upload your picture</FormLabel>
                <Input 
                  type='file'
                  accept= 'image/*'
                  onChange = {e => postDetails(e.target.files[0])}/>
            </FormControl>
            <Button 
                type='submit'
                width='100%'
                colorScheme="blue"
                mt='2rem'
                isLoading = {picLoading}> Sign-in
            </Button>
        </VStack>
    </form>
  )
}
export default Signup