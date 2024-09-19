import React from 'react'

import { Container } from 'react-bootstrap' ;

import FormUpdate from '../../formupdate/formupdate.component'


const EmailAdminMode = ()=>{ 
  return(
    <Container className="mt-3">
      <h3>Email</h3>
      <div className="mb-3">
        <FormUpdate info="conferenceYear" />    
        <FormUpdate info="email_conf" />      
        <FormUpdate info="email_name" />      
      </div>
      <h3>Acceptence Letter</h3>      
      <div className="mb-3">
        <FormUpdate info="letter_name_1" />    
        <FormUpdate info="letter_img_1" />   
        <FormUpdate info="letter_name_2" />      
        <FormUpdate info="letter_img_2" />         
        <FormUpdate info="letter_img_3" />             
      </div>         
  </Container>
  )
}


export default EmailAdminMode