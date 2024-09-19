import React , { useState , useEffect  } from 'react'


import { Container,Row,Col , Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Countdown from '../countdown/countdown.component'

import './headerfront.styles.scss'

import { useInfo } from '../../hooks/useInfo'


const HeaderFront = ({ timer })=>{
  const [ eventDate , setEventDate ] = useState('2021-10-06')
  const axios = require('axios');
  useEffect(()=>{
    axios.get(`/information/reigstertime`).then(resp => {
      setEventDate(resp.data[0].description)
    } );
  }, [axios])

  return(
  <div className="fronthome-wrapper" style={{ backgroundImage: "url(/assets/homepage-bg.jpg)" }}>
  <div className="fronthome">
    <Container>
      <Row>
        <Col lg={2} />
            <Col className="frontCol">
              <img
                src={'/assets/logo.png'} 
                alt="confernece"          
              />
              <br/>
              <br/> 
              <h3>{useInfo('headerFront_1')[0].description}</h3>
              {
                timer ?
                <div>
                  <Countdown date={eventDate} />    
                  <p className="font-italic">Time left untill registeration ends</p>                     
                </div>
                :
                <Link to="/registeration">
                <Button className="frontbtn">
                  <div className="h3">
                    Register Now 
                  </div>
                </Button>                
                </Link>                             
              }            
              <br/>          
              <div className="h5 pb-3">{useInfo('registerEnds')[0].description}</div>            
            </Col>             
          <Col lg={2} />                
      </Row>
    </Container>
  </div>
</div>
)}



export default HeaderFront