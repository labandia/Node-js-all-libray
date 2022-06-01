const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./Connection');
const validatepassword = require('../lib/password_utils').validatepassword;


const customFields = {
   usernameField: 'uname',
   passwordField: 'pw'  
}


const verifycallbacks = async (username, password, done) =>{
   const [users] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
   if (users.length == 0){
      return done(null, false)
   }
   const isvalid = validatepassword(password, users[0].hashpassword, users[0].salt);

   if(isvalid){   
      return done(null, users[0]);
   } else{
      return done(null, false);
   }


}

const strategy = new LocalStrategy(customFields, verifycallbacks);

passport.use(strategy)

passport.serializeUser((user, done)=>{
   done(null, user.user_id);
})

passport.deserializeUser( async (userid, done)=>{
   const [users] =  await connection.query('SELECT * FROM users WHERE user_id = ?', [userid]);
   done(null, users[0]);
})