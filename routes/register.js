var express = require('express');
var app = express();
var multer = require('multer')
var database = require('../config/database');
var nodemailer = require('nodemailer');
var path = require('path'); 


const pdfTemplate =require('./registeremail')

var transport = {
  host: 'icnhbas.com',
  port: 465,
  auth: {
  user: 'support@icnhbas.com',
  pass: 'icnhbas@123'
}
}
var transporter = nodemailer.createTransport(transport)




const { generateSalt, hash  } = require('./crypto');
const registeremail = require('./registeremail');
const registeremail2 = require('./registeremail2');


var storage  = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
},
  filename: function (req, file, cb) {
    cb(null, 'user' + Date.now() + path.extname(file.originalname) )
  }
  })



var upload = multer({ 
  storage: storage ,
  fileFilter: function (req, file, callback) {
    if (file.fieldname === 'docfile') {
    var ext = path.extname(file.originalname);
    if(ext !== '.doc' && ext !== '.docm' && ext !== '.docx') {
        return callback(new Error('Only images are allowed'))
    }
    }
    callback(null, true)
},  
  limits: { fileSize: 20971520 } 
})


var uploadMultiple = upload.fields([{ name: 'imgfile', maxCount: 10 }, { name: 'docfile', maxCount: 1 } , {name:'accofile' , maxCount:1}])

app.post('/registerA',(req ,res)=>{
  uploadMultiple(req, res, function (err) {
    const salt = generateSalt(12)
    const password = req.body.password
    const hashing = (hash(password, salt)) 
    const email = req.body.email
    const content = registeremail2(req.body)
    var mail = {
      from: 'support@icnhbas.com',
      to: email, 
      subject: `Thank you for registering with ICNHBAS${req.body.emailYear}`,
      html: content
    }
  
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    let check = `SELECT id_no FROM _users WHERE username = '${req.body.username}'`
    database.query(check , (err , result)=>{
      if(result.length > 0){
        res.status(400).json({
          message:err
        });
      }else {
        var accofilevar = req.files.accofile ? req.files.accofile[0].filename : 'Not send'
        let sql = `INSERT INTO _users (type, title, fname, id, phone, email, university, address, participation_type, desired_session, sessionId , related_topic, title_of_talks, co_authors, abstract, username, password , salt, arrival, departure, accomodation, accompanying_person,verified , id_file , abstract_file , accompanying_ids ) 
        VALUES ('1' , '${req.body.title}' , '${req.body.fName}' , '${req.body.id}' , '${req.body.phone}' , '${req.body.email}' , '${req.body.univ}' , '${req.body.address}' ,  '${req.body.pType}' ,  '${req.body.dSession}' , '${req.body.dSessionId}' , '${req.body.rTopic}' , 'Not Send' , 'Not Send' , 'Not Send' , '${req.body.username}' ,  '${hashing.hashedpassword}' , '${hashing.salt}' , '${req.body.arrival}' , '${req.body.depart}' , '${req.body.accomodation}' , '${req.body.aPerson}' ,'1' , '${req.files.imgfile[0].filename}' , 'Not send' , '${accofilevar}')`;
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
                console.log(err)
              }
            })                     
          }

        })    
            
      }
    })


})

});


app.post('/registerB',(req ,res)=>{
  uploadMultiple(req, res, function (err) {
    const salt = generateSalt(12)
    const password = req.body.password
    const hashing = (hash(password, salt)) 
    const email = req.body.email
    const content = registeremail(req.body)
    var mail = {
      from: 'support@icnhbas.com',
      to: email, 
      subject: `Thank you for registering with ICNHBAS${req.body.emailYear}`,
      html: content
    }
  
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    let check = `SELECT id_no FROM _users WHERE username = '${req.body.username}'`
    database.query(check , (err , result)=>{
      if(result.length > 0){
        res.status(401).json({
          message:err
        });
      }else {
        var accofilevar = req.files.accofile ? req.files.accofile[0].filename : 'Not send'
        let sql = `INSERT INTO _users (type, title, fname, id, phone, email, university, address, participation_type, desired_session, sessionId, related_topic, title_of_talks, co_authors, abstract, username, password , salt, arrival, departure, accomodation, accompanying_person,verified , id_file , abstract_file , accompanying_ids ) 
        VALUES ('1' , '${req.body.title}' , '${req.body.fName}' , '${req.body.id}' , '${req.body.phone}' , '${req.body.email}' , '${req.body.univ}' , '${req.body.address}' ,  '${req.body.pType}' ,  '${req.body.dSession}' , '${req.body.dSessionId}' , "${req.body.rTopic}" , "${req.body.tOfT}" , '${req.body.coAuthors}' , "${req.body.abstract}" , '${req.body.username}' ,  '${hashing.hashedpassword}' , '${hashing.salt}' , '${req.body.arrival}' , '${req.body.depart}' , '${req.body.accomodation}' , '${req.body.aPerson}' ,'0' , '${req.files.imgfile[0].filename}' , '${req.files.docfile[0].filename}' , '${accofilevar}' )`;
        database.query(sql,(err , result)=>{
          if(err){
            res.status(402).json({
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
                console.log(err);
              }
            })                     
          }

        })    
            
      }
    })
})
});




app.get('/checkmail/:email',(req ,res)=>{
  let sql = `SELECT * FROM _users WHERE email ='${req.params.email}' `
  database.query(sql, (err ,result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }
    if (result.length) res.json(result);    
    else{
      res.status(200).json({
        status:200,
        success:true
      });}    
  })
})



module.exports=app 