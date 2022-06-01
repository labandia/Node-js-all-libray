require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();


const corsoption = {
   origin: '*'
}



app.use(cors(corsoption));
// app.use(express.static('uploads')); 
app.use('/images', express.static('uploads'));

app.get('/', (req, res)=>{
   res.send("welcome to node js");
});

const storage = multer.diskStorage({
   destination: function(req, file, cb){
      cb(null, "uploads");
   },
   filename: function(req, file, cb){
      cb(null, `${Date.now()}_${file.originalname}`)
   }
});

const upload = multer({
   storage: storage,
   // limits:
   fileFilter: function(req, file, cb){
      checkFileType(file, cb);
   }
});

// CHECKS IF THE IMAGE TYPE IS JPEG/PNG/JPG 
function checkFileType(file, cb){
   //Allowed extension
    const filetypes = /jpeg|jpg|png|gif/;
   //check extension
   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
   //check mime
   const mimetype = filetypes.test(file.mimetype);

   if(mimetype && extname){
      return cb(null, true);
   }else {
      cb('Images only');
   }
}


// UPLOAD A SINGLE IMAGE
app.post('/file', upload.single('file'), (req, res)=>{
   const file = req.file;

   if(file){
      res.json(file);
   }else{
      throw new Error('File not found');
   }
})

// UPLOAD A TWO AND MORE IMAGE

app.post('/multifiles', upload.array('files'), (req, res)=>{
   const files = req.files;

   if(Array.isArray(files) && files.length > 0){
      res.json(files);
   }else{
      throw new Error('File upload  unsuccessful');
   }
})


app.listen(process.env.PORT, ()=>{
   console.log(`Listening at port ${process.env.PORT}`);
})