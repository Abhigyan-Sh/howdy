import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
    FormControl, 
    FormLabel, 
    FormErrorMessage, 
    FormHelperText, 
    Stack, HStack, 
    VStack } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

const Signup = () => {
  const [ show, setShow ] = useState(false)
  const handleShow = () => setShow(!show)
  const { register, handleSubmit, watch, formState: {errors} } = useForm()
  const onSubmit = (data) => {
    if (data.profilePic) {
        console.log('exists now')
    }
    console.log(data)
  }
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
            <FormControl>
                <FormLabel>upload your picture</FormLabel>
                <Input 
                  {...register('profilePic')}
                  type='file'
                  placeholder= 'upload your profile picture'
                  accept= '/image/*'/>
            </FormControl>
            <Button 
                type='submit'
                width='100%'
                colorScheme="blue"
                mt='2rem'> Sign-in
            </Button>
        </VStack>
    </form>
  )
}

export default Signup