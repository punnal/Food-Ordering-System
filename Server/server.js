const express = require('express')
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

var bodyParser     =        require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({limit : '50mb', extended: false }));
app.use(bodyParser.json({limit : '50mb'}));
app.use(cookieParser());


app.use(express.static("../customer/build"));


const secret = "lmao_we_suck"


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

app.get('/users/login/test', function(req, res) {
    res.status(200)
    console.log("get login called")
    res.send("works!")
});

app.get('/api/test', (req, res) => {
    const token = 
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    
    console.log("HIT")  
  
    if (!token) {
        console.log("No token")
      res.status(404).send('Unauthorized: No token provided');
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            console.log("Invalid token")
          res.status(401).send('Unauthorized: Invalid token');
        } else {
            console.log("LOGGED IN: " + decoded.email)
          res.status(200)
          res.send("LOGGED IN!")
        }
      });
    }
  })


/// Make edits Here 

app.get("/*", function(req, res) {
    // console.log()
    // res.send("Hello!")
    res.sendFile("index.html", {root : "../customer/build"});
});



const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`listening on port ${port}...`))
