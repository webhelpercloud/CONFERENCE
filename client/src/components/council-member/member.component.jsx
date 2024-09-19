import React from 'react'

import { Row , Col} from 'react-bootstrap'

import './member.styles.scss'


const CouncilMember= ({member , chairman}) =>{
  return(
  <Col lg={6}>
    <Row  style={{margin:10}}>   
      <Col lg={3}>
        <img className="concil-member-img" src={`/uploads/${member.img}`} height="100" width="100" alt="confernece"/>
      </Col>
      <Col>
        <div className="member-event-title">{member.event_title}</div>
        <div className="member-name">{member.name}</div>
        <div className="member-title">{member.title}</div>
        <div className="member-desc">{member.email}</div>
     </Col>
    </Row>
  </Col>    

  )
}

export default CouncilMember