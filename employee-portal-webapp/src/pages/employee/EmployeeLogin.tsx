import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {
    const navigate = useNavigate()
    const [Email,setEmail] = useState<string>('')
     const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const employeeData:any = await axios.post('http://localhost:5000/api/employee/loginEmployee',{Email})
        console.log(employeeData)
        if(employeeData.data.success){
            localStorage.setItem("access-token",employeeData.data.token)
            navigate(`/employee/${employeeData.data.employee._id}`)
        }else{
            alert(employeeData.data.message)
        }
    }
  return (
    <div className='admin-login-container'>
        <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <div className='admin-login-textfield'>
                <TextField value={Email} onChange={e=>setEmail(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
                <Button variant="contained" type='submit'>Log In</Button>
                <Button variant="contained" onClick={()=>navigate('/employeeRegister')}>Register</Button>
            </div>
        </form>
    </div>
  )
}

export default EmployeeLogin