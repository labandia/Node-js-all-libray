const fs = require('fs');
const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const connection = require('../config/Connection');
const pathKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathKey, 'utf-8');

const option ={
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}



module.exports = (passport) =>{
  // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(option, async function(payload, done) {
        const [users] =  await connection.query('SELECT * FROM users WHERE user_id = ?', [payload.sub]);
      console.log(users.length);
         
         if(users.length > 0){   
            return done(null, users[0]);
         } else{
            return done(null, false);
         }
    }));
}