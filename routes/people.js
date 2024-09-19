var express = require('express');
var app = express();
var multer = require('multer')
var database = require('../config/database');



var storage  = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
},
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' +file.originalname.split(".")[1] )
  }
  })



var upload = multer({ storage: storage  })


var upload = multer({ storage: storage }).single('imgfile')


app.post('/icnhbasadminpanel/council/add',(req ,res)=>{
  upload(req, res, function (err) {    
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    let sql = `INSERT INTO _homecouncil (event_title, name, title, email, img , conference_id) 
    VALUES ('${req.body.eventTitle}' , '${req.body.name}' , '${req.body.title}' , '${req.body.email}' , '${req.file.filename}','${req.body.conference_id}')`;
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

    app.get('/councilall',(req,res) =>{
      let sql = `SELECT * FROM _homecouncil WHERE conference_id='0'`;
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
    app.get('/getcouncil/:id',(req,res) =>{
      let sql = `SELECT * FROM _homecouncil WHERE conference_id='${req.params.id}'`;
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
       
    app.delete('/icnhbasadminpanel/council/remove',(req ,res)=>{
      let sql = `DELETE FROM _homecouncil WHERE id='${req.body.id}'`
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