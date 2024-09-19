import React , { useState } from 'react'

import {  Button ,  Container } from 'react-bootstrap' ;

import SessionEdit from '../../sessions-edit/session-edit.component'
import ModAdd from '../../modadd/modadd.component'

const SessionsAdminMode = () =>{
  const [ sessionMode , setSessionMode ] = useState(0)    
  return(
    <Container className="mt-3">
      <h3>Sessions</h3>
      <div className="d-flex flex-row justify-content-around mb-3">
        <Button variant={sessionMode === 0 ? 'primary' : 'dark' } onClick={()=>setSessionMode(0)}>Insert</Button>   
        <Button variant={sessionMode === 1 ? 'primary' : 'dark' } onClick={()=>setSessionMode(1)}>Edit</Button>   
      </div>   
      <div>        
        {
          sessionMode === 0 ? <ModAdd type={3}/> : <SessionEdit />
        }
      </div>         
    </Container>
  )
}



export default SessionsAdminMode