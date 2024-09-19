import React from 'react'

import {   Container } from 'react-bootstrap' ;

import FormUpdate from '../../formupdate/formupdate.component'
import EditMode from '../../editmode/editmode.component'


const HomePageAdminMode = ()=>{

  return(
    <Container className="mt-3">
      <h3>HomePage</h3>
      <div className="mb-3">
        <FormUpdate info="home_1" />
        <FormUpdate info="home_2" />
        <FormUpdate info="home_3" />
        <FormUpdate info="home_4" />
        <FormUpdate info="home_8" />
        <FormUpdate info="home_9" />                
        <FormUpdate info="home_5" />
        <FormUpdate info="home_6" />
        <FormUpdate info="home_7" />
      </div>
      <div className="mb-3">
        <h3>Council</h3>
        <EditMode type={10} confid={0} img deletelink={"/icnhbasadminpanel/council/remove"} get={"/getcouncil/"} add={"/icnhbasadminpanel/council/add"} />     
      </div>
      <div>
        <div className="mb-3">
          <h3>Sponsers</h3>
        </div>    
        <EditMode type={12} confid={0} img deletelink={"/icnhbasadminpanel/sponserremove"} get={"/sponserall"} add={"/icnhbasadminpanel/sponseradd"} />               
      </div>
  </Container>
  )
}


export default HomePageAdminMode