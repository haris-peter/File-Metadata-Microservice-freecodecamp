const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//multer setup

const upload=multer({
  dest:'uploads/',
  limits:{fileSize:10*1024*1024},
})

//file upload 
app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  if(!req.file){
    return res.status(400).json({
      error:'No file uploaded'
    });
  }
  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size, // Size in bytes
  });


})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
