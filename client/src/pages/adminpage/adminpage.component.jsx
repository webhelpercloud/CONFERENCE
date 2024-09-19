import React , { useState , useContext , useEffect } from 'react'

import {  Container, Row , Col , Button } from 'react-bootstrap'
import AdminMode from '../../components/adminmode/adminmode.component'
import { Redirect } from 'react-router-dom'

import './adminpage.styles.scss'

import { Logged } from '../../context/logged'
import { RegisterState } from '../../context/register'

import axios from 'axios';

const AdminPage = ()=>{
  const { switchRegisterOn , switchRegisterOff } = useContext(RegisterState)   
  const { logged } = useContext(Logged) 
  const [ mode , setMode ] = useState(0)
  const moveAllUsers = () =>{
    let secretCode = prompt('Write the delete users password');
    axios.post('/icnhbasadminpanel/users/moveall',{
      secretCode:secretCode,
    })
    .then(function (response) {
      alert("All users has been deleted")
    })
    .catch(function (error) {
      alert(error);
    });  
  }
  useEffect(()=>{
    document.title = 'Administration';
    },[])     
  return(
    <section className="admin-page" >
    {
      logged ? <div></div> : <Redirect to="/" />
    }     
      <Container className="mt-5 mb-5">
        <Row>
          <Col>
          {
            logged.type === 3 ? <div className="page-title">Administration </div> :  <Redirect to="/" />
          }          
          </Col>
          <Col>
            <div className="mt-5 d-flex flex-row justify-content-around">
              <Button variant='warning' onClick={switchRegisterOn}>Switch Register ON</Button>   
              <Button variant='warning' onClick={switchRegisterOff}>Switch Register OFF</Button>  
              <Button variant='danger' onClick={moveAllUsers}>Delete Users</Button>  

            </div>
          </Col>
        </Row>
        <Row>
          <Col >
            <div className="d-flex flex-row justify-content-around">
              <Button variant={mode === 0 ? 'primary' : 'dark' } onClick={()=>setMode(0)}>Homepage</Button>   
              <Button variant={mode === 1 ? 'primary' : 'dark' } onClick={()=>setMode(1)}>Sessions</Button>   
              <Button variant={mode === 2 ? 'primary' : 'dark' } onClick={()=>setMode(2)}>Program</Button>   
              <Button variant={mode === 3 ? 'primary' : 'dark' } onClick={()=>setMode(3)}>Accommodation & Fees</Button>   
              <Button variant={mode === 4 ? 'primary' : 'dark' } onClick={()=>setMode(4)}>Organizer</Button>   
              <Button variant={mode === 5 ? 'primary' : 'dark' } onClick={()=>setMode(5)}>Contact Us</Button> 
              <Button variant={mode === 6 ? 'primary' : 'dark' } onClick={()=>setMode(6)}>Miscellaneous</Button> 
              <Button variant={mode === 7 ? 'primary' : 'dark' } onClick={()=>setMode(7)}>Add Old Conferenece</Button> 
              <Button variant={mode === 8 ? 'primary' : 'dark' } onClick={()=>setMode(8)}>Emails</Button> 
            </div>
            <div className="edit-section">
              <AdminMode mode={mode} />            
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}


export default AdminPage