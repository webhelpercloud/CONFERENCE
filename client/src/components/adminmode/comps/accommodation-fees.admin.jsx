import React , { useState , useEffect } from 'react'

import { Container , Table , FormControl , Button } from 'react-bootstrap' ;

import FormUpdate from '../../formupdate/formupdate.component'


const AccoFeeAdminMode = ()=>{ 
  const [data , setData] = useState([])
  const [desc , setDesc] = useState('')
  const [fvalue , setFValue] = useState('')
  const [svalue , setSValue] = useState('')
  const [theTable , setTheTable] = useState('eg')  
  const axios = require('axios'); 
  useEffect(()=>{
    axios.get(`/fees/all`)
    .then(resp => {
        resp.data.length > 0 ? setData(resp.data) : setData([])
      })     
  },[axios])

  const handleDelete = (idno) =>{
    axios.delete('/icnhbasadminpanel/fees/remove', {data:{
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
    axios.post('/icnhbasadminpanel/fees/add',{
      description:desc,
      first_value:fvalue,
      second_value:svalue,
      the_table:theTable
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
      <h3>Acoommodation</h3>
      <div className="mb-3">
        <FormUpdate info="accommodation_1" />
        <FormUpdate info="accommodation_2" />
        <FormUpdate info="accommodation_3" />
      </div>
      <h3>Fees</h3>
      <div className="mb-3">
        <FormUpdate info="fees_1" />
        <FormUpdate info="fees_2" />
        <FormUpdate info="fees_3" />
        <FormUpdate info="fees_4" />
        <FormUpdate info="fees_5" />
        <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>First Value</th>
            <th>Second Value</th>
            <th>Table</th>
            <th>Button</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(entery=>
              <tr >
                <td>{entery.id}</td>    
                <td>{entery.description}</td>
                <td>{entery.first_value}</td>
                <td>{entery.second_value}</td>    
                <td>{entery.the_table}</td>                              
                <td><Button variant='danger' onClick={()=>handleDelete(entery.id)}>DELETE</Button></td>                                                                                              
              </tr>)            
          }
          <tr>
            <td><FormControl readOnly placeholder="ID"/></td>    
            <td><FormControl placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} /></td>
            <td><FormControl placeholder="First Value" value={fvalue} onChange={(e)=>setFValue(e.target.value)} /></td>
            <td><FormControl placeholder="Second Value" value={svalue} onChange={(e)=>setSValue(e.target.value)} /></td>
            <td><FormControl value={theTable} onChange={(e)=>setTheTable(e.target.value)} /></td>
            <td><Button variant='success' onClick={handleAdd} >ADD</Button></td>              
          </tr>
        </tbody>
      </Table>         
      </div>      
      
      <h3>Bank Account</h3>
      <div className="mb-3">
        <FormUpdate info="bank_1" />
        <FormUpdate info="bank_2" />
        <FormUpdate info="bank_3" />
        <FormUpdate info="bank_4" />
        <FormUpdate info="bank_5" />
        <FormUpdate info="bank_6" />                
      </div>       
  </Container>
  )
}


export default AccoFeeAdminMode