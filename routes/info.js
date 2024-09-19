var express = require('express');
var app = express();
var database = require('../config/database');


app.get('/information',(req,res) =>{
  let sql = `SELECT * FROM _descriptions`;
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

app.get('/information/:id',(req,res) =>{
  let sql = `SELECT * FROM _descriptions WHERE desc_type='${req.params.id}' `;
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


app.post('/icnhbasadminpanel/infoupdate',(req ,res)=>{
  let sql = `UPDATE _descriptions SET description = '${req.body.desc}' WHERE desc_type ='${req.body.descid}'`
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

  app.get('/contact/:id',(req,res) =>{
    let sql = `SELECT * FROM _contact WHERE type='${req.params.id}' `;
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
  

  app.post('/icnhbasadminpanel/contactupdate',(req ,res)=>{
    let sql = `UPDATE _contact SET description = '${req.body.desc}' WHERE type ='${req.body.descid}'`
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
  

app.get('/contactinfo',(req,res) =>{
  let sql = `SELECT * FROM _contact`;
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



app.get('/infos/:id',(req,res) =>{
  let sql = `SELECT * FROM _descriptions WHERE desc_type like '%${req.params.id}%'`;
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


module.exports=app 