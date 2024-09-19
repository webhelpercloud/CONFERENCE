import React, { useState , useContext , useEffect } from 'react'

import {Navbar , Nav , NavDropdown } from 'react-bootstrap'
import { Link , useLocation } from 'react-router-dom'

import { Logged } from '../../context/logged'

import './header.styles.scss'

const Header = () =>{
  const [locState , setLocaState] = useState(0)
  let location = useLocation().pathname;
  const { logged } = useContext(Logged)  
  const [show, setShow] = useState(false); 
  const [ conferences , setConferences ] = useState([])
  const axios = require('axios'); 
  useEffect(()=>{
      axios.get(`/conferences/all`)
      .then(resp => {
          if(resp.data.length > 0){
            setConferences(resp.data)
          }else{
            setConferences([])
          } 
      
        });
        switch (location) {
          case '/sessions':
            setLocaState(1)
            break;
          case '/program':
            setLocaState(2)
            break;
          case '/accommodation':
            setLocaState(3)
            break;
          case '/fees':
            setLocaState(3)
            break;
          case '/registeration':
            setLocaState(4)
            break;
          case '/organizer':
            setLocaState(5)
            break;
          case '/contactus':
            setLocaState(6)
            break;
          case '/login':
            setLocaState(7)
            break;
          case '/myaccount':
            setLocaState(8)
            break;
          case '/myaccount/changepassword':
            setLocaState(8)
            break;
          case '/myaccount/verification':
            setLocaState(8)
            break;
         
          default:
            setLocaState(0)      
            break;
        }
  }, [axios,location]);

  const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}
  return(
  <Navbar bg="white" variant="light" expand="lg">
    <Link to='/'>
      <Navbar.Brand>
          <img
            src="/assets/logo.png" 
            alt="ICHNBAS"
          />
        </Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Link className={locState === 1 ? "nav-link font-weight-bold" : "nav-link" } to='/sessions' >Sessions</Link>
        <Link className={locState === 2 ? "nav-link font-weight-bold" : "nav-link" } to='/program' >Program</Link>
        <Link className={locState === 3 ? "nav-link font-weight-bold" : "nav-link" } to='/accommodation' >Accommodation & Fees</Link>
        {
          logged ? <div></div> 
                 : <Link className={locState === 4 ? "nav-link font-weight-bold" : "nav-link" } to='/registeration' >Registration</Link>              
        }
        <Link className={locState === 5 ? "nav-link font-weight-bold" : "nav-link" } to='/organizer' >Organizer</Link>
        <Link className={locState === 6 ? "nav-link font-weight-bold" : "nav-link" } to='/contactus' >Contact Us</Link> 
        {
          logged ? <Link className={locState === 8 ? "nav-link font-weight-bold" : "nav-link" } to='/myaccount' >Account</Link>  
                 :        <Link className={locState === 7 ? "nav-link font-weight-bold" : "nav-link" } to='/login' >Login</Link>              
        }
        <NavDropdown className={location.slice(0,11) === '/conference' ? "bold-conf" : "" } show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown} title="Previous Confereneces" id="basic-nav-dropdown">
          {
            conferences.map((entery,index)=>
              <div key={entery.id}>
                <Link className="dropdown-item" to={`/conference/${entery.year}`} >{entery.year}</Link> 
                {conferences.length-1  === index ?<span></span> : <NavDropdown.Divider /> }
              </div>              
              )
          }          
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)}


export default Header