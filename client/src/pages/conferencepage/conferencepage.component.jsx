import React , { useEffect , useState }  from 'react'

import {useParams} from 'react-router-dom'

import { Container , Row , Col } from 'react-bootstrap'
import SessionItem from '../../components/session-item/session-item.component'
import CouncilMember from '../../components/council-member/member.component'
import WrapItem from '../../components/wrapper-item/wrapper-item.component'


import './conferencepage.styles.scss'


const ConferencePage = ({ setLoading }) => {
  const { year } = useParams()
  const [ conference , setConference ] = useState({})
  const [ sessions , setSessions ] = useState([])
  const [ council , setCouncil ] = useState([])  
  const [ sponsers , setSponsers ] = useState([])  
  const axios = require('axios'); 
  useEffect(()=>{
    document.title = `${year} Conference`;    
    setLoading(true)
    const fetchData = async () =>{
      try {
          const respA = await axios.get(`/getconferenceid/${year}`)
          setConference(respA.data[0])
          const respB = await axios.get(`/getsession/${respA.data[0].id}`)
          respB.data.length > 0 ? setSessions(respB.data) : setSessions([])
          const respC = await axios.get(`/getcouncil/${respA.data[0].id}`)
          respC.data.length > 0 ? setCouncil(respC.data) : setCouncil([])
          const respD = await axios.get(`/sponsers/${respA.data[0].id}`)
          respD.data.length > 0 ? setSponsers(respD.data) : setSponsers([])          
          setLoading(false)
          }catch(err){
          console.log(err)
        }
      }
      fetchData()    
      },[axios , year , setLoading])  
  return(
    <section className="sessions-page">
      <Container className="page-con">
        { 
          conference.description ? 
          <div>
            <div  className="page-title">About {conference.year}</div>
            <Row className="">
              <Col>
                <p style={{textAlign: 'justify'}}>{conference.description}</p>            
              </Col>
            </Row>
          </div> : null
        }      
        <div style={{maxWidth:'400px'}} className="page-title">{conference.year} Council Members</div>
          <Row className="justify-content-md-center">
            { 
              council.map((member,index)=>(
                index===0 
                ? <Container fluid><Row className="justify-content-md-center" key={member.id}><CouncilMember chairman member={member} /></Row></Container>
                :<CouncilMember key={member.id} member={member} />
            ))
            }
          </Row>
        {
          sponsers && sponsers.length > 0 && (
            <div>
              <div className="page-title">{conference.year} Sponsors</div>
              <Row className="justify-content-md-center">
                { 
                  sponsers.map(member=>(
                    <WrapItem key={member.id} item={member}/>    
                ))
                }
              </Row>              
            </div>
          )

        }
        
        <div className="page-title">{conference.year} Sessions</div>
        {
          sessions.map(session => (
            <SessionItem key={session.id} session={session}/>
          ))
        }
      </Container>
    </section>
  )
}


export default ConferencePage