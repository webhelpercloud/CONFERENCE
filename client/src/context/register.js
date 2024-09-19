import React , { createContext , useState , useEffect } from 'react'


export const RegisterState = createContext()

export default function Reg ({ children }){
  const axios = require('axios');
  const [regState, setRegState] = useState('0')
  useEffect(()=>{
    const fetchData = async ()=>{
      const resp = await axios.get(`/information/regState`)
      setRegState(resp.data[0].description)
    }
    fetchData()
  },[axios])
  const switchRegisterOn = ()=>{ 
    axios.post(`/icnhbasadminpanel/infoupdate`, {
      descid:'regState',
      desc:'1'
    })
    .then(function (response) {
      alert("REGISTERATION HAS BEEN OPENED")
    })
    .catch(function (error) {
      console.log(error);      
    });

  }

  function switchRegisterOff() {
    axios.post(`/icnhbasadminpanel/infoupdate`, {
      descid:'regState',
      desc:'0000'
    })
    .then(function (response) {
      alert("REGISTERATION HAS BEEN CLOSED")  
    })
    .catch(function (error) {
      console.log(error);      
    });  
  }  
  return(
    <RegisterState.Provider value = {{regState, switchRegisterOn , switchRegisterOff}}>
      {children}  
    </RegisterState.Provider>
  )
}