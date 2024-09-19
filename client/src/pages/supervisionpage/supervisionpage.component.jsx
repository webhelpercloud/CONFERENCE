import React , { useContext , useEffect, useState } from 'react'


import {  Container, Row , Col , Button, Alert  } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import ShowUser from '../../components/show-user/show-user.component'


import './supervisionpage.styles.scss'

import { Logged } from '../../context/logged'
import { useEmail } from '../../hooks/useEmail'

const SupervisionPage = ()=>{  
  const [ emailData ] = useEmail()
  const { logged } = useContext(Logged)  
  const [users , setUsers] = useState([])
  const [users2 , setUsers2] = useState([])
  const [accepted , setAccepted] = useState(0)
  const [show , setShow] =useState(false)  
  const axios = require('axios');
  useEffect(()=>{
    document.title = 'Supervision';
    const fetchData = async ()=>{
      try {
        const resp = await axios.get('/icnhbasadminpanel/users/nonverified')
        resp.data.length > 0 ? setUsers(resp.data) : setUsers([])  
        const respB = await axios.get('/icnhbasadminpanel/users/halfverified/noreceipt')
        respB.data.length > 0 ? setUsers2(respB.data) : setUsers2([])  

        }catch(err){
        console.log(err)
      }
    }
    fetchData()      
    },[axios])  

  const acceptUser = (idno)=>{
    axios.post('/icnhbasadminpanel/user/verify', {
      id:idno,
      emailData:emailData
    })
    .then(function (response) {
      setAccepted(idno)      
    })
    .catch(function (error) {
      console.log(error);     
    });
  }
  const acceptUserReceipt = (idno)=>{
    axios.post('/icnhbasadminpanel/user/verifyreceipt', {
      id:idno,
      emailData:emailData
    })
    .then(function (response) {
      setAccepted(idno)      
    })
    .catch(function (error) {
      console.log(error);     
    });
  }  
  return(
  <section className="supervision-page" >
      <Container className="mt-5 mb-5">
      <Row>
        <Col>
          {
            logged ? <div></div> : <Redirect to="/" />
          }          
          {
            logged.type === 2 ? <div className="page-title">Supervision </div> : <Redirect to="/" />
          }
        </Col>
        <Col className='d-flex' style={{alignItems:'center'}}>           
          <Button className="ml-auto account-btn" variant={show ? "dark" : 'primary'} onClick={()=>setShow(false)}>Verify Abstract</Button>
          <Button className="ml-auto account-btn" variant={show ? "primary" : 'dark'} onClick={()=>setShow(true)}>Verify Receipt</Button>
        </Col>        
      </Row>
      <Row>
        <Col className={show ? 'hidden' : ''}>   
          {
            users.length < 1 ? <Alert variant="warning">There is no users who are not verified</Alert> :
            users.map(user =>
              <div key={user.id_no} className="supervised-user">
                <div className="d-flex">
                  <h5>User ID : {user.id_no}</h5>
                  <Button onClick={()=>acceptUser(user.id_no)} className="supervision-btn ml-auto">Accept</Button>                
                </div>
                {
                  accepted === user.id_no ?
                  <Alert variant="success">User {user.id_no} has been accepted successfully</Alert> :
                  <span></span>
                }                
                <ShowUser sentUser={user}/>
              </div>
             )
          }

        </Col>
        <Col className={show ? '' : 'hidden'}>   
          {
            users2.length < 1 ? <Alert variant="warning">There is no users who sent their receipts</Alert> :
            users2.map(user => 
              <div key={user.id_no} className="supervised-user">
                <div className="d-flex">
                  <h5>User ID : {user.id_no}</h5>
                  <Button onClick={()=>acceptUserReceipt(user.id_no)} className="supervision-btn ml-auto">Accept</Button>                
                </div>
                {
                  accepted === user.id_no ?
                  <Alert variant="success">User {user.id_no} has been accepted successfully</Alert> :
                  <span></span>
                }                
                <ShowUser type={2} sentUser={user}/>
              </div>
             )
          }

        </Col>        
      </Row>
    </Container>
  </section>
    )
}


export default SupervisionPage