var express = require('express');
var app = express();
var database = require('../config/database');

app.post('/icnhbasadminpanel/fees/add',(req ,res)=>{
  let sql = `INSERT INTO _fees(description,first_value,second_value,the_table)
  VALUES ('${req.body.description}','${req.body.first_value}','${req.body.second_value}','${req.body.the_table}')`;
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

app.get('/fees/all',(req,res) =>{
  let sql = `SELECT * FROM _fees`;
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

app.delete('/icnhbasadminpanel/fees/remove',(req ,res)=>{
  let sql = `DELETE FROM _fees WHERE id='${req.body.id}'`
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