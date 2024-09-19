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


app.post('/icnhbasadminpanel/sessionadd',(req ,res)=>{
  let sql = `INSERT INTO _sessions(name,conference_id) VALUES ('${req.body.name}','0')`;
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

app.get('/sessionsall',(req,res) =>{
  let sql = `SELECT * FROM _sessions WHERE conference_id='0'`;
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

app.get('/getsession/:id',(req,res) =>{
  let sql = `SELECT * FROM _sessions WHERE conference_id='${req.params.id}'`;
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


app.delete('/icnhbasadminpanel/sessionremove',(req ,res)=>{
  let sql = `DELETE FROM _sessions WHERE id='${req.body.id}'`
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


//////////////topics

app.get('/session/topics/:id',(req,res) =>{
  let sql = `SELECT * FROM _sessionstopics WHERE session_id = '${req.params.id}' `;
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

app.post('/icnhbasadminpanel/session/topic/add',(req ,res)=>{
  let sql = `INSERT INTO _sessionstopics(topic_name , session_id) VALUES (
    '${req.body.name}',
    '${req.body.sessionId}'
  )`;
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

app.delete('/icnhbasadminpanel/session/topic/remove',(req ,res)=>{
  let sql = `DELETE FROM _sessionstopics WHERE id='${req.body.id}'`
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
  app.get('/session/orgnaizers/:id',(req,res) =>{
    let sql = `SELECT * FROM _sessionorg WHERE session_id = '${req.params.id}' `;
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

  app.post('/icnhbasadminpanel/session/orgnaizer/add',(req ,res)=>{
    upload(req, res, function (err) {    
      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          return res.status(500).json(err)
      }
      let sql = `INSERT INTO _sessionorg(name , title , email , img , session_id) 
      VALUES ('${req.body.name}' , '${req.body.title}' , '${req.body.email}' , '${req.file.filename}' ,'${req.body.sessionId}')`;
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
   

  app.delete('/icnhbasadminpanel/session/orgnaizer/remove',(req ,res)=>{
    let sql = `DELETE FROM _sessionorg WHERE id='${req.body.id}'`
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
////////////scientifics
    app.get('/session/scientifics/:id',(req,res) =>{
      let sql = `SELECT * FROM _sessionsci WHERE session_id = '${req.params.id}' `;
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
  
    app.post('/icnhbasadminpanel/session/scientific/add',(req ,res)=>{
      upload(req, res, function (err) {    
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        let sql = `INSERT INTO _sessionsci(name , title , email , img , session_id) 
        VALUES ('${req.body.name}' , '${req.body.title}' , '${req.body.email}' , '${req.file.filename}' ,'${req.body.sessionId}')`;
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
     
  
    app.delete('/icnhbasadminpanel/session/scientific/remove',(req ,res)=>{
      let sql = `DELETE FROM _sessionsci WHERE id='${req.body.id}'`
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
/////////////////////speakers

      app.get('/session/speakers/:id',(req,res) =>{
        let sql = `SELECT * FROM _sessionspeakers WHERE session_id = '${req.params.id}' `;
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
    
      app.post('/icnhbasadminpanel/session/speaker/add',(req ,res)=>{
        upload(req, res, function (err) {    
          if (err instanceof multer.MulterError) {
              return res.status(500).json(err)
          } else if (err) {
              return res.status(500).json(err)
          }
          let sql = `INSERT INTO _sessionspeakers(name , title , email , img , session_id) 
          VALUES ('${req.body.name}' , '${req.body.title}' , '${req.body.email}' , '${req.file.filename}' ,'${req.body.sessionId}')`;
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
       
    
      app.delete('/icnhbasadminpanel/session/speaker/remove',(req ,res)=>{
        let sql = `DELETE FROM _sessionspeakers WHERE id='${req.body.id}'`
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
/////////////////////////participants

        app.get('/session/participants/:id',(req,res) =>{
          let sql = `SELECT * FROM _sessionparticipants WHERE session_id = '${req.params.id}' ORDER BY CASE WHEN name like 'Prof%' THEN '1' WHEN name like '%Assoc%' THEN '2' WHEN name like '%Dr%' THEN '3' ELSE '4' END ASC , id ASC `;
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
        
        app.post('/icnhbasadminpanel/session/participant/add',(req ,res)=>{
          let sql = `INSERT INTO _sessionparticipants(name , title , email , type , session_id)
          VALUES ('${req.body.name}' , '${req.body.title}' , '${req.body.email}' , '${req.body.type}' ,'${req.body.sessionId}')`;
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
        
        app.delete('/icnhbasadminpanel/session/participant/remove',(req ,res)=>{
          let sql = `DELETE FROM _sessionparticipants WHERE id='${req.body.id}'`
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