const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const userctrl = require("./controllers/usercontroller");

// const user = require("./model/user");
// const contact = require("./model/contact");
const sequelize = require("./model");

require("./model");

app.get("/", function (req, res) {
  res.send("Hello World");
});
// app.get("/adduser", userctrl.adduser);

app.get("/users", userctrl.showusers);

app.get("/user/:id", userctrl.user);

app.post("/radduser", userctrl.adduser_by_rawdata);

app.delete("/user/:id", userctrl.delete_user);

app.patch("/user/:id", userctrl.patch_user)
// user.sync();
// contact.sync({ force: true });   
// user.drop();


app.post("/a_user", userctrl.addSingleUser);

app.get("/a_user/:id", userctrl.getUserDetails);

app.patch("/a_user/:id",userctrl.updatemobile)




app.listen(3005),
  () => {
    console.log("running on 3005");
  };
