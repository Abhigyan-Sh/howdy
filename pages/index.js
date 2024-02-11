import { useState } from 'react'
import Head from 'next/head'
import { Container, Box, Stack, Tab } from '@mui/material/'
import { TabContext, TabList, TabPanel } from '@mui/lab/'

import homeStyles from '../styles/Home.module.css'
import Signin from '../components/authentication/Signin'
import Signup from '../components/authentication/Signup'

const Home = () => {
  /* @dev:: [DISCARDED CODE BELOW ⚰️] below doesn't work when put inside 
  useEffect(), actually later realized I should keep it outside useEffect() 
  and it works then but then realized why not to handle it in ChatProvider.js
  // useEffect(() => {
  //   const { user } = chatState()
  //   if(user) {
  //     router.push('/chats')
  //   }
  // }, [router]) */

  const [value, setValue] = useState('2')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>howdy</title>
        <meta name="description" content="howdy chat application. Connect with people." />
        <link rel="icon" href="../assets/logo.png" />
      </Head>
      
      <Container className='w-2/6 h-lvh bg-rose-20'>
        {/* box 1 */}
        <Box className='pt-32 pb-12'>
          <Stack spacing={3}>
            <p className='text-5xl'>&#128274; Authorize user</p>
          </Stack>
        </Box>
        {/* box 2 */}
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="sign up or sign in">
                <Tab label="Sign up" value="1" />
                <Tab label="Sign in" value="2" />
              </TabList>
            </Box>
            {/* sign-up or sign-in */}
            <TabPanel value="1">
              <Signup />
            </TabPanel>
            <TabPanel value="2">
              <Signin />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </div>
  )
}

export default Home