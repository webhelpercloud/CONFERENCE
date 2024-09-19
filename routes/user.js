var express = require('express');
var app = express();
var database = require('../config/database');
var multer = require('multer')
var pdf = require('html-pdf');
var nodemailer = require('nodemailer');
var path = require('path'); 


var transport = {
  host: 'icnhbas.com',
  port: 465,
  auth: {
  user: 'support@icnhbas.com',
  pass: 'icnhbas@123'
}
}
var transporter = nodemailer.createTransport(transport)

var storage  = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
},
  filename: function (req, file, cb) {
    cb(null, 'user' + Date.now() + path.extname(file.originalname) )
  }
  })

  const pdfTemplate =require('./acceptletter')
  const firstEmail =require('./firstverfiyemail')
  const secondEmail =require('./secondverfiyemail')

var upload = multer({ storage: storage , limits: { fileSize: 20971520 } }).single('imgfile')

app.post('/user/receipupload',(req ,res)=>{
  upload(req, res, function (err) {    
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    let sql = `UPDATE _users SET receipt = '${req.file.filename}' WHERE id_no='${req.body.id_no}'`
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
 




app.get('/user/:id',(req,res) =>{
  let sql = `SELECT * FROM _users where id_no =${req.params.id}`;

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

app.get('/icnhbasadminpanel/users/nonverified',(req,res) =>{
  let sql = `SELECT * FROM _users WHERE type=1 AND verified=0`;
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

app.get('/icnhbasadminpanel/users/verified',(req,res) =>{
  let sql = `SELECT * FROM _users WHERE type=1 AND verified=2`;
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

app.get('/icnhbasadminpanel/users/online',(req,res) =>{
  let sql = `SELECT * FROM _users WHERE participation_type='Online attender'`;
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


app.get('/icnhbasadminpanel/users/halfverified',(req,res) =>{
  let sql = `SELECT * FROM _users WHERE type=1 AND verified=1 AND receipt !=''`;
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

app.get('/icnhbasadminpanel/users/halfverified/noreceipt',(req,res) =>{
  let sql = `SELECT * FROM _users WHERE type=1 AND verified=1`;
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



app.get('/icnhbasadminpanel/users/all',(req,res) =>{
  let sql = `SELECT * FROM _users WHERE id_no > 1`;
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


app.post('/icnhbasadminpanel/user/edit',(req ,res)=>{
  const arrive = new Date(req.body.arrival).toJSON().slice(0, 19).replace('T', ' ')
  const depart = new Date(req.body.departure).toJSON().slice(0, 19).replace('T', ' ')
  let sql = `UPDATE _users SET abstract = '${req.body.abstract}' , accomodation = '${req.body.accomodation}' , accompanying_person = '${req.body.accompanying_person}' , address = '${req.body.address}' , arrival = '${arrive}' , co_authors = '${req.body.co_authors}' , departure = '${depart}' , desired_session = '${req.body.desired_session}' , email = '${req.body.email}' , fname = '${req.body.fname}' , id = '${req.body.id}' , id_no = '${req.body.id_no}' , participation_type = '${req.body.participation_type}' , phone = '${req.body.phone}' , related_topic = '${req.body.related_topic}' , title = '${req.body.title}' , title_of_talks = '${req.body.title_of_talks}' , type = '${req.body.type}' , university = '${req.body.university}' , username = '${req.body.username}' WHERE id_no ='${req.body.id_no}'`
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


app.post('/icnhbasadminpanel/user/verify',(req ,res)=>{
  let sql = `SELECT * FROM _users WHERE id_no='${req.body.id}'`
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }else{
      const user =result[0]      
      const email = user.email
      const content = firstEmail(user,req.body.emailData)
      var mail = {
        from: 'support@icnhbas.com',
        to: email, 
        subject: 'Your abstract has been approved',
        html: content
      }
      let sql = `UPDATE _users SET verified = 1 WHERE id_no ='${req.body.id}'`
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
          });          
          transporter.sendMail(mail, (err, data) => {
            if (err) {
              res.json({
                status: 'fail'
              })
              console.log(err)
            }
          })      
        }
        })      
    }    
  })  
  })

  app.post('/icnhbasadminpanel/user/verifyreceipt',(req ,res)=>{
    let filename= Date.now()
    let sql = `SELECT * FROM _users WHERE id_no='${req.body.id}'`
    database.query(sql,(err , result)=>{
      if(err){
        res.status(400).json({
          message:err
        });
        return;
      }else{
        const user =result[0]      
        const email = user.email
        const content = secondEmail(user,req.body.emailData)
        var mail = {
          from: 'support@icnhbas.com',
          to: email, 
          subject: 'Your payment recipient has been verified',
          html: content
        }
        let sql = `UPDATE _users SET verified = 2 ,	acceptance_letter ='${filename}.pdf' WHERE id_no ='${req.body.id}'`
        database.query(sql,(err , result)=>{
          if(err){
            res.status(400).json({
              message:err
            });
            return;
          }else{
            const info = user.abstract === 'Not Send' ? user.participation_type : user.title_of_talks
            let sql = `INSERT INTO _sessionparticipants(name , title , email ,session_id , type)
            VALUES ('${user.title} ${user.fname}' , '${user.university}' , "${info}" ,'${user.sessionId}' , '${user.participation_type}' )`;  
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
              });  
              pdf.create(pdfTemplate(user,req.body.emailData), {format: 'Letter'}).toFile('./uploads/letters/' + filename + '.pdf',(err)=>{
                if(err){
                  return Promise.reject();
                }
              })                      
              transporter.sendMail(mail, (err, data) => {
                if (err) {
                  res.json({
                    status: 'fail'
                  })
                  console.log(err)
                }
              })      
            }
            });
          }
          })      
      }    
    })  
    })

    app.delete('/icnhbasadminpanel/user/delete/',(req ,res)=>{
      let sql = `DELETE FROM _users WHERE id_no='${req.body.id}'`
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
     
      app.get('/icnhbasadminpanel/users/updateAllletters',(req ,res)=>{
        const emailData ={
          year:2021,
          conf:'5th',
          emailName:'Alaa Osman',
          LetterNameA:'Prof. Dr. Alaa Osman',
          LetterImageA:'https://imgur.com/W3uixre.png',
          LetterNameB:'Dr. Montasar',
          LetterImageB:'https://imgur.com/GTW5Fng.png',
          stamp:'https://imgur.com/XwLppPI.png',
        }
        let sql = `SELECT * FROM _users WHERE verified='2'`
        database.query(sql,(err , result)=>{
          if(err){
            res.status(400).json({
              message:err
            });
            return;
          }else{
            result.map(user=>{
              let filename= `${user.id_no}_${Date.now()}`     
              let sql = `UPDATE _users SET verified = 2 ,	acceptance_letter ='${filename}.pdf' WHERE id_no ='${user.id_no}'`
              database.query(sql,(err , result)=>{
                if(err){
                  res.status(400).json({
                    message:err
                  });
                  return;
                }else{
                  const info = user.abstract === 'Not Send' ? user.participation_type : user.title_of_talks
                  pdf.create(pdfTemplate(user,emailData), {format: 'Letter'}).toFile('./uploads/letters/' + filename + '.pdf',(err)=>{
                    if(err){
                      return Promise.reject();
                    }
                  })                          
                }
                })
            })
          }     
          res.status(200).json({
            status:200,
            success:true
          });       
        })   
        })  



app.get('/icnhbasadminpanel/users/updateLetter/:id',(req,res) =>{
    const emailData ={
      year:2021,
      conf:'5th',
      emailName:'Alaa Osman',
      LetterNameA:'Prof. Dr. Alaa Osman',
      LetterImageA:'https://imgur.com/W3uixre.png',
      LetterNameB:'Dr. Montasar',
      LetterImageB:'https://imgur.com/GTW5Fng.png',
      stamp:'https://imgur.com/XwLppPI.png',
    }    
    let filename= Date.now()
    let sql = `SELECT * FROM _users WHERE id_no='${req.params.id}'`
    database.query(sql,(err , result)=>{
      if(err){
        res.status(400).json({
          message:err
        });
        return;
      }else{
        const user =result[0]      
        let sql = `UPDATE _users SET verified = 2 ,	acceptance_letter ='${filename}.pdf' WHERE id_no ='${req.params.id}'`
        database.query(sql,(err , result)=>{
          if(err){
            res.status(400).json({
              message:err
            });
            return;
          }else{
            const info = user.abstract === 'Not Send' ? user.participation_type : user.title_of_talks
            res.status(200).json({
            status:200,
            success:true
            });  
            pdf.create(pdfTemplate(user,emailData), {format: 'Letter'}).toFile('./uploads/letters/' + filename + '.pdf',(err)=>{
              if(err){
                return Promise.reject();
              }
            })                          
          }
            });
          }
          })      
  })
    
 
  

  app.post('/icnhbasadminpanel/users/moveall',(req ,res)=>{
    if(req.body.secretCode === '@z4@9123'){
      let sql = `INSERT INTO _userss (SELECT * FROM _users WHERE id_no > 3) `
      database.query(sql,(err , result)=>{
        if(err){
          res.status(400).json({
            message:err
          });
          return;
        }else{
          let sql = `DELETE FROM _users WHERE id_no > 3`
          database.query(sql , (err, result)=>{
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
        }
        })
    }else{
      res.status(404).json({
        message:"Wrong Passcode man"
      });
    }
    })
  

module.exports=app 