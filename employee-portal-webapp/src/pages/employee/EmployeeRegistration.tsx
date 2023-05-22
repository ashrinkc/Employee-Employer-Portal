import { Button } from '@mui/material'
import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const EmployeeRegistration = () => {
  const navigate = useNavigate()
     const [employeeDetails,setEmployeeDetails] = useState({
        EmployeeName:'',
        Email:'',
        Phone:'',
        Address:'',
        Gender:'',
    }) 
    const employeeRegister = async() =>{
        const employee = await axios.post('http://localhost:5000/api/employee/registerEmployees',employeeDetails)
    }
  return (
     <form onSubmit={employeeRegister}>
        <label>Name:</label>
        <input type="text" name='name' onChange={(e)=>setEmployeeDetails({...employeeDetails,EmployeeName:e.target.value})} value={employeeDetails.EmployeeName}/>
        <label>Email:</label>
        <input type="Email" name='Email' onChange={(e)=>setEmployeeDetails({...employeeDetails,Email:e.target.value})} value={employeeDetails.Email}/>
        <label>Address:</label>
        <input type="text" name="Address" onChange={(e)=>setEmployeeDetails({...employeeDetails,Address:e.target.value})} value={employeeDetails.Address}/>
        <label>Phone:</label>
        <input type="text" name="address" onChange={(e)=>setEmployeeDetails({...employeeDetails,Phone:e.target.value})} value={employeeDetails.Phone}/>
         <label>Gender:</label>
        <input type="text" name="address" onChange={(e)=>setEmployeeDetails({...employeeDetails,Gender:e.target.value})} value={employeeDetails.Gender}/>
        <Button type='submit'>Sign Up</Button>
        <Button onClick={()=>navigate('/employeeLogin')}>Sign In</Button>
    </form>
  )
}

export default EmployeeRegistration