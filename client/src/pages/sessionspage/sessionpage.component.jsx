import React , { useEffect , useState , useRef }  from 'react'


import {Container } from 'react-bootstrap'
import HeaderFront from '../../components/headerfront/headerfront.component'
import SessionItem from '../../components/session-item/session-item.component'



import './sessionpage.style.scss'


const SessionsPage = ({setLoading}) => {
  const [ sessions , setSessions ] = useState([])
  const [arrowState , setArrowState] = useState(1)  
  const pointDown=useRef(null)  
  const scrollToBottom = () => {
    pointDown.current.scrollIntoView({ behavior: "smooth" });
    setArrowState(3)
  }
  const axios = require('axios');
  useEffect(()=>{
    setLoading(true)
    document.title = 'Sessions';

    const fetchData = async ()=>{
      try {
        const resp = await axios.get('/sessionsall')
        resp.data.length > 0 ? setSessions(resp.data) : setSessions([]) 
        setLoading(false)
        scrollToBottom()
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
    },[axios,setLoading])   

  return(
    <section className="sessions-page">
      <HeaderFront/>
      <Container className="page-con">
      <div onClick={scrollToBottom} className={arrowState === 0 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(1)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
      <div onClick={scrollToBottom} className={arrowState === 1 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(0)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>     
        <div ref={pointDown} className="page-title">Sessions</div>
        {
          sessions.map(session => (
            <SessionItem key={session.id} session={session}/>
          ))
        }
      </Container>
    </section>
  )
}


export default SessionsPage