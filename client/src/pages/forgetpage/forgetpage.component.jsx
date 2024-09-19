import React , { useState , useEffect } from 'react'

import {  Container, Row , Col ,  Form , Button , Alert } from 'react-bootstrap'
import { useLocation , useParams } from 'react-router-dom'
import './forgetpage.styles.scss'


const ForgetPage = ()=>{ 
  const axios = require('axios');  
  const { hash } = useParams()    
  const [locState , setLocaState] = useState(0)
  let location = useLocation().pathname;  
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confpassword, setConfPassword ] = useState('');    
  const [ formState, setformState ] = useState('0');  
  useEffect(()=>{
    document.title = 'Forget Password';
    setLocaState(location)
    },[location])     
  const forgetProcess =()=>{
    axios.post('/user/forget', {
      username:username
    })
    .then(function (response) {
      setformState('1')
    })
    .catch(function (error) {
      console.log(error);
      setformState('2')      
    });

  } 
  const changePasswordProcess =()=>{
    if(password===confpassword){
      axios.post('/user/forgetchangepassword', {
        changeId:hash,
        password:password
      })
      .then(function (response) {
        setformState('1')
      })
      .catch(function (error) {
        console.log(error);
        setformState('2')      
      });
    }
    setformState('3')
  }   
  return(
    <section className="forget-page" >
      <Container className="mt-5 mb-5">
        <Row>
          <Col lg={3}/>
          <Col>
            {
              locState==='/forget'
              ?<div>
                <Form onKeyPress={(e)=>e.key === 'Enter' ? forgetProcess() :'' }>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={(event)=>setUsername(event.target.value)} type="name" placeholder="Write your registered username" />
                  </Form.Group>
                  <Button className={'mr-auto pr-5 pl-5'} variant="primary" onClick={()=>forgetProcess()} >
                    Check
                  </Button>               
                </Form>      
                <div className={'mt-3 mb-3'}>
                  <Alert className={formState==='0' ? "hidden" :"" } variant={formState==='1' ? 'success' : 'danger'} >
                    {formState==='1' ? 'please check your email inbox' 
                    : 'Something went wrong , please try again later' }
                  </Alert>              
                </div>               
              </div>
              :<div>
              <Form onKeyPress={(e)=>e.key === 'Enter' ? changePasswordProcess() :'' }>
                <Form.Group controlId="formPw">
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={password} onChange={(event)=>setPassword(event.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="FormConfPW">
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={confpassword} onChange={(event)=>setConfPassword(event.target.value)} type="password" placeholder="Confirm Password" />
                </Form.Group>                
                <Button className={'mr-auto pr-5 pl-5'} variant="primary" onClick={()=>changePasswordProcess()} >
                  Change Password
                </Button>               
              </Form>      
              <div className={'mt-3 mb-3'}>
                <Alert className={formState==='1' ? "" :"hidden" } variant="success">Your Password has been changed</Alert>
                <Alert className={formState==='2' ? "" :"hidden" } variant="danger">Something went wrong , please try again later</Alert>
                <Alert className={formState==='3' ? "" :"hidden" } variant="danger">Your passwords doesnt match</Alert>            
              </div>               
            </div>
            }
          </Col>
          <Col lg={3}/>
        </Row>
      </Container>
    </section>
  )
}


export default ForgetPage