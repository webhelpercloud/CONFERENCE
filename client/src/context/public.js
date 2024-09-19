import React from 'react'

import Log from './logged'
import Reg from './register'
const PublicState = ({ children }) =>{
  return(
    <Log>
      <Reg>
        {children}            
      </Reg>
    </Log>
  )
}


export default PublicState