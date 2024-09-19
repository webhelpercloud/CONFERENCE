import React , { useState } from 'react'

import { Spinner } from 'react-bootstrap'

import { Switch , Route } from 'react-router-dom'



import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component'
import SessionsPage from './pages/sessionspage/sessionpage.component'
import AccommodationPage from './pages/accommodpage/accommodpage.component'
import OrganizerPage from './pages/organizerpage/organizerpage.component'
import ContactPage from './pages/contactpage/contactpage.component'
import RegisterPage from './pages/registerpage/registerpage.component'
import ProgramPage from './pages/programpage/programpage.component'
import LoginPage from './pages/loginpage/loginpage.component'
import AccountPage from './pages/accountpage/accountpage.component'
import SupervisionPage from './pages/supervisionpage/supervisionpage.component'
import AdminPage from './pages/adminpage/adminpage.component'
import UsersPage from './pages/userspage/userspage.component'
import ConferencePage from './pages/conferencepage/conferencepage.component'
import VerificationPage from './pages/verificationpage/verificationpage.component'
import ChangePasswordPage from './pages/changepassword/changepassword.component'
import ForgetPage from './pages/forgetpage/forgetpage.component'
import MessagePage from './pages/messagepage/messagepage.component'
import Footer from './components/footer/footer.component'

import PublicState from './context/public'


import './App.scss';


function App() {
  const [loading , setLoading] = useState(false)
  return (
    <PublicState>
      {
        loading ?
        <div className="loading">
          <Spinner animation="border" variant="primary" />
        </div>
        : null
      }  
        <Header/>
        <Switch>
          <Route exact path="/" render={(props)=>(<Homepage setLoading={setLoading} {...props} />)} />
          <Route exact path="/sessions" render={(props)=>(<SessionsPage setLoading={setLoading} {...props} />)}  />  
          <Route exact path="/accommodation" render={(props)=>(<AccommodationPage setLoading={setLoading} {...props} />)}/>  
          <Route exact path="/fees" render={(props)=>(<AccommodationPage setLoading={setLoading} {...props} />)} />   
          <Route exact path="/organizer" render={(props)=>(<OrganizerPage setLoading={setLoading} {...props} />)} />   
          <Route exact path="/contactus" render={(props)=>(<ContactPage setLoading={setLoading} {...props} />)}  />   
          <Route exact path="/registeration" render={(props)=>(<RegisterPage setLoading={setLoading} {...props} />)} />
          <Route exact path="/program" render={(props)=>(<ProgramPage setLoading={setLoading} {...props} />)} />
          <Route exact path="/login"  component={LoginPage} />      
          <Route exact path="/myaccount" render={(props)=>(<AccountPage setLoading={setLoading} {...props} />)} />
          <Route path="/myaccount/verification"  component={VerificationPage} />        
          <Route exact path="/supervision" render={(props)=>(<SupervisionPage setLoading={setLoading} {...props} />)}  />
          <Route exact path="/adminmode" render={(props)=>(<AdminPage setLoading={setLoading} {...props} />)} />
          <Route exact path="/checkusers" render={(props)=>(<UsersPage setLoading={setLoading} {...props} />)}  />
          <Route exact path="/conference/:year" render={(props)=>(<ConferencePage setLoading={setLoading} {...props} />)} />
          <Route exact path="/myaccount/changepassword"  component={ChangePasswordPage} />
          <Route exact path="/forget" component={ForgetPage} />   
          <Route exact path="/passwordchange/:hash" component={ForgetPage} />    
          <Route exact path="/registeration/success" render={(props)=>(<MessagePage type={1} {...props} />) } />
        </Switch>
        <Footer/>
    </PublicState>    
  );
}

export default App;
