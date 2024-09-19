import React , { useState , useEffect } from 'react'

import {  Button ,  Container , Table , FormControl } from 'react-bootstrap' ;


const ProgramAdminMode = () =>{
  const [data , setData] = useState([])
  const [desc , setDesc] = useState('Description')
  const [date , setDate] = useState('2030-12-12')
  const axios = require('axios'); 
  useEffect(()=>{
    axios.get(`/programall`)
    .then(resp => {
        resp.data.length > 0 ? setData(resp.data) : setData([{}])
      })     
  },[axios])

  const handleDelete = (idno) =>{
    axios.delete('/icnhbasadminpanel/programremove', {data:{
      id:idno
    }})
    .then(function (response) {
      alert(`${idno} has been deleted`)         
    })
    .catch(function (error) {
      console.log(error);     
      alert(`Deletion failed`)       
    });
  }
  const handleAdd = () =>{
    axios.post('/icnhbasadminpanel/programadd',{
      description:desc,
      date:date,
    })
    .then(function (response) {
      alert(`${desc} has been added`)
    })
    .catch(function (error) {
      console.log(error);
    });    
  }
  return(
    <Container className="mt-3">
      <h3>Program</h3>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Date</th>
            <th>Button</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(entery=>
              <tr >
                <td>{entery.id}</td>    
                <td>{entery.description}</td>
                <td>{entery.date}</td>
                <td><Button variant='danger' onClick={()=>handleDelete(entery.id)}>DELETE</Button></td>                                                                                              
              </tr>)            
          }
          <tr>
            <td><FormControl readOnly placeholder="ID"/></td>    
            <td><FormControl value={desc} onChange={(e)=>setDesc(e.target.value)} /></td>
            <td><FormControl value={date} onChange={(e)=>setDate(e.target.value)} /></td>
            <td><Button variant='success' onClick={handleAdd} >ADD</Button></td>              
          </tr>
        </tbody>
      </Table> 
 {/*     <h5>Program Guides</h5>   
      <EditMode type={5} img deletelink={"/icnhbasadminpanel/program/admins/remove"} get={"/program/admins"} add={"/icnhbasadminpanel/program/admins/add"}/>     
 */}
    </Container>
  )
}



export default ProgramAdminMode