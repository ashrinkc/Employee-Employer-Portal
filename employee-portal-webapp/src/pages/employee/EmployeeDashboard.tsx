import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

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

const EmployeeDashboard = () => {
    const [employee,setEmployees] = useState<Employee>()
    const [open, setOpen] = useState(false);
    const [Email,setEmail] = useState('');
    const [EmployeeName,setEmployeeName] = useState('');
    const [Position,setPosition] = useState('');
    const [Address,setAddress] = useState('');
    const [Phone,setPhone] = useState('');
    const [Gender,setGender] = useState('');
    const [Salary,setSalary] = useState('');
    
    const data = useParams()
    useEffect(()=>{
      const getUser = async()=>{
        const res = await axios.get(`http://localhost:5000/api/employee/getEmployee/${data.id}`)
        setEmployees(res.data)
        setEmployeeName(res.data.EmployeeName)
        setEmail(res.data.Email)
        setPosition(res.data.Position)
        setAddress(res.data.Address)
        setPhone(res.data.Phone)
        setGender(res.data.Gender)
        setSalary(res.data.Salary)
      }
      getUser()
    },[])
    const editEmployee = async() =>{
       const res = await axios.put(`http://localhost:5000/api/employee/${data.id}`,{
    EmployeeName,Email,Address,Phone,Gender,id:data.id
  })
  console.log(res)
    }
  return (
     <>
    <div>
      <h1>EmployeeDashboard</h1>
      </div>
    <TableContainer component={Paper} sx={{p:5}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={employee?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {employee?.EmployeeName}
              </TableCell>
              <TableCell align="right">{employee?.Email}</TableCell>
              <TableCell align="right">{employee?.EmployeeName}</TableCell>
              <TableCell align="right">{employee?.Position}</TableCell>
              <TableCell align="right">{employee?.Address}</TableCell>
              <TableCell align="right">{employee?.Phone}</TableCell>
              <TableCell align="right">{employee?.Gender}</TableCell>
              <TableCell align="right">{employee?.Salary}</TableCell>
              <TableCell align="right">
                <Button onClick={()=>setOpen(true)}>EDIT</Button>
              </TableCell>
            </TableRow>
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
            <TextField value={Position} id="outlined-basic" label="Position" variant="outlined" />
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
            <TextField value={Salary} id="outlined-basic" label="Salary" variant="outlined" />
        </Box>
        <Box sx={{mt:2}}>
          <Button onClick={editEmployee} variant="contained">EDIT</Button>
        </Box>
  </Box>
</Modal>
    </>
  )
}

export default EmployeeDashboard