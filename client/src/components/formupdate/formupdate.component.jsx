import React , { useEffect , useState } from 'react'

import { InputGroup , Button , FormControl , Alert } from 'react-bootstrap'

import './formupdate.styles.scss'


const FormUpdate = ({info , type , rows}) =>{
  const [ data , setData ] = useState('')   
  const [ reqState , setReqState ] = useState('0')     
  const axios = require('axios');
  useEffect( () =>{
    if(type===2){
      axios.get(`/contact/${info}`)
      .then(resp => {
        setData(resp.data[0].description)
      });
    }else{
      axios.get(`/information/${info}`)
      .then(resp => {
        setData(resp.data[0].description)
      });
    }
  },[axios,info,type])
  const updateInfo = (param) =>{
    if(type===2){
      axios.post(`/icnhbasadminpanel/contactupdate`, {
        descid:param,
        desc:data
      })
      .then(function (response) {
        setReqState('1')
      })
      .catch(function (error) {
        console.log(error);
        setReqState('2')      
      });

    }else{
      axios.post(`/icnhbasadminpanel/infoupdate`, {
        descid:param,
        desc:data
      })
      .then(function (response) {
        setReqState('1')
      })
      .catch(function (error) {
        console.log(error);
        setReqState('2')      
      });

    }

  }
  return(
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <Button onClick={()=>updateInfo(info)} variant="outline-primary">UPDATE</Button>
    </InputGroup.Prepend>
    <FormControl  as="textarea" rows={rows} value={data} onChange={(event)=>setData(event.target.value)} />
    <div>
      <Alert className={reqState==='0' ? "hidden" :"" } variant={reqState==='1' ? 'success' : 'danger'} >
      {reqState==='1' ? 'It has updated successfully' 
      : 'Oh , Something has went wrong' }
      </Alert>          
    </div>

  </InputGroup>    
  )
}


export default FormUpdate 