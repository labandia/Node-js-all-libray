require('dotenv').config();
const express = require('express');
// const passport = require('passport');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')))

// require('./config/passport')(passport);
// app.use(passport.initialize());
// app.use(passport.session());

app.use(require('./routes'));

app.listen(process.env.PORT, ()=>{
   console.log(`Listening to port ${process.env.PORT}`);
})