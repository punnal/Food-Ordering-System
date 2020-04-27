const express = require('express')
const app = express();

app.use(express.static("../admin/build"));


var firebase = require('./db_initialize.js')
var menu_defs = require('./menu.js')
var utils = require('./utils.js')


var db = firebase.database().ref().child("rand_vals");
var db_users = firebase.database().ref().child("User");


routes = [menu_defs.route]


handlers = [menu_defs.get_handler]

routes.forEach((element, i) =>{
    app.get(element, handlers[i])
})

app.get("/api/menu", menu_defs.get_handler)


/// Make edits Here 

app.get("/*", function(req, res) {
    res.sendFile("index.html", {root : "../admin/build"});
});

const port = process.env.PORT | 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))
