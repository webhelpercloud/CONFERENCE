var express = require('express');
var app = express();
var database = require('../config/database');
var nodemailer = require('nodemailer');

var transport = {
  host: 'icnhbas.com',
  port: 465,
  auth: {
  user: 'support@icnhbas.com',
  pass: 'icnhbas@123'
}
}
var transporter = nodemailer.createTransport(transport)


const { generateSalt, hash  , compare } = require('./crypto');






app.post('/userlogin',(req ,res)=>{

  const newPassword = req.body.pass

  let sql = `SELECT * FROM _users WHERE username='${req.body.userName}'`
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }    
    if(result.length > 0){
      const user =result[0]
      const hash = {salt:user.salt,password:user.password}
      let match = compare(newPassword, hash)
      if(match){
        res.status(200).json({
          status:200,
          success:true,
          data: user          
        });        
      }else{
        res.status(401).json({
          message:'Wrong password'
        });        
      }
    }else {
      res.status(401).json({
        message:'Wrong username'
      }); 
       }
  
  })    

});

app.post('/user/changepassword',(req ,res)=>{

  const newPassword = req.body.currentPw

  let sql = `SELECT * FROM _users WHERE id_no='${req.body.id_no}'`
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }    
    if(result.length > 0){
      const user =result[0]
      const hashh = {salt:user.salt,password:user.password}
      let match = compare(newPassword, hashh)
      if(match){
        const salt = generateSalt(12)
        const password = req.body.newPw
        const hashing = (hash(password, salt))
        let sql = `UPDATE _users SET password='${hashing.hashedpassword}' , salt='${hashing.salt}' WHERE id_no='${req.body.id_no}'`
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
      }else{
        res.status(401).json({
          message:'Wrong password'
        });        
      }
    }
  })    

});

app.post('/icnhbasadminpanel/user/changepassword',(req ,res)=>{
  const salt = generateSalt(12)
  const password = req.body.newPw
  const hashing = (hash(password, salt))
  let sql = `UPDATE _users SET password='${hashing.hashedpassword}' , salt='${hashing.salt}' WHERE id_no='${req.body.id_no}'`
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
});


app.post('/user/forgetchangepassword',(req ,res)=>{
  let sql =`SELECT * FROM _forgetall where hash='${req.body.changeId}'`
  database.query(sql,(err,result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }
    if(result.length > 0){
      const salt = generateSalt(12)
      const password = req.body.password
      const hashing = (hash(password, salt))
      let sql = `UPDATE _users SET password='${hashing.hashedpassword}' , salt='${hashing.salt}' WHERE id_no='${result[0].userid}'`
      database.query(sql,(err , result)=>{        
        if(err){
          res.status(400).json({
            message:err
          });
          return;
        }else{
        let sql = `DELETE FROM _forgetall WHERE hash='${req.body.changeId}'` 
        database.query(sql,(err,result)=>{
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
    }
  })
})

app.post('/user/forget',(req ,res)=>{

  let sql = `SELECT * FROM _users WHERE username='${req.body.username}'`
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }    
    if(result.length > 0){
      const user =result[0]      
      const salt = generateSalt(12)
      const password = 'YAHYABODAHAB'
      const hashing = (hash(password, salt))
      let sql = `INSERT INTO _forgetall (userid,username,hash) VALUES('${user.id_no}','${user.username}','${hashing.hashedpassword}') `
      database.query(sql,(err , result)=>{
        var mail = {
          from: 'support@icnhbas.com',
          to: user.email, 
          subject: `ICNHBAS forget password request`,
          text: `Hello ${user.title} ${user.fname} , We have received change password for your username ${user.username} to procced the request please go to https://www.icnhbas.com/passwordchange/${hashing.hashedpassword}  `
        }        
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

});



module.exports=app 