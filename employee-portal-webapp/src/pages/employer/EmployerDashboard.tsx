import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import jwt_decode from 'jwt-decode'
import EmployerBulkUpload from './EmployerBulkUpload'

type Employee = {
    _id:string,
    Email:string,
    EmployeeName:string,
    Position:string,
    Address:string,
    Phone:string,
    Gender:string,
    Salary:string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EmployerDashboard = () => {
    const [employees,setEmployees] = useState<Employee[]>([])
    const [user, setUser] = useState<object|any>({});
    const [showUser,setshowUser] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [openBulk, setOpenBulk] = useState(false);
    const [Email,setEmail] = useState('');
    const [EmployeeName,setEmployeeName] = useState('');
    const [Position,setPosition] = useState('');
    const [Address,setAddress] = useState('');
    const [Phone,setPhone] = useState('');
    const [Gender,setGender] = useState('');
    const [Salary,setSalary] = useState('');
    const [userID,setUserID] = useState('');
    async function handleCallbackResponse(response:any){
      // console.log("encoded jwt id token" + response.credential)
      var userObject:object|any= jwt_decode(response.credential)
      const user = await axios.post('http://localhost:5000/api/employer/employerLogin',{email:userObject?.email})
      setUser(user)
      if(user.data){
        setshowUser(false)
        const res = await axios.get('http://localhost:5000/api/employee/getAllEmployees')
        setEmployees(res.data)
      }else{
        alert("User not found")
      }
      
    }
    useEffect(()=>{
      /*Global Google*/
      window.google.accounts.id.initialize({
        client_id:process.env.REACT_APP_CLIENT_ID,
        callback: handleCallbackResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme:"outline",size:"large"}
      )
    },[])
    

const individualEmployee = async(id:string) =>{
  console.log(user)
  const res = await axios.get(`http://localhost:5000/api/employee/getEmployee/${id}`)
  setEmployeeName(res.data.EmployeeName)
  setEmail(res.data.Email)
  setPosition(res.data.Position)
  setAddress(res.data.Address)
  setPhone(res.data.Phone)
  setGender(res.data.Gender)
  setSalary(res.data.Salary)
  setUserID(res.data._id)
  setOpen(true)
}

const editEmployee = async(e:any) =>{
  e.preventDefault()
  const res:any = await axios.put(`http://localhost:5000/api/employee/${userID}`,{
    EmployeeName,Email,Position,Address,Phone,Gender,Salary,id:user.data._id
  })
  console.log(res)
  if(res.data.success){
    alert(res.data.message)
  }
}

const deleteEmployee = async(idDel:string) =>{
  const res:any = await axios.delete(`http://localhost:5000/api/employee/${idDel}`)
  if(res.success){
    alert(res.message)
  }
}

if(showUser){
  return (
    <div>
    <div id="signInDiv"></div>
    </div>
  )
}

  return (
    <>
    <div>
      <h1>EmployerDashboard</h1>
      <div>
        <Button onClick={()=>setOpenBulk(true)}>Bulk Upload</Button>
      </div>
      </div>
    <Modal
  open={openBulk}
  onClose={()=>setOpenBulk(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Bulk Upload
    </Typography>
    <Box sx={{ mt: 2 }}>
      <EmployerBulkUpload/>
    </Box>
    </Box>
    </Modal>
    <TableContainer component={Paper} sx={{p:5}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees?.map((employee) => (
            <TableRow
              key={employee._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {employee.EmployeeName}
              </TableCell>
              <TableCell align="right">{employee.Email}</TableCell>
              <TableCell align="right">{employee.Position}</TableCell>
              <TableCell align="right">{employee.Phone}</TableCell>
              <TableCell align="right">{employee.Gender}</TableCell>
              <TableCell align="right">{employee.Salary}</TableCell>
              <TableCell align="right">
                <Button onClick={()=>individualEmployee(employee._id)}>EDIT</Button>
              </TableCell>
              <TableCell align="right">
                <Button onClick={()=>deleteEmployee(employee._id)}>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
  open={open}
  onClose={()=>setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      EDIT
    </Typography>
    <Box sx={{ mt: 2 }}>
            <TextField value={EmployeeName} onChange={e=>setEmployeeName(e.target.value)} type="text" id="outlined-basic" label="Name" variant="outlined" />
        </Box>
        <Box sx={{ mt: 2 }}>
            <TextField value={Email} onChange={e=>setEmail(e.target.value)} type="email" id="outlined-basic" label="Email" variant="outlined" />
        </Box>
        <Box sx={{ mt: 2 }}>
            <TextField value={Position} onChange={e=>setPosition(e.target.value)} id="outlined-basic" label="Position" variant="outlined" />
        </Box>
        <Box sx={{ mt: 2 }}>
            <TextField value={Address} onChange={e=>setAddress(e.target.value)} id="outlined-basic" label="Address" variant="outlined" />
        </Box>
        <Box sx={{ mt: 2 }}>
            <TextField value={Phone} onChange={e=>setPhone(e.target.value)} id="outlined-basic" label="Phone" variant="outlined" />
        </Box>
        <Box sx={{ mt: 2 }}>
            <TextField value={Gender} onChange={e=>setGender(e.target.value)} id="outlined-basic" label="Gender" variant="outlined" />
        </Box>
         <Box sx={{ mt: 2 }}>
            <TextField value={Salary} onChange={e=>setSalary(e.target.value)} id="outlined-basic" label="Salary" variant="outlined" />
        </Box>
        <Box sx={{mt:2}}>
          <Button onClick={editEmployee} variant="contained">EDIT</Button>
        </Box>
  </Box>
</Modal>
    </>
  )
}

export default EmployerDashboard;