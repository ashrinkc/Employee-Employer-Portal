import { Stack, Paper, styled, Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
}));
const LandingPage = () => {
  const navigate = useNavigate()
  return(
    <>
  <Box sx={{ width: '100%', paddingTop:20}}>
  <Stack spacing={5}>
    <Button variant="contained" onClick={()=>navigate('/adminLogin')}>Admin</Button>
    <Button variant="contained" onClick={()=>navigate('/employer')}>Employer</Button>
    <Button variant="contained" onClick={()=>(navigate('employeeLogin'))}>Employee</Button>
  </Stack>
  </Box>
  </>
  )
  }

export default LandingPage