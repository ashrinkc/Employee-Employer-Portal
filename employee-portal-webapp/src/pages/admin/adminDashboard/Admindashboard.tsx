import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
type Employer = {
  _id:string,
  name: string,
  email: string,
  password: string
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
}

const Admindashboard = () => {
  const [employers,setEmployers] = useState<Employer[]>()
  const [loading,setLoading] = useState(false)
  const [open,setOpen] = useState<boolean>(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(()=>{
    const getEmployees = async() => {
        const res = await axios.get('http://localhost:5000/api/employer/getAllEmployer')
        setEmployers(res.data)
    }
    getEmployees()
  },[])
  const addEmployer = async(e:any) =>{
    e.preventDefault()
    const addEmp = await axios.post('http://localhost:5000/api/employer/addEmployer',{name,email})
    console.log(addEmp)
  }
  return (
    <>
    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <div>
        <h1>Admin Dashboard</h1>
      </div>
      <div>
        <Button onClick={()=>setOpen(true)} variant="contained">Add Employers</Button>
      </div>
    </Box>
    <Modal
      open={open}
      onClose={()=>setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Employers
        </Typography>
        <Box sx={{ mt: 2 }}>
            <TextField value={name} onChange={e=>setName(e.target.value)} type="text" id="outlined-basic" label="Name" variant="outlined" />
        </Box>
        <Box sx={{ mt: 2 }}>
            <TextField value={email} onChange={e=>setEmail(e.target.value)} type="email" id="outlined-basic" label="Email" variant="outlined" />
        </Box>
        <Box sx={{mt:2}}>
          <Button onClick={addEmployer} variant="contained">ADD</Button>
        </Box>
      </Box>
    </Modal>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employers?.map((employer) => (
            <TableRow
              key={employer._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {employer.name}
              </TableCell>
              <TableCell align="right">{employer.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></>
  )
}

export default Admindashboard