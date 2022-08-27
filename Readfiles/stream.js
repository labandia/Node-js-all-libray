const fw = require("fs");

const rs = fw.createReadStream("./files/lorem.txt", { encoding: "utf8" });

const ws = fw.createWriteStream("./files/mewlorem.txt");

rs.on("data", (dataChuck) => {
   ws.write(dataChuck);
});

// rs.pipe(ws);
