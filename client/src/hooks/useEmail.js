import { useState , useEffect } from 'react';


// Hook
export function useEmail() {
  const [ emailData , setEmailData ] = useState()
  useEffect( () =>{
    const axios = require('axios');
    const fetchData = async ()=>{
      const respA = await axios.get('/information/conferenceYear')
      const respB = await axios.get('/information/email_conf')
      const respC = await axios.get('/information/email_name')
      const respD = await axios.get('/information/letter_name_1')
      const respE = await axios.get('/information/letter_img_1')
      const respF = await axios.get('/information/letter_name_2')
      const respG = await axios.get('/information/letter_img_2')
      const respH = await axios.get('/information/letter_img_3')      
      setEmailData({
        year:respA.data[0].description,
        conf:respB.data[0].description,
        emailName:respC.data[0].description,
        LetterNameA:respD.data[0].description,
        LetterImageA:respE.data[0].description,
        LetterNameB:respF.data[0].description,
        LetterImageB:respG.data[0].description,
        stamp:respH.data[0].description,
      })
      
    }
    fetchData()
  }, [setEmailData])

  return [emailData];
}