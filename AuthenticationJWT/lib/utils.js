const crypto = require("crypto");
require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const publicToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(publicToKey, "utf8");

function genPassword(password) {
   var salt = crypto.randomBytes(32).toString("hex");
   var genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");

   return {
      salt: salt,
      hash: genHash,
   };
}

function validatepassword(password, hash, salt) {
   var Hashverify = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
   return hash === Hashverify;
}

function issueJWT(user) {
   const id = user.user_id;

   const expiresIn = "1d";

   const payload = {
      sub: id,
      iat: Date.now(),
   };
   const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
      expiresIn: expiresIn,
      algorithm: "RS256",
   });

   // const signedToken = jsonwebtoken.sign(payload, "secretkey", {
   //    expiresIn: expiresIn,
   //    algorithm: "RS256",
   // });

   return {
      token: "Bearer " + signedToken,
      expiresIn: expiresIn,
   };
}

function authMiddleware(req, res, next) {
   // console.log(req.headers);
   const tokenparts = req.headers.authorization.split(" ");

   if (
      tokenparts[0] === "Bearer" &&
      tokenparts[1].match(/\S+\.\S+\.\S+/) !== null
   ) {
      try {
         const verify = jsonwebtoken.verify(tokenparts[1], PUB_KEY, {
            algorithm: ["RS256"],
         });
         req.jwt = verify;
         next();
      } catch (error) {
         res.status(401).json({
            success: false,
            msg: "you are not authorized to visit this route",
         });
      }
   } else {
      res.status(401).json({
         success: false,
         msg: "you are not authorized to visit this route",
      });
   }
}

module.exports.genPassword = genPassword;
module.exports.validatepassword = validatepassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
