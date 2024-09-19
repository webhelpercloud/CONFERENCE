import React , { useState , useEffect } from 'react'

import { Accordion , Card , Button , Badge} from 'react-bootstrap'

import CouncilMember from '../council-member/member.component'

import './session-item.styles.scss'


const SessionItem = ({session}) => {
  const [ topics , setTopics ] = useState([])
  const [ orgcommittees , setOrgcommittees ] = useState([])
  const [ scicommittees , setScicommittees ] = useState([])
  const [ speakers , setSpeakers ] = useState([])
  const [ participants , setParticipants ] = useState([])

  const axios = require('axios'); 
  useEffect(()=>{
    axios.get(`/session/topics/${session.id}`)
    .then(resp => {
        resp.data.length > 0 ? setTopics(resp.data) : setTopics([])     
      });     
    axios.get(`/session/orgnaizers/${session.id}`)
    .then(resp => {
        resp.data.length > 0 ? setOrgcommittees(resp.data) : setOrgcommittees([])     
      });     
     axios.get(`/session/scientifics/${session.id}`)
    .then(resp => {
        resp.data.length > 0 ? setScicommittees(resp.data) : setScicommittees([])     
      });     
     axios.get(`/session/speakers/${session.id}`)
    .then(resp => {
        resp.data.length > 0 ? setSpeakers(resp.data) : setSpeakers([])     
      });     
     axios.get(`/session/participants/${session.id}`)
    .then(resp => {
        resp.data.length > 0 ? setParticipants(resp.data) : setParticipants([])     
      });     
            
  }, [axios,session.id]);

  return(
  <div className="session-item">
    <h4 className="session-name">{session.name}</h4>
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Topics
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {
              topics.length > 0 ? 
              topics.map((topic,i)=>(
                <div key={i} className="topic">{parseInt(i+1)} . {topic.topic_name}</div>
              ))
              : <div className="no-data">No data for topics has been added</div>
            }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Organizing Committee
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {
              orgcommittees.length > 0 ? 
              orgcommittees.map(member=>(
                <CouncilMember key={member.id} member={member}/>
              ))
              :<div className="no-data">No data for Organizing Commitee has been added</div>
            }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Scientific Committee
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          {
            scicommittees.length > 0 ? 
            scicommittees.map(member=>(
              <CouncilMember key={member.id} member={member}/>
            ))
            :<div className="no-data">No data for Scientific Commitee has been added</div>
          }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Invited Speakers
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          {
            speakers.length > 0 ? 
            speakers.map(member=>(
              <CouncilMember key={member.id} member={member}/>
            ))
            :<div className="no-data">No data for Speakers has been added</div>
          }          
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Participants
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          {
            participants.length > 0 ? 
            participants.map(member=>(
              <div className="participant" key={member.id}>
                <div className="h5">{member.name} {
                  member.type === 'Oral' ?
                    <Badge variant='success'>{member.type}</Badge>:
                  member.type === 'Poster' ?
                  <Badge variant='warning'>{member.type}</Badge> :
                  member.type === 'Simply attender' ?   
                  <Badge variant='info'>Attender</Badge> :
                  <Badge variant='primary'>Virtual</Badge>                                                 
                }</div>
                <div className="h6">{member.title}</div>
                <div className="">{member.email}</div>
              </div>
            ))
            :<div className="no-data">No data for Participants has been added</div>
          }          
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
 
  </div>
)}



export default SessionItem