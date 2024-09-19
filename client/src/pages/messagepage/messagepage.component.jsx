import React , { useEffect  } from 'react'


import { Container,Row,Col , Alert } from 'react-bootstrap'
import { Link , useHistory , useLocation  } from "react-router-dom"

import './messagepage.styles.scss'


const MessagePage = ({type})=>{
  let history = useHistory();
  const { pathname } = useLocation();  
  useEffect(()=>{
    window.scrollTo(0, 0)    
    document.title = type === 1 ? 'Registeration Complete' : 'ICNHBAS'    
    setTimeout(
      () => pathname === '/registeration/success' ? history.push("/") : null, 
      5000
    );
  }, [type,pathname,history])
  return(
  <section className="homepage-section">
    <div className="fronthome-wrapper" style={{ backgroundImage: "url(/assets/homepage-bg.jpg)" }}>
      <div className="fronthome">
        <Container>
          <Row>
            <Col lg={2} />
            <Col>
              <div style={{textAlign:'center' , marginBottom:'2.5rem'}}>
                <img 
                  src={'../assets/conference.png'} 
                  height="120"
                  width="120"
                  alt="confernece"
                />              
              </div>    
              <Alert variant="primary">
                <Alert.Heading>Registration has been completed</Alert.Heading>
                <hr />
                <p style={{fontSize:'19px' , textAlign:'justify'}}>
                  Your registration has been successfully completed . You can now login with your username and password . But you still need to verify your account ,  Please check your email for any further instruction regarding the verification process
                </p>
              </Alert>     
              <Alert variant="warning" >
                  You will be automatically redirected in 5 seconds , If not please click <Link onClick={()=> history.push("/")}>here </Link>
              </Alert>                  
            </Col>
            <Col lg={2} />            
          </Row>        
        </Container>
      </div>
    </div>
   </section>
)}


export default MessagePage