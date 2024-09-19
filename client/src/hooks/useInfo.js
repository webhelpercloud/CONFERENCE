import { useState , useEffect } from 'react';


// Hook
export function useInfo(searchId) {
  const [ info , setInfo ] = useState(0)
  useEffect( () =>{
    const axios = require('axios');
    axios.get(`/information/${searchId}`).then(resp => {
      setInfo(resp.data[0])
    } );

  }, [searchId])

  return [info];
}