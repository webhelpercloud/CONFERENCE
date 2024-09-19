import React from 'react'

import { Container } from 'react-bootstrap' ;

import FormUpdate from '../../formupdate/formupdate.component'


const MiscAdminMode = ()=>{ 
  return(
    <Container className="mt-3">
      <h3>Contact</h3>
      <div className="mb-3">
        <div>Event Time</div>
        <FormUpdate info="eventTime" />
        <div>Register Time</div>        
        <FormUpdate info="reigstertime" />
        <div>Conferenece Year</div>        
        <FormUpdate info="conferenceYear" />
        <div>Register Ends</div>        
        <FormUpdate info="registerEnds" />
        <div>Front Header</div>        
        <FormUpdate info="headerFront_1" />      
      </div>  
  </Container>
  )
}


export default MiscAdminMode