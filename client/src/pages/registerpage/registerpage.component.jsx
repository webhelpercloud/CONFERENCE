import React , { useState , useEffect ,useRef , useContext } from 'react'


import { Container , Row , Col , InputGroup , FormControl , Form ,  Button , Alert , ProgressBar } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom"

import "react-datepicker/dist/react-datepicker.css";


import HeaderFront from '../../components/headerfront/headerfront.component'

import { RegisterState } from '../../context/register'

import './registerpage.styles.scss'

import { useEmail } from '../../hooks/useEmail'

const RegisterPage = ({setLoading})=>{
  let history = useHistory();  
  const { regState } = useContext(RegisterState)   
  const [ emailData ] = useEmail()
  const axios = require('axios');  
  const [ formState, setformState ] = useState('0')    
  const [ title, setTitle ] = useState('Mr')
  const [ name, setName ] = useState('')
  const [ id, setId ] = useState('')
  const [ idFile , setIdFile ] = useState({name:'ID File'}) 
  const [ uploadProgress, setUploadProgress ] = useState(0)
  const [ phone, setPhone ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ vaildEmail, setVaildEmail ] = useState(false)  
  const [ work, setWork ] = useState('')
  const [ address, setAddress ] = useState('')
  const [ participation, setParticipation ] = useState([false,false,true,false])
  const  participationarray=['Oral','Poster','Simply attender','Online attender']
  const [ regType, setRegType ] = useState(participation[2])    
  const [ realPart, setRealPart ] = useState('Simply attender')  
  const [ desiredSession , setdesiredSession ] = useState('')
  const [ desiredSessionId , setDesiredSessionId ] = useState('')  
  const [ relatedTopic , setrelatedTopic ] = useState('')
  const [ titleofTalks , settitleofTalks ] = useState('')
  const [ coAuthorA , setcoAuthorA ] = useState('')
  const [ coAuthorB , setcoAuthorB ] = useState('')
  const [ coAuthorC , setcoAuthorC ] = useState('')
  const [ coAuthorD , setcoAuthorD ] = useState('')
  const [ coAuthorE , setcoAuthorE ] = useState('')
  const [ coAuthorF , setcoAuthorF ] = useState('')
  const [ abstract , setAbstract ] = useState('')
  const [ abstractFile , setAbstractFile ] = useState({name:'Abstract File'}) 
  const [ absErr , setAbsErr ] = useState(false)  
  const [ username , setUsername ] = useState('')
  const [ password , setPassword ] = useState('')
  const [ dateofArrival , setDateofArrival ] = useState(new Date())
  const [ dateofdeparture , setDateofdeparture ] = useState(new Date())
  const [ accomodation , setAccomodation ] = useState([false,true])
  const [ realAcco , setRealAcco ] = useState('With accommodation')
  const [ accompanyingA , setaccompanyingA ] = useState('')
  const [ accompanyingB , setaccompanyingB ] = useState('')
  const [ accompanyingC , setaccompanyingC ] = useState('')
  const [ accompanyingD , setaccompanyingD ] = useState('')
  const [ accompanyingE , setaccompanyingE ] = useState('')
  const [ accompanyingF , setaccompanyingF ] = useState('')
  const [ accoFile , setAccoFile ] = useState({name:'Accompanying Persons File'})   
  const [validated, setValidated] = useState(false);
  const [ sessions , setSessions ] = useState([])
  const [ topics , setTopics ] = useState([])
  const [arrowState , setArrowState] = useState(1)  
  const [docType , setDocType] = useState('normal')  
  const pointDown=useRef(null)  
  const scrollToBottom = () => {
    pointDown.current.scrollIntoView({ behavior: "smooth" });
    setArrowState(3)
  }  
  useEffect(()=>{
    setLoading(true)
    document.title = 'Registration';
    const fetchData = async ()=>{
      try {
          const resp = await axios.get('/sessionsall')
          if(resp.data.length > 0){
            setSessions(resp.data)
            setdesiredSession(resp.data[0].name)
            setDesiredSessionId(resp.data[0].id)
            const respB = await axios.get(`/session/topics/${resp.data[0].id}`)
            respB.data.length > 0 ? setTopics(respB.data) : setTopics([]) 
            setrelatedTopic(respB.data[0].topic_name)    
          }else{
            setSessions([{}])
          }  
          setLoading(false)   
          scrollToBottom()     
        }catch(err){
        console.log(err)
      }
    }
    fetchData()          
    },[axios,setLoading]) 
  const handleChange = (event) => {
    setdesiredSession(event.target.value)
    var value = sessions.filter(function(item) {
      return item.name === event.target.value
    })    
    getTopic(value[0].id)
    setDesiredSessionId(value[0].id)
  }

  const getTopic = (id)=>{
    const axios = require('axios'); 
      axios.get(`/session/topics/${id}`)
      .then(resp => {
          resp.data.length > 0 ? setTopics(resp.data) : setTopics([])     
        });     
  }

  const participationSelect= (id)=>{
    let array=[false,false,false,false]
    setRealPart(participationarray[id])
    array[id]=true
    setParticipation(array)
    setRegType(id === 2 ? true : false)
  }
  const accomodationSelect= (id)=>{
    let array=[false,false]
    let realarray=['With accommodation','Without accommodation']
    setRealAcco(realarray[id])    
    array[id]=true
    setAccomodation(array)
  }

 
  const checkEmail =  (text)=>{
    if(text){
    axios.get(`/checkmail/${text}`)
    .then((resp)=>{
      setVaildEmail(resp.data.length > 1)
    })
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();      
    if(!vaildEmail){
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setformState("2")
    }
    else{
      event.preventDefault();      
      const Data = new FormData()
      Data.append('title' , title)
      Data.append('fName' , name)
      Data.append('id' , id)
      Data.append('phone' , phone)
      Data.append('email' , email)
      Data.append('univ' , work)
      Data.append('address' , address)
      Data.append('pType' , realPart)
      Data.append('dSession' , desiredSession)
      Data.append('dSessionId' , desiredSessionId)      
      Data.append('rTopic' , relatedTopic)
      Data.append('tOfT' , titleofTalks)
      Data.append('coAuthors' , `${coAuthorA}--${coAuthorB}--${coAuthorC}--${coAuthorD}--${coAuthorE}--${coAuthorF}`)
      Data.append('abstract' , abstract)
      Data.append('username' , username)  
      Data.append('password' , password) 
      Data.append('arrival' , dateofArrival.toISOString().slice(0, 19).replace('T', ' ')) 
      Data.append('depart' , dateofdeparture.toISOString().slice(0, 19).replace('T', ' ')) 
      Data.append('accomodation' , realAcco)
      Data.append('aPerson' , [accompanyingA,accompanyingB,accompanyingC,accompanyingD,accompanyingE,accompanyingF])                
      Data.append('docfile',abstractFile)      
      Data.append('imgfile', idFile)
      Data.append('accofile', accoFile) 
      Data.append('emailYear',emailData.year)
      Data.append('emailConf',emailData.conf)
      Data.append('emailName',emailData.emailName)                 
      if(regType){
        axios.post('/registerA', Data , {
          onUploadProgress : ProgressEvent =>{
            setUploadProgress(ProgressEvent.loaded/ProgressEvent.total*100)
          }
        } )
        .then(function (response) {
          setformState("1")
          history.push("registeration/success")
        })
        .catch(function (error) {
          console.log(error);
          setformState("2")
        });
      }else if (participation[3] && abstract.length < 1){
        axios.post('/registerA', Data , {
          onUploadProgress : ProgressEvent =>{
            setUploadProgress(ProgressEvent.loaded/ProgressEvent.total*100)
          }
        } )
        .then(function (response) {
          setformState("1")
          history.push("registeration/success")
        })
        .catch(function (error) {
          console.log(error);
          setformState("2")
        });        
      }else if (!absErr){
        axios.post('/registerB', Data , {
          onUploadProgress : ProgressEvent =>{
            setUploadProgress(ProgressEvent.loaded/ProgressEvent.total*100)
          }
        } )
        .then(function (response) {
          setformState("1")
          history.push("registeration/success")
        })
        .catch(function (error) {
          console.log(error);
          setformState("2")
        });
      }
    }
    setValidated(true);
  }else{alert("Please enter a vaild email")}
  };
  
  return(
    <section className="register-page" >
      <HeaderFront timer/>
      <Container className="page-con">
        <div onClick={scrollToBottom} className={arrowState === 0 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(1)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
        <div onClick={scrollToBottom} className={arrowState === 1 ? "arrow-scroll-down" : 'hidden'}><img onAnimationEnd={()=>setArrowState(0)} src={"/assets/icons/arrow-down.svg"} alt="arrow" /></div>
        <div ref={pointDown} className="page-title">Registeration</div>
          <Row>
          <Col lg={2}/>
          <Col>
            <Alert className={regState==='1' ? 'hidden' : 'text-center'} variant='warning'>Please note that register is currently closed</Alert>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Professional Title</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control readOnly={regState==='1' ? false : true} as="select" value={title} onChange={(event)=>setTitle(event.target.value)}  >
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                  <option>Assoc. Prof</option>
                  <option>Prof</option>
                </Form.Control>
              </InputGroup>          
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Full Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  readOnly={regState==='1' ? false : true}
                  aria-label="Fullname"
                  value={name} 
                  required
                  onChange={(event)=>setName(event.target.value)}
                />
              </InputGroup>        
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">ID or Passport No.</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  readOnly={regState==='1' ? false : true}                
                  aria-label="idno"
                  value={id} 
                  type="number"
                  required
                  onChange={(event)=>setId(event.target.value)}                  
                />
              </InputGroup> 
              <Form.File 
                id="id-file"
                label={idFile.name}
                custom
                required
                onChange={(event)=>setIdFile(event.target.files[0])}
                accept="image/*"
              />       
              <InputGroup className="mt-3 mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Telephone</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="telephone"
                  value={phone} 
                  readOnly={regState==='1' ? false : true}                  
                  onChange={(event)=>setPhone(event.target.value)}                  
                />  
              </InputGroup>        
              <InputGroup className="mb-3" hasValidation>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  readOnly={regState==='1' ? false : true}                
                  aria-label="email"
                  value={email} 
                  type="email"
                  onChange={(event)=>{setEmail(event.target.value);checkEmail(event.target.value)}}     
                  isInvalid={vaildEmail}
                  isValid={email ? !vaildEmail : null}                  
                  required   
                />  
              </InputGroup>  
              {  vaildEmail ?             
                <Alert  variant='danger' >
                   This email is already used please use a vaild email
                 </Alert> : null
               }               
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text className="-input" id="basic-addon1">University/Institute/Company</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="university"
                  value={work} 
                  readOnly={regState==='1' ? false : true}                  
                  onChange={(event)=>setWork(event.target.value)}
                  required
                />  
              </InputGroup>    
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control 
                  aria-label="address"
                  as="textarea" 
                  rows={1} 
                  value={address} 
                  onChange={(event)=>setAddress(event.target.value)}      
                  required  
                  readOnly={regState==='1' ? false : true}                  
                  />
              </InputGroup>       
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Participation Type</InputGroup.Text>
                </InputGroup.Prepend>
                <div className="form-control form-checker">
                  {
                    participationarray.map((option,index)=>
                      <Form.Check key={index} disabled={regState==='1' ? false : true} inline label={option} type={'checkbox'} id={`participation-checkbox-${index}`} checked={participation[index]}  onChange={()=>participationSelect(index)}/>                                
                    )
                  }
                </div>
              </InputGroup>   
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Desired Session</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control     
                  required
                  as="select"
                  readOnly={regState==='1' ? false : true}                  
                  value={desiredSession} 
                  onChange={handleChange} 
                >
                  {
                    sessions.map((session,index)=>(
                      <option key={index}>{session.name}</option>
                    ))
                  }
                </Form.Control>
              </InputGroup>       
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Related Topic</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control 
                as="select"
                required
                readOnly={regState==='1' ? false : true}                
                value={relatedTopic} 
                onChange={(event)=>setrelatedTopic(event.target.value)} 
                >
                  {
                    topics.map((topic,index)=>(
                      <option key={index}>{topic.topic_name}</option>
                    ))
                  }
                </Form.Control>
              </InputGroup>
              {
                regType
                ? null
                :<div>
                  <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Title of talks</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="titleoftalks"
                    value={titleofTalks} 
                    onChange={(event)=>settitleofTalks(event.target.value)}  
                    readOnly={regState==='1' ? false : true}      
                    required={!participation[3]}                                                    
                  />  
                </InputGroup>    
                <InputGroup className="mb-1">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Co-Authors</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    readOnly={regState==='1' ? false : true}                
                    value={coAuthorA} 
                    onChange={(event)=>setcoAuthorA(event.target.value)}                  
                  />
                  <FormControl
                    readOnly={regState==='1' ? false : true}
                    value={coAuthorB} 
                    onChange={(event)=>setcoAuthorB(event.target.value)}                  
                  />                         
                </InputGroup>         
                <InputGroup className="mb-1">
                  <InputGroup.Prepend>
                    <InputGroup.Text></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    value={coAuthorC} 
                    readOnly={regState==='1' ? false : true}
                    onChange={(event)=>setcoAuthorC(event.target.value)}                  
                  />
                  <FormControl
                    value={coAuthorD} 
                    readOnly={regState==='1' ? false : true}
                    onChange={(event)=>setcoAuthorD(event.target.value)}                  
                  />         
                </InputGroup>  
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    value={coAuthorE} 
                    readOnly={regState==='1' ? false : true}
                    onChange={(event)=>setcoAuthorE(event.target.value)}                  
                  />
                  <FormControl
                    readOnly={regState==='1' ? false : true}
                    value={coAuthorF} 
                    onChange={(event)=>setcoAuthorF(event.target.value)}                  
                  />                        
                </InputGroup>    
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Abstract</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                  as="textarea" 
                  rows={2} 
                  readOnly={regState==='1' ? false : true}
                  value={abstract} 
                  required={!participation[3]}
                  onChange={(event)=>{
                    setAbstract(event.target.value)
                    setAbsErr(event.target.value.includes('"'))
                  }}                  
                  />
                </InputGroup>    
                {  absErr ?             
                 <Alert  variant='danger' >
                    Please Don't Use Double Quotation Symbol 
                  </Alert> : null
                }                      
                <Form.File 
                  id="abstract-file"
                  readOnly={regState==='1' ? false : true}
                  label={abstractFile.name}
                  custom         
                  required={!participation[3]}
                  onChange={(event)=>{
                    const name = event.target.value.split('.')
                    setDocType(name[name.length-1])                    
                    setAbstractFile(event.target.files[0])
                  }}   
                  accept=".doc,.docx,.docm"                                 
                />
                <p style={{color:'black',fontStyle:'italic' }}>Write a summary of your research and you can Upload the abstract format Word file only</p>
                <Alert variant="warning">Note that you can only upload file up to 20MB only</Alert>
                {docType !== 'doc' && docType !== 'docm' && docType !== 'docx' && docType !== 'normal' ? <Alert variant="danger">PLEASE UPLOAD WORD DOCUMENTS ONLY</Alert> : null}                
                </div>
              }    
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Username"
                  value={username} 
                  required
                  readOnly={regState==='1' ? false : true}
                  onChange={(event)=>setUsername(event.target.value)}                   
                />           
              </InputGroup> 
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Password"
                  value={password} 
                  type="password"
                  required
                  readOnly={regState==='1' ? false : true}
                  onChange={(event)=>setPassword(event.target.value)}                   
                />           
            </InputGroup>        
            {
              participation[3] ? null
              :<div>
                  <div className="form-inline">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Date of arrival</InputGroup.Text>
                    </InputGroup.Prepend>
                  <DatePicker readOnly={regState==='1' ? false : true} className="form-control"  selected={dateofArrival} onChange={date => setDateofArrival(date)} />          
                  </InputGroup> 
                  <InputGroup className="mb-3 ml-auto">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Date of departure</InputGroup.Text>
                    </InputGroup.Prepend>
                    <DatePicker readOnly={regState==='1' ? false : true} className="form-control"  selected={dateofdeparture} onChange={date => setDateofdeparture(date)} />          
                  </InputGroup>     
                </div>      
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Accomodation</InputGroup.Text>
                  </InputGroup.Prepend>
                  <div className="form-control form-checker">
                    <Form.Check disabled={regState==='0' || participation[3] ? true : false}  inline label="With accommodation" type={'checkbox'} id='accomodation-checkbox-1' checked={accomodation[0]} onChange={()=>accomodationSelect(0)} />            
                    <Form.Check disabled={regState==='1' ? false : true} inline label="Without accommodation" type={'checkbox'} id='accomodation-checkbox-2' checked={accomodation[1]} onChange={()=>accomodationSelect(1)} /> 
                  </div>
                </InputGroup>
                {
                  accomodation[0] ?
                  <div>
                  <InputGroup className="mb-1">
                    <InputGroup.Prepend>
                      <InputGroup.Text style={{minWidth:'190px'}}>Accompanying person</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="AccompanyingPerson"              
                      value={accompanyingA} 
                      onChange={(event)=>setaccompanyingA(event.target.value)} 
                      readOnly={regState==='1' ? false : true}              
                    />
                    <FormControl
                      aria-label="AccompanyingPerson"                 
                      value={accompanyingB} 
                      onChange={(event)=>setaccompanyingB(event.target.value)}    
                      readOnly={regState==='1' ? false : true}           
                    />
                  </InputGroup>         
                  <InputGroup className="mb-1">
                    <InputGroup.Prepend>
                      <InputGroup.Text style={{minWidth:'190px'}} ></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      value={accompanyingC} 
                      onChange={(event)=>setaccompanyingC(event.target.value)}     
                      readOnly={regState==='1' ? false : true}          
                    />
                    <FormControl
                      value={accompanyingD} 
                      onChange={(event)=>setaccompanyingD(event.target.value)}  
                      readOnly={regState==='1' ? false : true}             
                    />
                  </InputGroup>  
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text style={{minWidth:'190px'}}></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      value={accompanyingE} 
                      onChange={(event)=>setaccompanyingE(event.target.value)}
                      readOnly={regState==='1' ? false : true}               
                    />
                    <FormControl
                      value={accompanyingF} 
                      onChange={(event)=>setaccompanyingF(event.target.value)}
                      readOnly={regState==='1' ? false : true}               
                    />
                  </InputGroup>
                  <Form.File 
                    id="accoFile-file"
                    readOnly={regState==='1' ? false : true}
                    label={accoFile.name}
                    custom         
                    required={accompanyingA ? true : false}
                    onChange={(event)=>setAccoFile(event.target.files[0])}                                  
                  />
                  <p style={{color:'black',fontStyle:'italic' }}>Please join all the ids or passports of your accompanying persons in 1 file and select it here</p>                        
                </div> : null
              }             
            </div>
            }                                                                                                 
            <div style={{textAlign:'center'}}>
              {
               regState==='1' ? <Button type="submit" className="pl-4 pr-4 mb-2">Submit</Button> : <div></div>
              }                  
              </div>
              <div style={{textAlign:'center' , margin:'1rem 0'}}>
                <ProgressBar className={uploadProgress ? '' : 'hidden'} style={{margin:'1rem 0'}} now={uploadProgress} />                              
                <Alert className={formState==='0' ? "hidden" :"" } variant={formState==='1' ? 'success' : 'danger'} >
                    {formState==='1' ? 'You have registered successfully , please wait untill the supervisors check your form' 
                    : 'Oh , Something has went wrong , please check that you provided all the fields correctly' }
                </Alert>
              </div>
            </Form>
          </Col>
          <Col lg={2}/>          
        </Row>      
      </Container>
    </section>
  )
}


export default RegisterPage