import React , { useState , useEffect , useContext } from 'react'

import { Container , InputGroup , Row , Col , FormControl , Form , Button , Alert } from 'react-bootstrap';

import './changepassword.styles.scss'

import { Logged } from '../../context/logged'


const ChangePasswordPage = ()=>{
  const [validated, setValidated] = useState(false);  
  const [currentPw , setCurrentPw] = useState('')
  const [newPw , setNewPw] = useState('')
  const [confNewPw , setConfNewPw] = useState('')
  const [alertState , setAlertState] = useState(0)
  const { logged , updateLogged } = useContext(Logged)  
  const axios = require('axios');
  useEffect(()=>{
    document.title = 'My Account - Change Password';
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
      axios.post('/user/changepassword',{
        id_no:logged.id_no,
        currentPw:currentPw,
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
    <section className='cgpassword-page'>  
      <Container className="page-con">
        <div className="page-title">Change Password</div>
        <Row>
          <Col lg={2}/>
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Current Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="password"
                  value={currentPw}
                  required
                  onChange={(event)=>setCurrentPw(event.target.value)}
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
          <Col lg={2}/>          
        </Row>
      </Container>
    </section>
  )
}


export default ChangePasswordPage