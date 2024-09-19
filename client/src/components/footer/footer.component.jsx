import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import './footer.styles.scss'


const Footer = ()=>(
  <div className="footer">
    <Container>
      <Row style={{paddingTop:'1rem'}}>
        <Col lg={9}>
          <p>All Rights Reserved © ICNHBAS  . </p>
        </Col>
        <Col>
          <div>Powered By <a style={{color:'white'}} href="https://yahya.abodahab.com/">Yahya Abo-Dahab</a></div>
        </Col>        
      </Row>
    </Container>
  </div>
)


export default Footer 