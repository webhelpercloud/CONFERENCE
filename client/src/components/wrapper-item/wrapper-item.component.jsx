import React from 'react'


import './wrapper-item.styles.scss'

const WrapItem =({item})=>{
  return(
  <div className="wrapItem">
    <div className="borderr">
      <img src={`/uploads/${item.img}`} alt={item.name} />
    </div>
    <div className="h5">{item.name}</div>
  </div>
)}

export default WrapItem