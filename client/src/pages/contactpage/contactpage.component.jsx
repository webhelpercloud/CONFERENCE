import React , { useEffect , useState , useRef } from 'react'


import { Container , Row , Col , Table } from 'react-bootstrap'
import HeaderFront from '../../components/headerfront/headerfront.component'

import './contactpage.styles.scss'


const ContactPage = ({setLoading})=>{
  const [ contacts , setContacts ] = useState([])
  const [ council , setCouncil ] = useState([])
  const [arrowState , setArrowState] = useState(1)  
  const pointDown=useRef(null)  
  const scrollToBottom = () => {
    pointDown.current.scrollIntoView({ behavior: "smooth" });
    setArrowState(3)
  }
  const axios = require('axios');
  useEffect(()=>{
    setLoading(true)
    document.title = 'Contact Us';
    const fetchData = async ()=>{
      try {
        const respA = await axios.get('/contactinfo')
        setContacts(respA.data)   
        const respB = await axios.get('/councilall')
        respB.data.length > 0 ? setCouncil(respB.data) : setCouncil([])  
        setLoading(false)
        scrollToBottom()       
        }catch(err){
        console.log(err)
      }
    }
    fetchData()       
    },[axios,setLoading])   
  return(
  <section className='contact-page'>
  <HeaderFront/>  
    <Container className="page-con">
      <div onClick={scrollToBottom} className={arrowState === 0 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(1)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
      <div onClick={scrollToBottom} className={arrowState === 1 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(0)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
      <div ref={pointDown} className="page-title">Contact Us</div>
      <h4>All correspondence should be addressed to :</h4>
      <Row className="justify-content-md-center">
        {
          council.map(member=>(
            member.event_title ? 
            <Col key={member.id} style={{ padding:'1rem'}} lg={6}>
              <h5>{member.event_title}</h5>
              <div style={{fontSize:"20"}}>{member.name}</div>
              <div>{member.email}</div>              
            </Col>
            : null
          ))
        }
      </Row>
      <div className="table">
        <Table striped bordered hover size="sm">
          <tbody>
            {
              contacts.map(cont=>(
                <tr key={cont.id}>
                  <td style={{textAlign:'center'}}><img alt="icon" src={cont.icon} height="24" width="24" /></td>
                  <td>{cont.type}</td>
                  <td>
                  {
                    cont.type==='Facebook Page' ? <a rel="noreferrer" href={cont.description} target="_blank" >ICNHBAS</a>
                    :<span>{cont.description}</span>
                  }                  
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>      
      </div>
    </Container>    
  </section>
)}



export default ContactPage