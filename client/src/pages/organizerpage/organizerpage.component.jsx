import React , { useEffect ,useRef , useState } from 'react'


import { Container , Row , Col } from 'react-bootstrap'
import HeaderFront from '../../components/headerfront/headerfront.component'

import './organizerpage.styles.scss'

const OrganizerPage = ({ setLoading })=>{
  const axios = require('axios');
  const [organizerInfo , setOrganizerInfo] = useState(1)     
  const [arrowState , setArrowState] = useState(1)  
  const pointDown=useRef(null)  
  const scrollToBottom = () => {
    pointDown.current.scrollIntoView({ behavior: "smooth" });
    setArrowState(3)
  }  
  useEffect(()=>{
    setLoading(true)
    document.title = 'Organizer';
    const fetchData = async ()=>{
      try {
        const resp = await axios.get('/information/organizer_1')
        resp.data.length > 0 ? setOrganizerInfo(resp.data[0].description) : setOrganizerInfo("Azhar") 
        setLoading(false)
        scrollToBottom()
      }catch(err){
        console.log(err)
      }
    }
    fetchData()    
    },[axios , setLoading])   
  return(
  <section className='organizer-page'>
    <HeaderFront/>  
    <Container className="page-con">
      <div onClick={scrollToBottom} className={arrowState === 0 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(1)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
      <div onClick={scrollToBottom} className={arrowState === 1 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(0)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
      <div ref={pointDown} className="page-title">Organizer</div>
      <Row>
        <Col lg={3}/>
        <Col className="page-img">
          <img alt="alazhar-logo" width="300" height="300" src='./assets/organizer.png' />
        </Col>
        <Col lg={3}/>
      </Row>      
      <p>{organizerInfo}</p>
    </Container>    
  </section>
)}



export default OrganizerPage