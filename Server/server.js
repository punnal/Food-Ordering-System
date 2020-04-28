const express = require('express')
const app = express();

app.use(express.static("../admin/build"));


var firebase = require('./db_initialize.js')
var menu_defs = require('./menu.js')
var order_defs = require("./orders.js")
var utils = require('./utils.js')


var db = firebase.database().ref().child("rand_vals");
var db_users = firebase.database().ref().child("User");


routes = [menu_defs.route, order_defs.route_deliveries, order_defs.route_local]



handlers = [menu_defs.get_handler, order_defs.get_delivery_handler, order_defs.get_local_handler]

routes.forEach((element, i) =>{
    app.get(element, handlers[i])
})

app.post("/api/orders", order_defs.post_handler)

/// Make edits Here 

app.get("*", function(req, res) {
    res.send("Hello!")
    //res.sendFile("index.html", {root : "../admin/build"});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}...`))
