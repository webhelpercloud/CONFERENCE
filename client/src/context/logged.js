import React , { createContext , useCallback } from 'react'

import { useLocalStorage } from "../hooks/useLocalStroage"

export const Logged = createContext()

export default function Log ({ children }){
  const [logged, setLogged] = useLocalStorage("logged", 0)
  const  updateLogged = useCallback(
    (value)=> {
    setLogged(value)   
  },[setLogged])
  function logOut(value) {
    setLogged(0)
  }  
  return(
    <Logged.Provider value = {{logged, updateLogged , logOut}}>
      {children}  
    </Logged.Provider>
  )
}