import React , { useContext , useEffect , useState } from 'react'


import {  Container, Row , Col , Button , Alert , Form , ProgressBar  } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'


import './verificationpage.styles.scss'

import { Logged } from '../../context/logged'

const VerificationPage = ()=>{  
  const { logged , updateLogged } = useContext(Logged)  
  const axios = require('axios');
  const [image , setImage] = useState({name:'Receipt'});
  const [imagePreview , setImagePreview] = useState('');  
  const [reqState , setReqState] = useState(0);   
  const [ uploadProgress, setUploadProgress ] = useState(0)

  useEffect(()=>{
    document.title = 'My Account - Verification';
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
  const handleAdd = () =>{
    const Data = new FormData()                  
    Data.append('id_no',logged.id_no)
    Data.append('imgfile', image)
    axios.post('/user/receipupload', Data , {
      onUploadProgress : ProgressEvent =>{
        setUploadProgress(ProgressEvent.loaded/ProgressEvent.total*100)
      }
    } )
    .then(function (response) {
      setReqState(2)
    })
    .catch(function (error) {
      console.log(error);
      setReqState(1)
    });
}

  return(
  <section className="account-page" >
      <Container className="mt-5 mb-5">
      <Row>
        <Col>
          {
            logged ? <div className="page-title">Account Verification</div> : <Redirect to="/" />
          }
          {
            logged.verified === 0 ? <Redirect to="/" /> : <div></div>
          }                   
        </Col>
      </Row>
      <Row>
        <Col>   
          <Alert className={logged.verified === 1 ? 'text-center' : 'hidden'} variant={'warning'}><h5>{"Please upload your bank receipt to complete the the verification process"}</h5></Alert>    
          <Alert className={logged.verified === 2 ? 'text-center' : 'hidden'} variant={'success'}><h5>{"Your idenity has been verified , we are waiting for you at ICNHBAS this year , please download your acceptance letter"}</h5></Alert>    
        </Col>
      </Row>
      <Row>
        <Col>   
          <h5>Receipt upload</h5>   
            <Form className="pb-3">
              <Form.File label={image.name} custom id="preview-file" onChange={(event)=>{setImage(event.target.files[0]);setImagePreview(URL.createObjectURL(event.target.files[0]))}}/>          
              <img className={imagePreview === '' ? 'hidden' : 'preview'} src={imagePreview} alt="preview" height="50" width="50" />
            </Form>
            <Alert variant="warning">Note that you can only upload file up to 5MB only</Alert>
            <Button className="pb-3" variant='success' onClick={handleAdd} >Upload</Button>
            <ProgressBar className={uploadProgress ? '' : 'hidden'} style={{margin:'1rem 0'}} now={uploadProgress} />                              
            <Alert className={reqState === 2 ? 'text-center' : 'hidden'} variant={'success'}>{"Your receipt has been uploaded successfully"}</Alert>    
            <Alert className={reqState === 1 ? 'text-center' : 'hidden'} variant={'danger'}>{"Something has went wrong , please try again later"}</Alert>    
          </Col>
      </Row>
    </Container>
  </section>
    )
}


export default VerificationPage