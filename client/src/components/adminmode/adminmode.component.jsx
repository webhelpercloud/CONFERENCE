import React from 'react'


import HomePageAdminMode from './comps/homepage.admin'
import SessionsAdminMode from './comps/sessions.admin'
import ProgramAdminMode from './comps/program.admin'
import AccoFeeAdminMode from './comps/accommodation-fees.admin'
import OrganizerAdminMode from './comps/organizer.admin'
import ContactAdminMode from './comps/contactus.admin'
import MiscAdminMode from './comps/misc.admin'
import ConferenceAdminMode from './comps/conference.admin'
import EmailAdminMode from './comps/email.admin'
import './adminmode.styles.scss'


const AdminMode = ({mode}) =>{

  if(mode===0){
    return(
      <HomePageAdminMode/>
    )
  }
  if(mode===1){
    return(
      <SessionsAdminMode/>
    )
  }
  if(mode===2){
    return(
      <ProgramAdminMode/>
    )
  }
  if(mode===3){
    return(
      <AccoFeeAdminMode/>
    )
  }
  if(mode===4){
    return(
      <OrganizerAdminMode/>
    )
  }
  if(mode===5){
    return(
      <ContactAdminMode/>
    )
  }
  if(mode===6){
    return(
      <MiscAdminMode/>
    )
  }  
  if(mode===7){
    return(
      <ConferenceAdminMode/>
    )
  }
  if(mode===8){
    return(
      <EmailAdminMode/>
    )
  }

}





export default AdminMode