require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const passport = require('passport');
const session = require('express-session');

const connection = require('./config/Connection');
const mysqlStore = require('express-mysql-session')(session);
const genPassword = require('./lib/password_utils').genPassword;
const validatepassword = require('./lib/password_utils').validatepassword;
const isAuth = require('./middleware/authmiddleware').isAuth;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

// const options ={
//     password: process.env.DB_PASSWORD,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
// }

// const sessionStore = new mysqlStore(options);

var sessionStore = new mysqlStore({
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
}, connection);

app.use(session({
   secret: 'some secret',
   resave: false,
   saveUninitialized: true,
   store: sessionStore,
   cookie: {
      maxAge: 1000 * 60 * 60 * 1
   }
}))

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login-success'}));

app.use('/register', async (req, res)=>{
   const saltHash = genPassword(req.body.pw);

   const salt = saltHash.salt;
   const hash = saltHash.hash;

   let user ={
      username: req.body.uname,
      hashpassword: hash,
      salt: salt,
      name: req.body.name
   }


   connection.query("INSERT INTO users (username, hashpassword, salt, name) VALUES (?,?,?,?)", 
      [user.username, user.hashpassword, user.salt, user.name]);
   res.json({ success: true, message: 'User Created'});
});


app.get('/homepage', (req, res, next)=>{
   const form = ` <form action="/login" method="POST">
      <label >Username</label>
      <input type="text" name="uname">
      <label >Password</label>
      <input type="text" name="pw">
      <label >YOur name:</label>
      <input type="text" name="name">
      <input type="submit" value="submit">
   </form>`;

   res.send(form);
})

app.use('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

app.use('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});


app.get('/protected-route', isAuth, (req, res, next) => {
res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
});
 


// Visiting this route logs the user out
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/homepage');
});

app.listen(process.env.PORT, ()=>{
   console.log(`Listening to port ${process.env.PORT}`);
})