const express = require("express");

//instantiate express app
const app = express();
//define server port
const port = 3200;
//create a default route
app.get("/", (req, res) => {
  console.log("server get data");
  res.send("Express typescript server ");
});
//star listening to the requests on the defined port
app.listen(port, () => console.log(`Listening on port ${port}`));
