import React , { useEffect , useState , useRef } from 'react'


import { Container , Card } from 'react-bootstrap'
import HeaderFront from '../../components/headerfront/headerfront.component'

import './programpage.styles.scss'

const ProgramPage = ({setLoading})=>{
  const [data , setData] = useState([])
  const [arrowState , setArrowState] = useState(1)  
  const pointDown=useRef(null)  
  const scrollToBottom = () => {
    pointDown.current.scrollIntoView({ behavior: "smooth" });
    setArrowState(3)
  }  
  const axios = require('axios'); 
  useEffect(()=>{
    setLoading(true)
    document.title = 'Program';
    const fetchData = async ()=>{
      try {
        const resp = await axios.get('/programall')
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
  <section className="program-page">
  <HeaderFront/>
    <Container className="page-con">
      <div onClick={scrollToBottom} className={arrowState === 0 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(1)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
      <div onClick={scrollToBottom} className={arrowState === 1 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(0)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>  
      <div ref={pointDown} className="page-title">Program</div>
{/*     <div className="h4">Program Guides</div>      
      <Row className="mt-4 justify-content-md-center">
        { 
          admins.map((member,index)=>(
            index===0 
            ? <Container key={member.id} fluid><Row className="justify-content-md-center" ><CouncilMember chairman member={member} /></Row></Container>
            :<CouncilMember key={member.id} member={member} />
        ))
          }
      </Row> */}     
      <div className="h4">Important Dates</div>
      <div className="d-flex flex-wrap justify-content-between">
        {
          data.map(date=>(
            <Card
              bg={ date.id % 2 === 0 ? 'primary' : 'light' }
              key={date.id}
              text={date.id % 2 === 0 ? 'white' : 'dark'}
              style={{ width: '18rem' }}
              className="m-4"
            > 
                <Card.Header className="font-weight-bold">{date.date}</Card.Header>
                <Card.Body>
                  <Card.Title className="text-center">{date.description} </Card.Title>
                </Card.Body>
            </Card>
          ))
        }
      </div>
    </Container>
  </section>
)}


export default ProgramPage