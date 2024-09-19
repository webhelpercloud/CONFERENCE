import React , { useState , useEffect } from 'react'

import download from 'js-file-download';

import {  Row , Col ,  Form  } from 'react-bootstrap'


import './show-user.styles.scss'


const ShowUser = ({sentUser , type})=>{  
  const [ user , setUser] = useState(sentUser)
  const axios = require('axios');
  useEffect(()=>{
      axios.get(`/user/${user.id_no}`).then(resp => {
        setUser(resp.data[0])
      });
  },[user.id_no,axios])
  const downloadFile = (file)=>{
    axios.get(`/download/${file}` , {responseType: 'blob'})
    .then(resp => {
            download(resp.data, file);
     });
  }
  const downloadLetter = (file)=>{
    axios.get(`/downloadletter/${file}` , {responseType: 'blob'})
    .then(resp => {
            download(resp.data, file);
     });
  }  
  if(type === 2){
    return(
      <Form>
        <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Username</Form.Label>
          <Form.Control readOnly type="text" value={user.username} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Verified</Form.Label>
          <Form.Control readOnly type="text" value={user.verified ? user.verified===1 ? 'Half Verified' :'Verified' : 'Being Checked'} />
        </Form.Group>            
      </Form.Row>
      <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Professional Title</Form.Label>
            <Form.Control readOnly type="text" value={user.title} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Full Name</Form.Label>
            <Form.Control readOnly type="text" value={user.fname}/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>ID or Passport No.</Form.Label>
            <Form.Control readOnly type="text" value={user.id} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Telephone</Form.Label>
            <Form.Control readOnly type="text" value={user.phone}/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control readOnly type="text" value={user.email} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Address</Form.Label>
            <Form.Control readOnly type="text" value={user.address}/>
          </Form.Group>
        </Form.Row>
        {
          user.receipt ?
          <Row>
            <Col>
              <div>Receipt</div>
              <a href={`https://www.icnhbas.com/uploads/${user.receipt}`} className='download-link' rel='noreferrer' target='_blank' onClick={()=> downloadFile(user.receipt)}>Download</a>
            </Col>
          </Row>
          : null
       }             
      </Form>
    )
  }else{
  return(
    <Form>
      <Form.Row>
        <a href={`https://www.icnhbas.com/uploads/letters/${user.acceptance_letter}`} style={{fontSize:'25px'}} className={user.acceptance_letter ? 'ml-auto download-link' :'hidden'} rel='noreferrer' target='_blank' onClick={()=>downloadLetter(user.acceptance_letter)}>Acceptance Letter</a>
      </Form.Row>
      <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>Username</Form.Label>
        <Form.Control readOnly type="text" value={user.username} />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Verified</Form.Label>
        <Form.Control readOnly type="text" value={user.verified ? user.verified===1 ? 'Half Verified' :'Verified' : 'Being Checked'} />
      </Form.Group>            
    </Form.Row>
    <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Professional Title</Form.Label>
          <Form.Control readOnly type="text" value={user.title} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Full Name</Form.Label>
          <Form.Control readOnly type="text" value={user.fname}/>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>ID or Passport No.</Form.Label>
          <Form.Control readOnly type="text" value={user.id} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Telephone</Form.Label>
          <Form.Control readOnly type="text" value={user.phone}/>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control readOnly type="text" value={user.email} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>University/Institute/Company</Form.Label>
          <Form.Control readOnly type="text" value={user.university}/>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Address</Form.Label>
          <Form.Control readOnly type="text" value={user.address} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Participation Type</Form.Label>
          <Form.Control readOnly type="text" value={user.participation_type}/>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Desired Session</Form.Label>
          <Form.Control readOnly type="text" value={user.desired_session} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Related Topic</Form.Label>
          <Form.Control readOnly type="text" value={user.related_topic}/>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Title of talks</Form.Label>
          <Form.Control readOnly type="text" value={user.title_of_talks} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Co-Authors</Form.Label>
          <Form.Control readOnly type="text" value={user.co_authors}/>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Abstract</Form.Label>
          <Form.Control readOnly type="text" value={user.abstract} as="textarea" rows={2}  />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Date of arrival</Form.Label>
          <Form.Control readOnly type="text" value={user.arrival} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Date of departure</Form.Label>
          <Form.Control readOnly type="text" value={user.departure}/>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Accomodation</Form.Label>
          <Form.Control readOnly type="text" value={user.accomodation} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Accompanying person</Form.Label>
          <Form.Control readOnly type="text" value={user.accompanying_person}/>
        </Form.Group>
      </Form.Row>                            
      <Row>
        <Col>
          <div>ID File</div>
          <a href={`https://www.icnhbas.com/uploads/${user.id_file}`} rel='noreferrer' target='_blank' className='download-link' onClick={()=> downloadFile(user.id_file)}>Download</a>
        </Col>
        <Col>
          <div>Accompanying Persons File</div>
          <a href={`https://www.icnhbas.com/uploads/${user.accompanying_ids}`} rel='noreferrer' target='_blank' className='download-link' onClick={()=> downloadFile(user.accompanying_ids)}>Download</a>
        </Col>
        <Col>            
          <div>Abstract File</div>
          <a href={`https://www.icnhbas.com/uploads/${user.abstract_file}`} rel='noreferrer' target='_blank' className='download-link' onClick={()=> downloadFile(user.abstract_file)}>Download</a>
        </Col>
      </Row>              
    </Form>
    )}
}


export default ShowUser