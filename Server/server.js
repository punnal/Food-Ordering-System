const express = require('express')
const app = express();

var bodyParser     =        require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({limit : '50mb', extended: false }));
app.use(bodyParser.json({limit : '50mb'}));

app.use(express.static("../admin/build"));


var menu_defs = require('./menu.js')
var order_defs = require("./orders.js")
var deals_defs = require("./deals.js")
var user_defs = require("./users.js")
var utils = require('./utils.js')


get_routes = [menu_defs.route, order_defs.route, deals_defs.route]



get_handlers = [menu_defs.get_handler, order_defs.get_handler,  deals_defs.get_handler]

get_routes.forEach((element, i) =>{
    app.get(element, get_handlers[i])
})


post_routes = [deals_defs.route, menu_defs.route, order_defs.route, user_defs.signup_post_route, user_defs.login_post_route]
post_handlers = [deals_defs.post_handler, menu_defs.post_handler, order_defs.post_handler, user_defs.signup_post_handler, user_defs.login_post_handler]

post_routes.forEach((element, i) =>{
    app.post(element, post_handlers[i])
})

/// Make edits Here 

app.get("*", function(req, res) {
    res.send("Hello!")
    //res.sendFile("index.html", {root : "../admin/build"});
});

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`listening on port ${port}...`))
