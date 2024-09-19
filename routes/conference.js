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



var upload = multer({ storage: storage  })


var upload = multer({ storage: storage }).single('imgfile')


app.post('/icnhbasadminpanel/conference/add',(req ,res)=>{
  let sql = `INSERT INTO _conferences(year) VALUES ('${req.body.name}')`;
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

app.get('/conferences/all',(req,res) =>{
  let sql = `SELECT * FROM _conferences`;
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

app.get('/getconference/:id',(req,res) =>{
  let sql = `SELECT * FROM _conferences WHERE id='${req.params.id}'`;
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

app.get('/getconferenceid/:year',(req,res) =>{
  let sql = `SELECT * FROM _conferences WHERE year='${req.params.year}'`;
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


app.delete('/icnhbasadminpanel/conference/remove',(req ,res)=>{
  let sql = `DELETE FROM _conferences WHERE id='${req.body.id}'`
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

  app.post('/icnhbasadminpanel/conference/session/add',(req ,res)=>{
    let sql = `INSERT INTO _sessions(name,conference_id) VALUES ('${req.body.name}',${req.body.confid})`;
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
  
  app.post('/icnhbasadminpanel/conference/movedata',(req ,res)=>{
    let sql = `UPDATE _sessions SET conference_id='${req.body.confid}' WHERE conference_id='0'`;
    let sql2 = `UPDATE _homecouncil SET conference_id='${req.body.confid}' WHERE conference_id='0'`;
	  let sql3 = `UPDATE _homesponsers SET conference_id='${req.body.confid}' WHERE conference_id='0'`;
    database.query(sql,(err , result)=>{
      if(err){
        res.status(400).json({
          message:err
        });
        return;
      }
      database.query(sql2,(err , result)=>{
        if(err){
          res.status(400).json({
            message:err
          });
          return;
        }
        database.query(sql3,(err , result)=>{
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
  })
  
  app.post('/icnhbasadminpanel/conference/updateabout',(req ,res)=>{
    let sql = `UPDATE _conferences SET description='${req.body.description}' WHERE id='${req.body.confid}'`;
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
 

module.exports=app 