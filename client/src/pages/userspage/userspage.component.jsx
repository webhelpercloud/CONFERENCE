import React , { useContext , useEffect, useState } from 'react'


import {  Container, Row , Col , Button, Alert , Form , FormControl ,InputGroup  } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import ShowUser from '../../components/show-user/show-user.component'
import EditUser from '../../components/edit-user/edit-user.component'


import './userspage.styles.scss'

import { Logged } from '../../context/logged'

const UsersPage = ({ setLoading })=>{  
  const { logged } = useContext(Logged)  
  const [usersNon , setUsersNon] = useState([])
  const [usersHalfHalfVer , setUsersHalfHalfVer] = useState([])
  const [usersHalfVer , setUsersHalfVer] = useState([])    
  const [usersVer , setUsersVer] = useState([])
  const [usersOnline , setUsersOnline] = useState([])  
  const [usersAll , setUsersAll] = useState([]) 
  const [showUserState , setShowUserState] = useState(0)     
  const axios = require('axios');
  const [userId , setUserId] = useState('')
  const [newPw , setNewPw] = useState('')
  const [confNewPw , setConfNewPw] = useState('')
  const [alertState , setAlertState] = useState(0) 
  const [validated, setValidated] = useState(false);     
  useEffect(()=>{
    setLoading(true)
    document.title = 'Users';
    const fetchData = async ()=>{
      try {
        const respA = await axios.get('/icnhbasadminpanel/users/nonverified')
        respA.data.length > 0 ? setUsersNon(respA.data) : setUsersNon([])  
        const respB = await axios.get('/icnhbasadminpanel/users/halfverified')
        respB.data.length > 0 ? setUsersHalfVer(respB.data) : setUsersHalfVer([])  
        const respC = await axios.get('/icnhbasadminpanel/users/halfverified/noreceipt')
        respC.data.length > 0 ? setUsersHalfHalfVer(respC.data) : setUsersHalfHalfVer([])  
        const respD = await axios.get('/icnhbasadminpanel/users/verified')
        respD.data.length > 0 ? setUsersVer(respD.data) : setUsersVer([])  
        const respE = await axios.get('/icnhbasadminpanel/users/all')
        respE.data.length > 0 ? setUsersAll(respE.data) : setUsersAll([])  
        const respF = await axios.get('/icnhbasadminpanel/users/online')
        respF.data.length > 0 ? setUsersOnline(respF.data) : setUsersOnline([]) 
        setLoading(false)         
        }catch(err){
        console.log(err)
      }
    }
    fetchData()    
    },[axios,setLoading])  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
  
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      if (newPw !== confNewPw) {
        setConfNewPw('')
      }
      setValidated(true);
      event.preventDefault();
      if (newPw === confNewPw){
        axios.post('/icnhbasadminpanel/user/changepassword',{
          id_no:userId,
          newPw:newPw
        })
        .then(function (response) {
          setAlertState(2)
        })
        .catch(function (error) {
          console.log(error);
          setAlertState(1)
        });
      }
    };
  return(
  <section className="users-page" >
      <Container className="mt-5 mb-5">
      <Row>
        <Col>
          {
            logged ? <div></div> : <Redirect to="/" />
          }          
          {
            logged.type === 2 || logged.type === 3  
            ?<div className="page-title">Users</div>
            :<Redirect to="/" /> 
          }
        </Col>
        <Col style={{margin: '2.5rem 0'}}>         
          <div className="d-flex flex-row flex-wrap">
            <Button className="m-3" variant={showUserState === 0 ? 'primary' : 'dark' } onClick={()=>setShowUserState(0)}>Non Verified Users</Button>   
            <Button className="m-3" variant={showUserState === 1 ? 'primary' : 'dark' } onClick={()=>setShowUserState(1)}>Verified Abstract Users</Button>
            <Button className="m-3" variant={showUserState === 2 ? 'primary' : 'dark' } onClick={()=>setShowUserState(2)}>Verified Abstract Receipt Users</Button>
            <Button className="m-3" variant={showUserState === 3 ? 'primary' : 'dark' } onClick={()=>setShowUserState(3)}>Verified Users</Button>
            <Button className="m-3" variant={showUserState === 6 ? 'primary' : 'dark' } onClick={()=>setShowUserState(6)}>Online Users</Button>
            {
              logged.type=== 3
              ?<Button className="m-3" variant={showUserState === 4 ? 'primary' : 'dark' } onClick={()=>setShowUserState(4)}>All Users</Button>   
              : <div></div>
            }
            {
              logged.type=== 3
              ?<Button className="m-3" variant={showUserState === 5 ? 'primary' : 'dark' } onClick={()=>setShowUserState(5)}>Change Password for user</Button>   
              : <div></div>
            }            
          </div>      
        </Col>         
      </Row>
      <Row>
        <Col className={showUserState===0 ? '' :'hidden'}>  
          <h5>Users who have been not accepted by the supervisor</h5>
          {
            usersNon.length < 1 ? <Alert variant="warning">There is no users</Alert> :
            usersNon.map(user =>
              <div key={user.id_no} className="supervised-user">
                <div className="d-flex">
                  <h5>User ID : {user.id_no}</h5>
                </div>
                <ShowUser sentUser={user}/>
              </div>
             )
          }
        </Col>
        <Col className={showUserState===1 ? '' :'hidden'}>  
          <h5>Users who their abstract has been approved of but didnt send their receipt yet</h5>
          {
            usersHalfHalfVer.length < 1 ? <Alert variant="warning">There is no users</Alert> :
            usersHalfHalfVer.map(user =>
              <div key={user.id_no} className="supervised-user">
                <div className="d-flex">
                  <h5>User ID : {user.id_no}</h5>
                </div>
                <ShowUser sentUser={user}/>
              </div>
             )
          }
        </Col>
        <Col className={showUserState===2 ? '' :'hidden'}>   
          <h5>Users who their abstract has been approved of and sent their receipt but have not been approved by the supervisior</h5> 
          {
            usersHalfVer.length < 1 ? <Alert variant="warning">There is no users</Alert> :
            usersHalfVer.map(user =>
              <div key={user.id_no} className="supervised-user">
                <div className="d-flex">
                  <h5>User ID : {user.id_no}</h5>
                </div>
                <ShowUser sentUser={user}/>
              </div>
             )
          }
        </Col>                
        <Col className={showUserState===3 ? '' :'hidden'}>   
        <h5>Users who were approved of and have acceptance letter</h5> 
          {
            usersVer.length < 1 ? <Alert variant="warning">There is no users</Alert> :
            usersVer.map(user =>
              <div key={user.id_no} className="supervised-user">
                <div className="d-flex">
                  <h5>User ID : {user.id_no}</h5>
                </div>               
                <ShowUser sentUser={user}/>
              </div>
             )
          }
        </Col>
        <Col className={showUserState===4 ? '' :'hidden'}>   
        <h5>All users who registered through the website</h5> 
         {
            usersAll.length < 1 ? <Alert variant="warning">There is no users</Alert> :
            usersAll.map(user =>
              <div key={user.id_no} className="supervised-user">
                <div className="d-flex">
                  <h5>User ID : {user.id_no}</h5>
                </div>                
                <EditUser sentUser={user}/>
              </div>
             )
          }
        </Col>    
        <Col className={showUserState===6 ? '' :'hidden'}>   
        <h5>All Online Attenders who registered through the website</h5> 
         {
            usersOnline.length < 1 ? <Alert variant="warning">There is no users</Alert> :
            usersOnline.map(user =>
              <div key={user.id_no} className="supervised-user">
                <div className="d-flex">
                  <h5>User ID : {user.id_no}</h5>
                </div>                
                <ShowUser sentUser={user}/>
              </div>
             )
          }
        </Col>              
        <Col className={showUserState===5 ? '' :'hidden'}>   
          <h5>Change password for specific user</h5> 
          <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">User ID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={userId}
                required
                onChange={(event)=>setUserId(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">New Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"                
                value={newPw}
                required
                onChange={(event)=>setNewPw(event.target.value)}
              />
            </InputGroup> 
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Confirm New Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"                
                value={confNewPw}
                required
                onChange={(event)=>setConfNewPw(event.target.value)}
              />
            </InputGroup> 
            <Button type="submit" >Change Password</Button>                                    
          </Form>        
          <Alert className={alertState===1 ? '' :'hidden'} variant="danger">Your Password was wrong</Alert>     
          <Alert className={alertState===2 ? '' :'hidden'} variant="success">Your password has been change successfully</Alert>     
        </Col>               
      </Row>
    </Container>
  </section>
    )
}


export default UsersPage