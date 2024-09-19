import React , { useState , useEffect , useRef  } from 'react'

import Countdown from '../../components/countdown/countdown.component'
import { Container,Row,Col , Button } from 'react-bootstrap'
import CouncilMember from '../../components/council-member/member.component'
import WrapItem from '../../components/wrapper-item/wrapper-item.component'

import { Link } from 'react-router-dom'
import MediaQuery  from 'react-responsive'


import './homepage.styles.scss'


import { useInfo } from '../../hooks/useInfo'

const Homepage = ({setLoading})=>{
  const [ eventDate , setEventDate ] = useState('2021-10-06')
  const [ council , setCouncil ] = useState([])
  const [ sponsers , setSponsers ] = useState([])
  const [conf_name , setConf_name] = useState(['',''])
  const [arrowState , setArrowState] = useState(1)  
  const [slider, setSlider] = useState([0,0,0,0])  
  const pointDown=useRef(null)
  const axios = require('axios');
  useEffect(() => {       
    const interval = setInterval(() => {
      const newValue = slider[3]
      if(newValue + 1 <= sponsers.length - 1){
        setSlider([slider[1],slider[2],slider[3],newValue+1])
      }else{
        setSlider([slider[1],slider[2],slider[3],0])
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [slider,sponsers.length]);

  useEffect(()=>{
    setLoading(true)
    document.title ='ICNHBAS Homepage';  
    const fetchData = async ()=>{
      try {
        const respA = await axios.get("/information/eventTime");
        setEventDate(respA.data[0].description)
        const respB = await axios.get("/information/home_1");
        setConf_name(respB.data[0].description.split('TH I'))
        const respC = await axios.get("/councilall");
        respC.data.length > 0 ? setCouncil(respC.data) : setCouncil([])
        const respD = await axios.get("/sponserall");
        respD.data.length > 0 ? setSponsers(respD.data) : setSponsers([])  
        setLoading(false)    
        }catch(err){
        console.log(err)
      }
    }
    fetchData()      
  }, [axios , setLoading])
  const [show, setShow] = useState(false); 
  const scrollToBottom = () => {
    pointDown.current.scrollIntoView({ behavior: "smooth" });
    setArrowState(3)
  }
  return(
  <section className="homepage-section">
    <div className="fronthome-wrapper" style={{ backgroundImage: "url(/assets/homepage-bg.jpg)" }}>
      <div className="fronthome">
        <Container>
        <div onClick={scrollToBottom} className={arrowState === 0 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(1)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
        <div onClick={scrollToBottom} className={arrowState === 1 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(0)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>  
          <Row>
            <Col lg={2} style={{textAlign:'center'}}>
            <br/>              
              <img 
                src={'./assets/conference.png'} 
                height="100"
                width="100"
                alt="confernece"
              />
            </Col>
            <Col className="frontCol">
              <h1>{conf_name[0]}<sup>th </sup>I{conf_name[1]}</h1>
              <h3>{useInfo('home_2')[0].description}</h3>
              <h3>{useInfo('home_3')[0].description}</h3>
              <Link to="/registeration">
                <Button className="frontbtn">
                <div className="h3">
                  Conference Registration 
                </div>
                <div className="h5">
                  {useInfo('registerEnds')[0].description} 
                </div>
                </Button>                
              </Link>
              <Link to="/program">
                <Button className="frontbtn">
                  <span className="h3">Conference Program & Information</span>
                </Button>
              </Link>
              <Countdown key={eventDate} date={eventDate} />   
              <p className="font-italic">Time left for the start of the event</p>            
              </Col>
            <Col lg={2} style={{textAlign:'center'}}>
            <br/>
              <img 
              src={'./assets/science-logo.png'}
              height="100"
              width="100" 
              alt="confernece"              
              />             
            </Col>          
          </Row>
        </Container>
      </div>
    </div>
    <Container className="homepage-body">
      <Row>
        <Col>
          <h4 ref={pointDown}>International Conference on New Horizons in Basic and Applied Science of {useInfo('conferenceYear')[0].description}</h4>
          <MediaQuery minWidth={1224} >
            <p>
              {useInfo('home_4')[0].description}
              {useInfo('home_8')[0].description}
              {useInfo('home_9')[0].description}              
            </p>
            <div className={show ? "nonhidden" :"hidden"}>
              <p>{useInfo('home_5')[0].description} </p>
              <br/>
              <p>{useInfo('home_6')[0].description} </p>
              <br/>
              <p>{useInfo('home_7')[0].description} </p> 
            </div>
            <div onClick={()=>setShow(!show)} className={show ? "hidden" :"body-readmore"}>Read More....</div>
          </MediaQuery>
          <MediaQuery maxWidth={768} >
            <p>{useInfo('home_4')[0].description}</p>          
            <div className={show ? "nonhidden" :"hidden"}>
              <p>{useInfo('home_8')[0].description} {useInfo('home_9')[0].description}</p>              
              <p>{useInfo('home_5')[0].description} </p>
              <br/>
              <p>{useInfo('home_6')[0].description} </p>
              <br/>
              <p>{useInfo('home_7')[0].description} </p> 
            </div>
            <div onClick={()=>setShow(!show)} className={show ? "hidden" :"body-readmore"}>Read More....</div>
          </MediaQuery>          
          Looking forwards to meet you at ICNHBAS {useInfo('conferenceYear')[0].description} in Hurghada, Egypt.
          <Row className="mt-4 justify-content-md-center">
            { 
              council.map((member,index)=>(
                index===0 
                ? <Container key={member.id} fluid><Row className="justify-content-md-center" ><CouncilMember chairman member={member} /></Row></Container>
                :<CouncilMember key={member.id} member={member} />
            ))
            }
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg={1}/>
        <Col>
          <div className="sponsers">
            <div className="sp-bg">
              <h1>Sponsers</h1>
              </div>
              {
                sponsers.length > 0 ?
                <div className="sp-wrap d-flex justify-content-center">
                  <WrapItem item={sponsers[slider[0]]}/>    
                  <WrapItem item={sponsers[slider[1]]}/>  
                  <WrapItem item={sponsers[slider[2]]}/>  
                  <WrapItem item={sponsers[slider[3]]}/>                                                             
                </div>
                : null
              }

          </div>
        </Col>      
        <Col lg={1}/>        
      </Row>      
    </Container>
  </section>
)}


export default Homepage