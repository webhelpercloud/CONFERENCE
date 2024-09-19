import React , { useContext , useEffect } from 'react'


import {  Container, Row , Col , Button , Alert  } from 'react-bootstrap'
import { Redirect , Link , useRouteMatch } from 'react-router-dom'
import ShowUser from '../../components/show-user/show-user.component'


import './accountpage.styles.scss'

import { Logged } from '../../context/logged'

const AccountPage = ()=>{  
  const { logged , updateLogged ,  logOut} = useContext(Logged)  
  let match = useRouteMatch();  
  const axios = require('axios');
  useEffect(()=>{
    document.title = 'My Account';
    const fetchData = async ()=>{
      try {
        const resp = await axios.get(`/user/${logged.id_no}`)
        updateLogged(resp.data[0])      
        }catch(err){
        console.log(err)
      }
    }
    fetchData()      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[axios,logged.id_no])  
  return(
  <section className="account-page" >
      <Container className="mt-5 mb-5">
      <Row>
        <Col>
          {
            logged ? <div className="page-title">Account Settings</div> : <Redirect to="/" />
          }
          <Link to={`${match.url}/changepassword`}>Change Password</Link>
        </Col>
        <Col className='d-flex' style={{alignItems:'center'}}> 
          {
            logged.type === 3 ?
            <Link to='/adminmode' className="account-btn btn btn-success">Administration</Link>
            : <div></div>
          }
          {
            logged.type === 2 ?
            <Link to='/supervision' className="account-btn btn btn-warning">Supervisor</Link>
            : <div></div>
          }
          {
            logged.type === 1
            ? <div></div>
            : <Link to='/checkusers' className="ml-auto account-btn btn btn-secondary">Users</Link>
          }          
          <Link to={`${match.url}/verification`} className={logged.verified === 0 ? 'hidden' : "ml-auto account-btn btn btn-secondary" }>Verification</Link>
          <Button className="ml-auto account-btn" variant="danger" onClick={logOut}>Logout</Button>
        </Col>        
      </Row>
      <Row>
        <Col>
          <Alert className={logged.verified === 0 ? 'text-center' : 'hidden'} variant={'warning'}><h5>{"Please note that you have not been verified yet"}</h5></Alert>    
          <Alert className={logged.verified === 1 ? 'text-center' : 'hidden'} variant={'warning'}><h5>{"Your abstract file has been approved , please send the money of your registration fees to ICNHBAS bank account and upload the receipt"}</h5></Alert>    
          <Alert className={logged.verified === 2 ? 'text-center' : 'hidden'} variant={'success'}><h5>{"Your idenity has been verified , we are waiting for you at ICNHBAS this year , please download your acceptance letter"}</h5></Alert>    
        </Col>
      </Row>
      <Row>
        <Col>   
          <h5>YOUR INFO</h5> 
          <ShowUser sentUser={logged}/>
          </Col>
      </Row>
    </Container>
  </section>
    )
}


export default AccountPage