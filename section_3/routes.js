const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      "<!DOCTYPE html> <html> <body> <h2>HTML Forms</h2> <form action='/message'  method='POST'> <label for='fname'>First name:</label><br> <input type='text' id='fname' name='fname' value='John'><br> <label for='lname'>Last name:</label><br> <input type='text' id='lname' name='lname' value='Doe'><br><br> <input type='submit' value='Submit'> </form> </body> </html>"
    );

    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("&");
      const firstName = message[0].split("=")[1];
      const lastName = message[1].split("=")[1];

      console.log(firstName + " --- " + lastName);
      fs.writeFile("message.txt", firstName + " --- " + lastName, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>My forst page</title></head><bod><h1>Hello node JS!</h1></bod></html>"
  );

  res.end();
};

// module.exports = requestHandler;

/* 
module.exports = {handler : requestHandler}
*/
exports.handler = requestHandler;
