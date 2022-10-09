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

const Signin = () => {
  const [ show, setShow ] = useState(false)
  const handleShow = () => setShow(!show)
  const { register, handleSubmit, watch, formState: {errors} } = useForm()
  const onSubmit = (data) => {
    console.log(data)
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
            {/*  */}
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
                mt='2rem'> Sign-in
            </Button>
        </VStack>
    </form>
  )
}

export default Signin