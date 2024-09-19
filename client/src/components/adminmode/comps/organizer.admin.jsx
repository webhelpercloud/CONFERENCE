import React from 'react'

import { Container } from 'react-bootstrap' ;

import FormUpdate from '../../formupdate/formupdate.component'


const OrganizerAdminMode = ()=>{ 
  return(
    <Container className="mt-3">
      <h3>Organizer</h3>
      <div className="mb-3">
        <FormUpdate info="organizer_1" rows={5} />
      </div>
   
  </Container>
  )
}


export default OrganizerAdminMode