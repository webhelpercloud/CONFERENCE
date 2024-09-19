import React , { useState} from 'react'

import {  FormControl , Form , InputGroup , Button  , Row , Col , Alert } from 'react-bootstrap' ;


import './modadd.styles.scss'


const ModAdd = ({ type }) =>{
  const axios = require('axios');    
  const [ modName , setModName ] = useState('');  
  const [ modEventTitle , setModEventTitle ] = useState('');
  const [ modTitle , setModTitle ] = useState('');  
  const [ modEmail , setModEmail ] = useState('');
  const [ modImg , setModImg ] = useState({name:'Profile Image'});
  const [ previewImage , setPreviewImage ] = useState('') ;
  const [validated, setValidated] = useState(false);  
  const [ formState, setformState ] = useState('0') ;  
  const returnDefault = ()=>{
    setModName('')
    setModEventTitle('')
    setModTitle('')
    setModEmail('')
    setModImg({name:'Profile Image'})
    setPreviewImage('')
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setformState("2")
    }
    else{
      event.preventDefault();      
      const Data = new FormData()
      Data.append('name' , modName)      
      Data.append('eventTitle' , modEventTitle)
      Data.append('title' , modTitle)
      Data.append('email' , modEmail)                  
      Data.append('imgfile', modImg)
      if(type===1){
        axios.post('/icnhbasadminpanel/counciladd', Data ,)
        .then(function (response) {
          setformState("1")
          returnDefault()
        })
        .catch(function (error) {
          console.log(error);
          setformState("2")
        });
      }
      if(type===2){
        axios.post('/icnhbasadminpanel/sponseradd', Data ,)
        .then(function (response) {
          setformState("1")
          returnDefault()
        })
        .catch(function (error) {
          console.log(error);
          setformState("2")
        });
      }
      if(type===3){
        axios.post('/icnhbasadminpanel/sessionadd',{
          name:modName
        })
        .then(function (response) {
          setformState("1")
          returnDefault()
        })
        .catch(function (error) {
          console.log(error);
          setformState("2")
        });
      }
      if(type===4){
        axios.post('/icnhbasadminpanel/conference/add',{
          name:modName
        })
        .then(function (response) {
          setformState("1")
          returnDefault()
        })
        .catch(function (error) {
          console.log(error);
          setformState("2")
        });
      }      
    }
    setValidated(true);
  };  
  if(type===1){
    return(
      <Form noValidate validated={validated} onSubmit={handleSubmit} >
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Event Title</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={modEventTitle} 
          onChange={(event)=>setModEventTitle(event.target.value)}
        />
      </InputGroup>             
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Full Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={modName} 
          required
          onChange={(event)=>setModName(event.target.value)}
        />
      </InputGroup>  
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Title</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={modTitle} 
          required
          onChange={(event)=>setModTitle(event.target.value)}
        />
      </InputGroup>  
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Email</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={modEmail} 
          onChange={(event)=>setModEmail(event.target.value)}
        />
      </InputGroup>  
      <Row>
        <Col>
          <Form.File 
          id="preview-file"
          label={modImg.name}
          custom
          required
          onChange={(event)=>{setModImg(event.target.files[0]);setPreviewImage(URL.createObjectURL(event.target.files[0]))}}
          accept="image/*"
          />                 
        </Col>
        <Col className="text-center" >
          <img className="preview" src={previewImage} alt="preview" height="200" width="200" />              
        </Col>
      </Row>
      <Button type="submit" className="pl-4 pr-4 mb-2 mt-4">
        Add
      </Button>
      <Alert className={formState==='0' ? "hidden" :"" } variant={formState==='1' ? 'success' : 'danger'} >
      {formState==='1' ? 'This user was added successfully' 
      : 'Oh , Something has went wrong , please check that you provided all the fileds correctly' }
      </Alert>      
    </Form>

  )    
  }
  if(type===2){
    return(
      <Form noValidate validated={validated} onSubmit={handleSubmit} >
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={modName} 
          required
          onChange={(event)=>setModName(event.target.value)}
        />
      </InputGroup>             
      <Row>
        <Col>
          <Form.File 
          id="sponoser-preview-file"
          label={modImg.name}
          custom
          required
          onChange={(event)=>{setModImg(event.target.files[0]);setPreviewImage(URL.createObjectURL(event.target.files[0]))}}
          accept="image/*"
          />                 
        </Col>
        <Col className="text-center" >
          <img className="preview" src={previewImage} alt="preview" height="200" width="200" />              
        </Col>
      </Row>
      <Button type="submit" className="pl-4 pr-4 mb-2 mt-4">
        Add
      </Button>
      <Alert className={formState==='0' ? "hidden" :"" } variant={formState==='1' ? 'success' : 'danger'} >
      {formState==='1' ? 'This sponser was added successfully' 
      : 'Oh , Something has went wrong , please check that you provided all the fileds correctly' }
      </Alert>      
    </Form>

  )    
  }
  if(type===3 || type===4){
    return(
      <Form noValidate validated={validated} onSubmit={handleSubmit} >
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={modName} 
          required
          onChange={(event)=>setModName(event.target.value)}
        />
      </InputGroup>             
      <Button type="submit" className="pl-4 pr-4 mb-2 mt-4">
        Add
      </Button>
      <Alert className={formState==='0' ? "hidden" :"" } variant={formState==='1' ? 'success' : 'danger'} >
      {formState==='1' ? 'This session was added successfully please edit it' 
      : 'Oh , Something has went wrong , please check that you provided all the fileds correctly' }
      </Alert>      
    </Form>

  )    
  }  
}



export default ModAdd