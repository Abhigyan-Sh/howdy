import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
  FormControl, 
  FormLabel, 
  FormErrorMessage, 
  FormHelperText, 
  Stack, HStack,
  VStack, useToast } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
// import axios from 'axios'
import Router from 'next/router'

const Signin = () => {
  const [ show, setShow ] = useState(false)
  const handleShow = () => setShow(!show)
  const [ loading, setLoading ] = useState(false)
  const { register, handleSubmit, watch, formState: {errors} } = useForm()
  const toast = useToast()

  const onSubmit = async (data) => {
    // console.log(data)
    setLoading(true)
    if (!data.emailId || !data.password) {
      toast ({
        title: "Please fill in all the fields !",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
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
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(data => data.json())
      // data has ok(true for 201 & 200) & status properties from 
      // class response, well now converting that to a promise 
      .then(response => {
        // console.log(response.statusCode)
        if (response.statusCode === 401) {
          toast({
            title: response.message,
            // description: err.response.data.message,
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "bottom",
          });
        } else if (response.statusCode === 200) {
            toast({
              title: "Login Successful",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "bottom",
            })
            localStorage.setItem("userInfo", JSON.stringify(response))
            // history.push("/chats")
            Router.push('/chats')
          }
          setLoading(false)
      })
    } catch (err) {
      toast({
        title: "Error Occurred!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="10px">
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

            <Button 
                type='submit'
                width='100%'
                colorScheme="blue"
                mt='2rem'
                isLoading = {loading}>
                  Sign-in
            </Button>
        </VStack>
    </form>
  )
}

export default Signin