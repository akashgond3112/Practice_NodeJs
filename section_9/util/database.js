const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "pemFIle",
  "DigiCertGlobalRootCA.crt.pem"
);
const serverCa = [
  fs.readFileSync(p, "utf8"),
];

const pool = mysql.createPool({
  host: "csc8019.mysql.database.azure.com",
  user: "akashgond3112",
  password: `W3'gbQ,PLh"k_="`,
  database: "reactlibrarydatabase",
  port: 3306,
  ssl: { rejectUnauthorized: true, ca: serverCa },
});

module.exports = pool.promise();
