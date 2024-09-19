import React , { useState , useEffect } from 'react'

import { InputGroup , FormControl , Button , Form } from 'react-bootstrap'

import EditMode from '../editmode/editmode.component'

import './session-edit.styles.scss'


const SessionEdit = ({conf}) =>{
  const [ session , selectSession ] = useState(0)
  const [ sessionId , selectSessionId ] = useState(0)   
  const [ sessions , setSessions ] = useState([])
  const [ conference , setConference ] = useState(0)
  const [ conferenceId , setConferenceId ] = useState(0)   
  const [ conferences , setConferences ] = useState([])
  const [ input , setInput ] = useState(''); 
  const [ about , setAbout ] = useState('');   
  const [ showMove , setShowMove ] = useState(false);   
  const axios = require('axios'); 
  useEffect(()=>{
    let a
    if(conf){
      axios.get(`/conferences/all`)
      .then(resp => {
          if(resp.data.length > 0){
            setConferences(resp.data)
            setConference(resp.data[0].name)
            setConferenceId(resp.data[0].id)
            setAbout(resp.data[0].description)
            a =resp.data[0].id 
            axios.get(`/getsession/${a}`)
            .then(resp => {    
              if(resp.data.length > 0) {
                setSessions(resp.data) 
                selectSession(resp.data[0].name)
                selectSessionId(resp.data[0].id) 
              } else{
                setSessions([])
                selectSession('')
                selectSessionId('')         
              }       
              });     
                                     
          }else{
            setConferences([])
          } 
      
        });
    }else{
      axios.get(`/getsession/0`)
            .then(resp => {    
              if(resp.data.length > 0) {
                setSessions(resp.data) 
                selectSession(resp.data[0].name)
                selectSessionId(resp.data[0].id) 
              } else{
                setSessions([])
                selectSession('')
                selectSessionId('')         
              }       
              });     
    }

  }, [axios,conf]);

  const handleDelete = (idno) =>{
    axios.delete('/icnhbasadminpanel/sessionremove', {data:{
      id:idno
    }})
    .then(function (response) {
      alert(`${idno} has been deleted`)           
    })
    .catch(function (error) {
      console.log(error);     
      alert(`Deletion failed`)       
    });
  }
  const handleChange = (event) => {
    selectSession(event.target.value)
    var value = sessions.filter(function(item) {
      return item.name === event.target.value
    })    
    selectSessionId(value[0].id)
  }  
  const handleDeleteConf = (idno) =>{
    axios.delete('/icnhbasadminpanel/conference/remove', {data:{
      id:idno
    }})
    .then(function (response) {
      alert(`${idno} has been deleted`)  
    })
    .catch(function (error) {
      console.log(error);     
      alert(`Deletion failed`)       
    });
  }  

  const handleChangeConf = (event) => {
    setConference(event.target.value)
    var value = conferences.filter(function(item) {
      return item.year === event.target.value
    })    
    setConferenceId(value[0].id)
    value[0].description ? setAbout(value[0].description)  :setAbout('')
    axios.get(`/getsession/${value[0].id}`)
    .then(resp => {
        if(resp.data.length > 0) {
          setSessions(resp.data) 
          selectSession(resp.data[0].name)
          selectSessionId(resp.data[0].id) 
        } else{
          setSessions([{}])
        } 

      });     
         
  }
  
  const sessionAdd = ()=>{
      axios.post('/icnhbasadminpanel/conference/session/add',{
        name:input,
        confid:conferenceId
      })
      .then(function (response) {
        alert(`${input} has been added`)
      })
      .catch(function (error) {
        alert(error);
      });  
  }
  const moveDataToCurrentYear = ()=>{
    axios.post('/icnhbasadminpanel/conference/movedata',{
      confid:conferenceId
    })
    .then(function (response) {
      alert(`All current data has been moved to this year`)
    })
    .catch(function (error) {
      alert(error);
    });
  }
  const updateAbout = ()=>{
    axios.post('/icnhbasadminpanel/conference/updateabout',{
      confid:conferenceId,
      description:about
    })
    .then(function (response) {
      alert(`About has been updated`)
    })
    .catch(function (error) {
      alert(error);
    });
  }
  return(
    <div className="session-edit">
    {        
        conf ?
        <div>
          <div className ="mb-3 d-flex flex-row">
            <Form>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Move Current Data"
                value={showMove}
                onClick={()=>setShowMove(!showMove)}
              />
            </Form>          
            <Button className={showMove ? "ml-auto" : 'hidden' } onClick={moveDataToCurrentYear} variant="danger">MOVE CURRENT DATA TO THIS YEAR</Button>              
          </div>        
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <Button onClick={()=>handleDeleteConf(conferenceId)} variant="danger">DELETE</Button>
              <InputGroup.Text id="basic-addon1">Selected Conferenece</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl     
              as="select"
              value={conference} 
              onChange={handleChangeConf} 
            >
              {
                conferences.map(conf=>(
                  <option key={conf.id}>{conf.year}</option>
                ))
              }
            </FormControl>
          </InputGroup>
          <div>
            <h3>About</h3>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <Button onClick={updateAbout} variant="warning">UPDATE</Button>
              </InputGroup.Prepend>            
              <Form.Control
              as="textarea" 
              rows={5} 
              value={about} 
              onChange={(event)=>setAbout(event.target.value)}                  
              />
            </InputGroup>
          </div>          
          <div>
            <h3>Council</h3>
            <EditMode type={10} confid={conferenceId} img deletelink={"/icnhbasadminpanel/council/remove"} get={"/getcouncil/"} add={"/icnhbasadminpanel/council/add"} sessionId={sessionId} />     
          </div>
          <div>
            <h3>Sponsers</h3>
            <EditMode type={13} confid={conferenceId} img deletelink={"/icnhbasadminpanel/sponserremove"} get={"/sponsers/"} add={"/icnhbasadminpanel/sponseradd"} sessionId={sessionId} />     
          </div>            
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <Button variant="success" onClick={sessionAdd} className="pl-4 pr-4">Add</Button>       
              <InputGroup.Text>Insert Session</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={input} 
              onChange={(event)=>setInput(event.target.value)}
            />
          </InputGroup>      
        </div>
        :<span></span>     
    }         
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button onClick={()=>handleDelete(sessionId)} variant="danger">DELETE</Button>
          <InputGroup.Text id="basic-addon1">Selected Session</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl     
          as="select"
          value={session} 
          onChange={handleChange} 
        >
          {
            sessions.map(session=>(
              <option key={session.id}>{session.name}</option>
            ))
          }
        </FormControl>
      </InputGroup>       
      <h5>Topics</h5>
      <EditMode type={1} deletelink={"/icnhbasadminpanel/session/topic/remove"} get={"/session/topics/"} add={"/icnhbasadminpanel/session/topic/add"} sessionId={sessionId} />     
      <h5>Organizing Committee</h5>
      <EditMode type={2} img deletelink={"/icnhbasadminpanel/session/orgnaizer/remove"} get={"/session/orgnaizers/"} add={"/icnhbasadminpanel/session/orgnaizer/add"} sessionId={sessionId} />     
      <h5>Scientific Committee</h5>
      <EditMode type={2} img deletelink={"/icnhbasadminpanel/session/scientific/remove"} get={"/session/scientifics/"} add={"/icnhbasadminpanel/session/scientific/add"} sessionId={sessionId} />     
      <h5>Invited Speakers</h5>
      <EditMode type={2} img deletelink={"/icnhbasadminpanel/session/speaker/remove"} get={"/session/speakers/"} add={"/icnhbasadminpanel/session/speaker/add"} sessionId={sessionId} />     
      <h5>Participants</h5>
      <EditMode type={3} deletelink={"/icnhbasadminpanel/session/participant/remove"} get={"/session/participants/"} add={"/icnhbasadminpanel/session/participant/add"} sessionId={sessionId} />     
    </div>
  )
}

export default SessionEdit