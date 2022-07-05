const router = require('express').Router();
const connection = require('../config/Connection');
const genPassword = require('../lib/utils').genPassword;
const validatepassword = require('../lib/utils').validatepassword;
const issueJWT = require('../lib/utils').issueJWT;
const authMiddleware = require('../lib/utils').authMiddleware;


router.post('/login', async(req, res, next)=>{
   let {username, password} = req.body;
   const sql = 'SELECT * FROM users WHERE username = ?';

   try {
      let [users] = await connection.query(sql, [username]);
      const isvalid = validatepassword(password, users[0].hashpassword, users[0].salt);

      if(isvalid){
         const tokenobject = issueJWT(users[0]);
         res.status(200).json({
            success: true,
            user: users,
            token: tokenobject.token,
            expiresIn: tokenobject.expiresIn
         })
      }else{
         res.status(401).json({
            success: false,
            msg: 'You entered the wrong password'
         })
      }
   } catch (error) {
     next(error);
   }
});

router.post('/register', async (req, res)=>{
   const saltHash = genPassword(req.body.password);

   const salt = saltHash.salt;
   const hash = saltHash.hash;

   let user ={
      username: req.body.username,
      hashpassword: hash,
      salt: salt,
      name: req.body.name
   }

   await connection.query("INSERT INTO users (username, hashpassword, salt, name) VALUES (?,?,?,?)", 
      [user.username, user.hashpassword, user.salt, user.name]);
      
   res.json({ success: true, message: 'User Created'});
});

// router.get('/protectedroute', passport.authenticate('jwt', {session: false}),  (req, res)=>{
//    res.status(200).json({ success: true, msg: 'you are authorized'})
// });


router.post('/postblog',(req, res)=>{
   let {title, desc, image} = req.body;
   connection.query("INSERT INTO blog (title, description) VALUES (?,?)", 
      [title, desc]);
      
   res.json({ success: true, message: 'Blog added success'});
})


router.get('/getblog',  async(req, res)=>{
   let [data] = await connection.query('SELECT * FROM blog');
   res.status(200).json({ success: true, payload: data})
}); 

router.get('/getblog2/:id',  async(req, res)=>{
   let id = req.params.id;
   let [data] = await connection.query('SELECT * FROM blog WHERE title = ?', [id]);
   res.status(200).json({ success: true, payload: data})
});

router.get('/protectedroute', authMiddleware,  (req, res)=>{
   res.status(200).json({ success: true, msg: 'you are authorized'})
});
 
module.exports = router;