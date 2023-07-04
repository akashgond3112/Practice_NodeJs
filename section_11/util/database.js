const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "pemFIle",
  "DigiCertGlobalRootCA.crt.pem"
);
const serverCa = [fs.readFileSync(p, "utf8")];

const sequelize = new Sequelize(
  "reactlibrarydatabase",
  "akashgond3112",
  `W3'gbQ,PLh"k_="`,
  {
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: serverCa,
      },
    },
    host: "csc8019.mysql.database.azure.com",
  }
);

module.exports = sequelize;
