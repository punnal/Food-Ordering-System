const express = require('express')
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')




var bodyParser     =        require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({limit : '50mb', extended: false })); //body parser for api request parsing  urlencoded allows for a max of 50mb size (for storing images)
app.use(bodyParser.json({limit : '50mb'})); 
app.use(cookieParser()); //cookie parser for cookie validation checks (in the users.js file)


app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    next();
  }
});




var menu_defs = require('./menu.js') //menu request handlers
var order_defs = require("./orders.js") //orders request handlers (also allows for status management)
var deals_defs = require("./deals.js") //deals request handlers
var user_defs = require("./users.js") //users (both admin and customer) request handlers and cookie middleware functions
var gallery_defs = require('./gallery.js') //gallery api request handlers
var aboutus_defs = require('./aboutus.js') //about us api request handlers
var resinfo_defs = require('./res_admin_info.js') //restaurant info and admin account settings



app.use(user_defs.isCookieValid) //cookie middleware function defined in users.js
// app.use(user_defs.customer_middleware)

app.use('/admin', express.static(__dirname + "/../admin/build")); //admin build file
app.use(express.static(__dirname + "/../customer/build")); // customer build file



var utils = require('./utils.js')






get_routes = [menu_defs.route, order_defs.route, deals_defs.route, gallery_defs.route, aboutus_defs.route, resinfo_defs.route_contact_us, resinfo_defs.route_res_info] //get routes
get_handlers = [menu_defs.get_handler, order_defs.get_handler,  deals_defs.get_handler, gallery_defs.get_handler, aboutus_defs.get_handler, resinfo_defs.get_handler_contact_us, resinfo_defs.get_handler_res_info]//get handlers


get_routes.forEach((element, i) =>{ //get handlers for customer side
    app.get(element,  user_defs.customer_middleware, get_handlers[i])
})

get_routes.forEach((element, i) =>{ //get handlers for admin side
  if(i != 2)
    app.get(('/admin' + element), user_defs.admin_middleware, get_handlers[i] )
})

app.get('/admin/api/deals', user_defs.admin_middleware,  deals_defs.get_handler_admin)//get handler for deals - admin side


//post routes for admin side:
post_routes = [deals_defs.route, menu_defs.route, order_defs.route,  gallery_defs.route, aboutus_defs.route, order_defs.order_mgmt_route, resinfo_defs.route_contact_us, resinfo_defs.route_res_info]
post_handlers = [deals_defs.post_handler, menu_defs.post_handler, order_defs.post_handler,  gallery_defs.post_handler, aboutus_defs.post_handler, order_defs.order_mgmt_post_handler, resinfo_defs.post_handler_contact_us, resinfo_defs.post_handler_settings]

post_routes.forEach((element, i) =>{
    app.post(('/admin' + element), user_defs.admin_middleware, post_handlers[i])
})

app.post(user_defs.admin_login_route, user_defs.admin_login_post_handler)//admin login post handles (handles admin login requests)


//post routes for customer side:
app.post(user_defs.signup_post_route, user_defs.signup_post_handler)
app.post(user_defs.login_post_route, user_defs.login_post_handler)
app.post(order_defs.route, user_defs.customer_middleware, order_defs.post_handler)
app.post(user_defs.customer_password_reset_route, user_defs.customer_middleware, user_defs.reset_password_customer)
app.post(user_defs.customer_settings_reset_route, user_defs.customer_middleware, user_defs.reset_settings_customer)

app.post(user_defs.googleSignIn_route, user_defs.googleSignIn) //handles google sign in

app.post(user_defs.forgot_password_route, user_defs.forgot_password)






/// Make edits Here 

app.get("admin/*", function(req, res) {
  console.log("sending")
  res.sendFile(path.resolve(__dirname + "/../admin/build/index.html")); //sends admin side index.html 
});


app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/../customer/build/index.html")); //sends customer index.html
});






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))
