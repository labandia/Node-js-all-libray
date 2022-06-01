require('dotenv').config();
const session = require("express-session")
const express = require('express');
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({
   extended: true
}))


var options ={
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'sample'
}
 
var sessionConnection = mysql.createConnection(options);
var sessionStore = new MySQLStore({
   createDatabaseTable: true,
   expiration: 10800000,
   schema: {
      tableName: 'sessiontable',
      columnNames: {
         session_id: 'session_id',
         expires: 'expires',
         data: 'data'
      }
   }
}, sessionConnection);


app.use(session({
   secret: 'mysecret',
   store: sessionStore,
   resave: false,
   saveUninitialized: true
}));

app.use('/log', (req, res)=>{
   const { username } = req.body;
   console.log('sdsd');
   if(username == 'admin123'){
      req.session.newdata = username;
      res.json("INPUT SUCCESS");
   }
})

app.use('/sendata', (req, res)=>{
   if(req.session.newdata){
      res.send('HELLOW'+ req.session.newdata)
   }else{
      res.send('sdsdsa');
   }
})

app.listen(process.env.PORT, ()=>{
   console.log(`listening at port ${process.env.PORT}`)
})