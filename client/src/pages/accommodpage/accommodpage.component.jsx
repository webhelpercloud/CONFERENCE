import React , { useEffect , useState , useRef } from 'react'


import {Container , Table , Alert } from 'react-bootstrap'
import HeaderFront from '../../components/headerfront/headerfront.component'

import { useInfo } from '../../hooks/useInfo'

import './accommodpage.styles.scss'

const AccommodationPage = ({setLoading})=>{
  const [data , setData] = useState([{}])
  const axios = require('axios'); 
  const [arrowState , setArrowState] = useState(1)  
  const pointDown=useRef(null)  
  const scrollToBottom = () => {
    pointDown.current.scrollIntoView({ behavior: "smooth" });
    setArrowState(3)
  }  
  useEffect(()=>{
    document.title = 'Accommodation & Fees';
    setLoading(true)
    const fetchData = async ()=>{
      try {
        const resp = await axios.get('/fees/all')
        resp.data.length > 0 ? setData(resp.data) : setData([{}])
        setLoading(false)
        scrollToBottom()
        }catch(err){
        console.log(err)
      }
    }
    fetchData()    
    },[axios,setLoading])  
  return(
  <section className='accommodation-page'>
  <HeaderFront/>  
    <Container className="page-con">
      <div onClick={scrollToBottom} className={arrowState === 0 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(1)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
      <div onClick={scrollToBottom} className={arrowState === 1 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(0)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
      <div ref={pointDown} className="page-title">Accommodation</div>
      <div className="page-intro">{useInfo('accommodation_1')[0].description}</div>
      <div className="page-note">
        <h3>Please Note</h3>
        <Alert variant={'warning'}>
          <div className="note">{useInfo('accommodation_2')[0].description}</div>
        </Alert>
        <div className="address"><span>Address</span>:{useInfo('accommodation_3')[0].description}</div>            
      </div>
    </Container>
    <Container className="page-con">
      <div className="page-title">Fees</div>
      <div className="page-intro">{useInfo('fees_1')[0].description}</div>    
      <div className="registration-fees">
        <h4>Registration Fees</h4>
        <div className="fees-desc">For Egyptian Participants (L.E.)</div>
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>Dateline</th>
              <th>{useInfo('fees_2')[0].description}</th>
              <th>{useInfo('fees_3')[0].description}</th>
            </tr>
          </thead>
          <tbody>
            {
              data.filter(entery=>entery.the_table=== 'eg').map(entery=>
                <tr key={entery.id}>
                  <td>{entery.description}</td>
                  <td>{entery.first_value}</td>
                  <td>{entery.second_value}</td>
                </tr>
                ) 
            }
          </tbody>
        </Table>      
        <div className="fees-desc">For non–Egyptian participants ($)</div>
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>Dateline</th>
              <th>{useInfo('fees_2')[0].description}</th>
              <th>{useInfo('fees_3')[0].description}</th>
            </tr>
          </thead>
          <tbody>
          {
            data.filter(entery=>entery.the_table=== 'non').map(entery=>
              <tr key={entery.id}>
                <td>{entery.description}</td>
                <td>{entery.first_value}</td>
                <td>{entery.second_value}</td>
              </tr>
              ) 
          }
          </tbody>
        </Table>   
        <Alert variant={'warning'}>
          <ul>
            <li>{useInfo('fees_4')[0].description}</li>
            <li>{useInfo('fees_5')[0].description}</li>

          </ul>
        </Alert>        
      </div>  
      <div className="bank-account">
        <div className="intro">Payment of registration fees will be accepted by cash or bank transfer:</div>
        <Table bordered hover>
          <thead>
            <tr>
              <th className="left-side">Account Name</th>
              <th className="right-side">{useInfo('bank_1')[0].description}</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="left-side">Bank Name</th>
              <th className="right-side">{useInfo('bank_2')[0].description}</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="left-side">Swift Code</th>
              <th className="right-side">{useInfo('bank_3')[0].description}</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="left-side">Account Number</th>
              <th className="right-side">{useInfo('bank_4')[0].description}</th>
            </tr>
          </thead>      
          <thead>
            <tr>
              <th className="left-side">IBAN (EGP)</th>
              <th className="right-side">{useInfo('bank_5')[0].description}</th>
            </tr>
          </thead> 
          <thead>
            <tr>
              <th className="left-side">IBAN (USD)</th>
              <th className="right-side">{useInfo('bank_6')[0].description}</th>
            </tr>
          </thead>                                             
        </Table>
      </div>
    </Container>    
  </section>
)}



export default AccommodationPage