import React , { useState , useEffect } from 'react'

import { Form , FormControl , Table , Button } from 'react-bootstrap'

import './editmode.styles.scss'


const EditMode = ({ type , get , sessionId , add , img , deletelink , confid }) =>{
  const [data , setData] = useState([{}])
  const [name , setName] = useState('');
  const [job , setJob] = useState('');
  const [email , setEmail] = useState(''); 
  const [eType , setEType] = useState('');   
  const [eTitle , setETitle] = useState('');   
  const [image , setImage] = useState('');
  const [imagePreview , setImagePreview] = useState('');
  const [selected , setSelected] = useState(0)  
  const axios = require('axios'); 
  useEffect(()=>{
    if(type===10){
      axios.get(`${get}${confid}`)
      .then(resp => {
          resp.data.length > 0 ? setData(resp.data) : setData([{}])
        })
    }else if(type===12) {
      axios.get(`${get}`)
      .then(resp => {
          resp.data.length > 0 ? setData(resp.data) : setData([{}])
        })
    }else if(type===13) {
      axios.get(`${get}${confid}`)
      .then(resp => {
          resp.data.length > 0 ? setData(resp.data) : setData([{}])
        })
    }else if(type===5) {
      axios.get(`${get}`)
      .then(resp => {
          resp.data.length > 0 ? setData(resp.data) : setData([{}])
        })
    }else{
    axios.get(`${get}${sessionId}`)
    .then(resp => {
        resp.data.length > 0 ? setData(resp.data) : setData([{}])
      })}   
  },[axios,get,sessionId,type,confid])

  const handleDelete = (idno) =>{
    axios.delete(deletelink, {data:{
      id:idno
    }})
    .then(function (response) {
      alert(`${idno} has been deleted`)         
    })
    .catch(function (error) {
      console.log(error);     
      alert(`Deletion failed`)       
    });
  }
  const handleAdd = () =>{
    const Data = new FormData()
    Data.append('name' , name)      
    Data.append('sessionId' , sessionId)
    Data.append('eventTitle' , eTitle)
    Data.append('title' , job)
    Data.append('email' , email)
    Data.append('type' , eType)
    Data.append('imgfile', image)
    Data.append('conference_id',confid)
    if(img){
    axios.post(add, Data )
    .then(function (response) {
      alert(`${name} has been added`)
    })
    .catch(function (error) {
      console.log(error);
      alert('failed')
    });
  }else{
    axios.post(add,{
      sessionId:sessionId,
      name:name,
      title:job,
      type:eType,      
      email:email,
      conference_id:confid
    })
    .then(function (response) {
      alert(`${name} has been added`)
    })
    .catch(function (error) {
      console.log(error);
    });    
  }
}

  return(
    <Table className='topic-edit' bordered hover>
      <thead>
        <tr>
          {
            Object.keys(data[0]).map((key,index)=>
              <td key={index}>{key}</td>
              )
          }
          <th className={Object.keys(data[0]).length < 2 ? 'hidden' : ''}>Button</th>          
        </tr>
      </thead>
      <tbody>
      {
        data.map((entery,index)=>
          <tr className={selected === entery.id ? 'selected' : ''} key={index} onClick={()=>setSelected(entery.id)}>
            {
              Object.values(entery).map((item,index)=>
                parseInt(item) > 10000000
                ? <td key={index} className="text-center"><img alt="img-prev" height="50" width="50" src={`/uploads/${item}`} /></td>
                : <td key={index} >{item}</td>
                )
            }
            <td className={Object.keys(entery).length < 2 ? 'hidden' : ''}><Button variant='danger' onClick={()=>handleDelete(entery.id)}> DELETE</Button></td>                                                                                              
          </tr>)
      }      
          <tr>
            <td><FormControl readOnly placeholder="ID"/></td>    
            <td className={type===10 ? '' : 'hidden'}><FormControl placeholder={'Event Title'} value={eTitle} onChange={(e)=>setETitle(e.target.value)} /></td>
            <td><FormControl value={name} placeholder={'Name'} onChange={(e)=>setName(e.target.value)} /></td>
            <td className={type===1 || type===12 || type === 13 ? 'hidden' : ''}><FormControl placeholder={'Job Title'} value={job} onChange={(e)=>setJob(e.target.value)} /></td>
            <td className={type===1 || type===12 || type === 13 ? 'hidden' : ''}><FormControl placeholder={type===3 ? 'University / Abstract' : 'Email'} value={email} onChange={(e)=>setEmail(e.target.value)} /></td>
            <td className={type===3 ? '' : 'hidden'}><FormControl placeholder={'Type'} value={eType} onChange={(e)=>setEType(e.target.value)} /></td>            
            <td className={type===1 || type===3 ? 'hidden' : ''}><Form.File id="preview-file" onChange={(event)=>{setImage(event.target.files[0]);setImagePreview(URL.createObjectURL(event.target.files[0]))}} accept="image/*"/></td>
            <td className={type===1 || type===3 ? 'hidden' : ''}><img className="preview" src={imagePreview} alt="preview" height="50" width="50" /></td>
            <td><Button variant='success' onClick={handleAdd} >ADD</Button></td>              
          </tr>
      </tbody>
    </Table>    
  )
}




export default EditMode