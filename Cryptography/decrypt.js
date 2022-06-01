const crypto = require('crypto');

function decryptWithPrivatekey(privateKey, encryptMessage){
   return crypto.privateDecrypt(privateKey, encryptMessage);
}

function decryptWithPublickey(publicKey, encryptMessage){
   return crypto.privateDecrypt(publicKey, encryptMessage);
}

module.exports.decryptWithPrivatekey = decryptWithPrivatekey;
module.exports.decryptWithPublickey = decryptWithPublickey;
