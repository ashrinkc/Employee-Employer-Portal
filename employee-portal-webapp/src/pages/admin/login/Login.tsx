import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import axios from 'axios'
import './login.scss'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const [username,setUsername] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const adminData = await axios.post('http://localhost:5000/api/admin/login',{username,password})
        if(adminData.data.success){
            localStorage.setItem("access-token",adminData.data.token)
            navigate('/admin')
        }else{
            alert(adminData.data.message)
        }
    }
  return (
    <div className='admin-login-container'>
        <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <div className='admin-login-textfield'>
                <TextField value={username} onChange={e=>setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
                <TextField value={password} onChange={e=>setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
                <Button variant="contained" type='submit'>Log In</Button>
            </div>
        </form>
    </div>
  )
}


export default Login