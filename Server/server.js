const express = require('express')
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

var fs = require('fs')
var https = require('https')



var bodyParser     =        require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({limit : '50mb', extended: false }));
app.use(bodyParser.json({limit : '50mb'}));
app.use(cookieParser());


app.use(express.static(__dirname + "/../customer/build"));
app.use(express.static(__dirname + "/../admin/build"));





const secret = "lmao_we_suck"



var menu_defs = require('./menu.js')
var order_defs = require("./orders.js")
var deals_defs = require("./deals.js")
var user_defs = require("./users.js")
var gallery_defs = require('./gallery.js')
var aboutus_defs = require('./aboutus.js')
var utils = require('./utils.js')


app.use(function(req, res, next) {
  var reqType = req.headers["x-forwarded-proto"];
  reqType == 'https' ? next() : res.redirect("https://" + req.headers.host + req.url);
});
app.use(user_defs.isCookieValid)



get_routes = [menu_defs.route, order_defs.route, deals_defs.route, gallery_defs.route, aboutus_defs.route]
get_handlers = [menu_defs.get_handler, order_defs.get_handler,  deals_defs.get_handler, gallery_defs.get_handler, aboutus_defs.get_handler]

get_routes.forEach((element, i) =>{
    app.get(element,  user_defs.customer_middleware, get_handlers[i])
})

get_routes.forEach((element, i) =>{
  if(i != 2)
    app.get(('/admin' + element), user_defs.admin_middleware, get_handlers[i] )
})

// app.get('/admin/api/deals',  deals_defs.get_handler_admin)



post_routes = [deals_defs.route, menu_defs.route, order_defs.route, user_defs.signup_post_route, user_defs.login_post_route, gallery_defs.route, aboutus_defs.route, order_defs.order_mgmt_route, user_defs.customer_password_reset_route, user_defs.customer_settings_reset_route]
post_handlers = [deals_defs.post_handler, menu_defs.post_handler, order_defs.post_handler, user_defs.signup_post_handler, user_defs.login_post_handler, gallery_defs.post_handler, aboutus_defs.post_handler, order_defs.order_mgmt_post_handler, user_defs.reset_password_customer, user_defs.reset_settings_customer]

post_routes.forEach((element, i) =>{
    app.post(element, post_handlers[i])
})

app.post(user_defs.admin_login_route, user_defs.admin_login_post_handler)

app.get('/admin/api/deals', deals_defs.get_handler_admin)



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
      res.status(404).send(JSON.stringify({"data" : {}, "cookieValid" : "missing" }) );
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            console.log("Invalid token")
          res.status(401).send(JSON.stringify({"data" : {}, "cookieValid" : "invalid" }));
        } else {
            console.log("LOGGED IN: " + decoded.email)
          res.status(200)
          res.send(JSON.stringify({"data" : {}, "cookieValid" : "valid" }))
        }
      });
    }
  })


/// Make edits Here 

app.get("/admin", function(req, res) {
  // console.log()
  // res.send("Hello!")
  res.sendFile(path.resolve(__dirname + "/../customer/build/index.html"));
});


app.get("/*", function(req, res) {
    // console.log()
    // res.send("Hello!")
    res.sendFile(path.resolve(__dirname + "/../customer/build/index.html"));
});






const port = process.env.PORT || 5000;


https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, './server.cert'))
}, app).listen(port, () => console.log(`listening on port ${port}...`))
