var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var bodyParser=require("body-parser");
var database = require('./config/database');
var path = require('path'); 
var port = process.env.PORT || 3005;



app.use(require('prerender-node').set('prerenderToken', 'vgFahj4R5D4aYJrBx7Ew'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/sessions', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/accommodation', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/fees', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/organizer', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/contactus', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/registeration', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/program', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/myaccount', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/supervision', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/adminmode', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/checkusers', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/conference/:id/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/myaccount/verification', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/myaccount/changepassword', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/forget', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/passwordchange/:hash', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// database.connect((err)=>{
//   if(err) throw err;
// })


app.use('/uploads',express.static('uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({
  extended:true
}))


// app.get('/download/:id', function(req, res){
//   fileLocation =`uploads/${req.params.id}`
//   file=req.params.id
//   res.download(fileLocation, file, (err) => {
//                 if (err) console.log(err);
//             });  
// });

// app.get('/downloadletter/:id', function(req, res){
//   fileLocation =`uploads/letters/${req.params.id}`
//   file=req.params.id
//   res.download(fileLocation, file, (err) => {
//                 if (err) console.log(err);
//             });  
// });


app.use('/',[
  require('./routes/register'),
  require('./routes/login'),
  require('./routes/user'),
  require('./routes/info'),
  require('./routes/people'),
  require('./routes/sponsers'),
  require('./routes/sessions'),
  require('./routes/program'),
  require('./routes/fees'),
  require('./routes/conference')  
]);


// app.listen(port, ()=>{
//   console.log(`Listening at http://localhost:${port}`)
// });