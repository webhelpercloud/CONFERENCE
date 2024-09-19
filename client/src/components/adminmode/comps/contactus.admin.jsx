import React from 'react'

import { Container } from 'react-bootstrap' ;

import FormUpdate from '../../formupdate/formupdate.component'


const ContactAdminMode = ()=>{ 
  return(
    <Container className="mt-3">
      <h3>Contact</h3>
      <div className="mb-3">
        <FormUpdate type={2} info="Email" />
        <FormUpdate type={2} info="Facebook Page" />
        <FormUpdate type={2} info="Telephone" />
        <FormUpdate type={2} info="Fax" />
        <FormUpdate type={2} info="Mobile" />
      </div>  
  </Container>
  )
}


export default ContactAdminMode