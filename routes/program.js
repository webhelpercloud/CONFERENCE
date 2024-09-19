var express = require('express');
var app = express();
var database = require('../config/database');
var multer = require('multer')


var storage  = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
},
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' +file.originalname.split(".")[1] )
  }
  })



var upload = multer({ storage: storage }).single('imgfile')


app.post('/icnhbasadminpanel/programadd',(req ,res)=>{
  let sql = `INSERT INTO _dates(description,date) VALUES ('${req.body.description}','${req.body.date}')`;
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }
    res.status(200).json({
      status:200,
      success:true
    });
  })  
})

app.get('/programall',(req,res) =>{
  let sql = `SELECT * FROM _dates`;
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return
    }
    if (result.length) res.json(result);
    else {
      res.status(200).json({
        status:200,
        success:true        
      });
    }
  })  
})

app.delete('/icnhbasadminpanel/programremove',(req ,res)=>{
  let sql = `DELETE FROM _dates WHERE id='${req.body.id}'`
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }else{
    res.status(200).json({
      status:200,
      success:true 
    })      
    }
    })
  })

///////////orgnaizers
app.get('/program/admins',(req,res) =>{
  let sql = `SELECT * FROM _programadmin`;
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return
    }
    if (result.length) res.json(result);
    else {
      res.status(200).json({
        status:200,
        success:true        
      });
    }
  })  
})

app.post('/icnhbasadminpanel/program/admins/add',(req ,res)=>{
  upload(req, res, function (err) {    
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    let sql = `INSERT INTO _programadmin(name , title , email , img) 
    VALUES ('${req.body.name}' , '${req.body.title}' , '${req.body.email}' , '${req.file.filename}')`;
    database.query(sql,(err , result)=>{
      if(err){
        res.status(400).json({
          message:err
        });
        return;
      }
      res.status(200).json({
        status:200,
        success:true
      });
    })    
        
      })
    })
 

app.delete('/icnhbasadminpanel/program/admins/remove',(req ,res)=>{
  let sql = `DELETE FROM _programadmin WHERE id='${req.body.id}'`
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }else{
    res.status(200).json({
      status:200,
      success:true 
    })      
    }
    })
  })


  module.exports=app 