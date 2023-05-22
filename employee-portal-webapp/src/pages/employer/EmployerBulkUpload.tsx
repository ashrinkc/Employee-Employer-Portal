import { Box, Button, Typography } from '@mui/material'
import React,{useState} from 'react'
import axios from 'axios'
import json2csv from 'json2csv'
const EmployerBulkUpload = () => {
  const [file,setFile] = useState<File | null>()
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setFile(e.target.files![0])
  }
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    //read the file data
    const reader = new FileReader()
    reader.readAsText(file!)
    reader.onload = async () =>{
      //parse file data into array of employeee objects
      const employeeData = reader.result as string
    const employees = employeeData.split('\n').map((row) => {
    const cells = row.split(',').filter(cell=>cell.trim() !== '');
    return {
      Email: cells[0],
      EmployeeName: cells[1],
      Position: cells[2],
      Address: cells[3],
      Phone: cells[4],
      Gender: cells[5],
      Salary: cells[6]
    };
  })
  const csvData = json2csv.parse(employees)
  console.log(csvData)
  console.log("break")
  console.log(employees)
  await axios.post('http://localhost:5000/api/employee/uploadEmployee',{csvData})
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box>
          <Typography>
            Select a CSV file
          </Typography>
          <input type="file" accept=".csv" onChange={handleChange}/>
        </Box>
        {file && <p>{file.name}</p>}
        <Button variant="contained" type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default EmployerBulkUpload