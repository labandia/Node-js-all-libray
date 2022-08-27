const fw = require("fs");
const path = require("path");

//DISPLAY A STRING FROM THE FILE
fw.readFile(path.join(__dirname, "files", "text.txt"), "utf8", (err, data) => {
   if (err) throw err;
   console.log(data);
});

//FILES TO OVERWRITE THE FILES TEXT
fw.writeFile(path.join(__dirname, "files", "reply.txt"), "Buceksds", (err) => {
   if (err) throw err;
   console.log("WRITE COMPLETE");

   fw.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n \n loL",
      (err, data) => {
         if (err) throw err;
         console.log("APPEND COMPELTE");
      }
   );
});

// fw.rename
// fw.unlink

process.on("uncaughtException", (err) => {
   console.error(`there was an uncaught error: ${err}`);
   process.exit(1);
});
