const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8');

// Stores  a Buffer object
const encryptMessage = encrypt.encryptWithPublickey(publicKey, 'hello world');

// if you try and 'Crack the code' , you will just get gibberish
console.log(encryptMessage.toString());

const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf-8');

const decryptMessage = decrypt.decryptWithPrivatekey(privateKey, encryptMessage);

// Convert the Buffer to a string and print the message!!
console.log(decryptMessage.toString());
