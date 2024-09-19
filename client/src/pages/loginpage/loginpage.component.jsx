import React , { useState , useContext , useEffect } from 'react'

import {  Container, Row , Col ,  Form , Button , Alert } from 'react-bootstrap'

import { Redirect , Link } from 'react-router-dom'

import './loginpage.styles.scss'

import { Logged } from '../../context/logged'

const LoginPage = ()=>{
  const { logged , updateLogged} = useContext(Logged)  
  const axios = require('axios'); 
  const [ formState, setformState ] = useState('0')    
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  useEffect(()=>{
    document.title = 'Login';
    },[])     
  const LoginProcess =()=>{
    axios.post('/userlogin', {
      userName:username,
      pass:password
    })
    .then(function (response) {
      setformState('1')
      updateLogged(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
      setformState('2')      
    });

  } 
  return(
    <section className="login-page" >
      {
        logged ? <Redirect to="/myaccount" /> : <span></span>
      }
      <Container className="mt-5 mb-5">
        <Row>
          <Col lg={3}/>
          <Col>
            <div style={{textAlign:'center'}}>
              <img className="icn-logo" alt='icnhbas-logo' src={'/assets/logo.png'} />
            </div>
            <Form onKeyPress={(e)=>e.key === 'Enter' ? LoginProcess() :'' }>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} onChange={(event)=>setUsername(event.target.value)} type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={(event)=>setPassword(event.target.value)} type="password" placeholder="Password" />
              </Form.Group>
              <div className="d-flex flex-row">
                <Button className={'mr-auto pr-5 pl-5'} variant="primary" onClick={()=>LoginProcess()} >
                  Login
                </Button>               
                <Link to="/forget">Forget Password</Link>                              
              </div>
          </Form>      
              <div className={'mt-3 mb-3'}>
                <Alert className={formState==='0' ? "hidden" :"" } variant={formState==='1' ? 'success' : 'danger'} >
                  {formState==='1' ? 'You have logged in successfully' 
                  : 'Wrong username or password ' }
                </Alert>              
              </div>            
          
          </Col>
          <Col lg={3}/>
        </Row>
      </Container>
    </section>
  )
}


export default LoginPage