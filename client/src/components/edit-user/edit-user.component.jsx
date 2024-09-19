import React , { useState , useEffect } from 'react'

import download from 'js-file-download';

import {  Row , Col ,  Form , Button  } from 'react-bootstrap'


import './edit-user.styles.scss'


const EditUser = ({sentUser})=>{  
  const [ user , setUser] = useState(sentUser);
  const [ username , setUsername ] = useState(user.username)
  const [ type , setType ] = useState(user.type)  
  const [ title, setTitle ] = useState(user.title)
  const [ name, setName ] = useState(user.fname)
  const [ id, setId ] = useState(user.id)
  const [ phone, setPhone ] = useState(user.phone)
  const [ email, setEmail ] = useState(user.email)
  const [ work, setWork ] = useState(user.university)
  const [ address, setAddress ] = useState(user.address)
  const [ realPart, setRealPart ] = useState(user.participation_type)  
  const [ desiredSession , setdesiredSession ] = useState(user.desired_session)
  const [ relatedTopic , setrelatedTopic ] = useState(user.related_topic)
  const [ titleofTalks , settitleofTalks ] = useState(user.title_of_talks)
  const [ coAuthors , setcoAuthors ] = useState(user.co_authors)
  const [ abstract , setAbstract ] = useState(user.abstract)
  const [ dateofArrival , setDateofArrival ] = useState(user.arrival)
  const [ dateofdeparture , setDateofdeparture ] = useState(user.departure)
  const [ realAcco , setRealAcco ] = useState(user.accomodation)
  const [ accompanyings , setaccompanyings ] = useState(user.accompanying_person)
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
  const commitEdit = (idno)=>{
    axios.post('/icnhbasadminpanel/user/edit',{
      abstract:abstract,
      accomodation:realAcco,
      accompanying_person:accompanyings,
      address:address,
      arrival:dateofArrival,
      co_authors:coAuthors,
      departure:dateofdeparture,
      desired_session:desiredSession,
      email:email,
      fname:name,
      id:id,
      id_no:idno,
      participation_type:realPart,
      phone:phone,
      related_topic:relatedTopic,
      title:title,
      title_of_talks:titleofTalks,
      type:type,
      university:work,
      username:username,     
    })
    .then(function (response) {
      alert(`${name} has been edited`)
    })
    .catch(function (error) {
      console.log(error);
    });     
  }
  const deleteUser = (idno) =>{
    axios.delete('/icnhbasadminpanel/user/delete/', {data:{
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
  return(
    <Form>
      <Form.Row>
        <Button onClick={()=>commitEdit(user.id_no)} variant='success' className="supervision-btn ml-auto">Edit</Button>                    
        <Button onClick={()=>deleteUser(user.id_no)} variant='danger' className="supervision-btn ml-2 mr-2 ">Delete</Button>                    

      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Type</Form.Label>
          <Form.Control type="text" value={type} onChange={(e)=>setType(e.target.value)} />
        </Form.Group>            
      </Form.Row>    
    <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Professional Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>ID or Passport No.</Form.Label>
          <Form.Control type="text" value={id} onChange={(e)=>setId(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Telephone</Form.Label>
          <Form.Control  type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>University/Institute/Company</Form.Label>
          <Form.Control type="text" value={work} onChange={(e)=>setWork(e.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Participation Type</Form.Label>
          <Form.Control type="text" value={realPart} onChange={(e)=>setRealPart(e.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Desired Session</Form.Label>
          <Form.Control type="text" value={desiredSession} onChange={(e)=>setdesiredSession(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Related Topic</Form.Label>
          <Form.Control type="text" value={relatedTopic} onChange={(e)=>setrelatedTopic(e.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Title of talks</Form.Label>
          <Form.Control type="text" value={titleofTalks} onChange={(e)=>settitleofTalks(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Co-Authors</Form.Label>
          <Form.Control type="text" value={coAuthors} onChange={(e)=>setcoAuthors(e.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Abstract</Form.Label>
          <Form.Control type="text" value={abstract} onChange={(e)=>setAbstract(e.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Date of arrival</Form.Label>
          <Form.Control type="text" value={dateofArrival} onChange={(e)=>setDateofArrival(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Date of departure</Form.Label>
          <Form.Control type="text" value={dateofdeparture} onChange={(e)=>setDateofdeparture(e.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Accomodation</Form.Label>
          <Form.Control type="text" value={realAcco} onChange={(e)=>setRealAcco(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Accompanying person</Form.Label>
          <Form.Control type="text" value={accompanyings} onChange={(e)=>setaccompanyings(e.target.value)} />
        </Form.Group>
      </Form.Row>                            
      <Row>
        <Col>
          <div>ID File</div>
          <div className='download-link' onClick={()=> downloadFile(user.id_file)}>Download</div>
        </Col>
        <Col>
          <div>Accompanying Persons File</div>
          <div className='download-link' onClick={()=> downloadFile(user.accompanying_ids)}>Download</div>
        </Col>        
        <Col>            
          <div>Abstract File</div>
          <div className='download-link' onClick={()=> downloadFile(user.abstract_file)}>Download</div>
        </Col>
      </Row>              
    </Form>
    )
}


export default EditUser