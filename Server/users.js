
var firebase = require('./db_initialize.js')
const jwt = require('jsonwebtoken')
var utils = require('./utils.js')

const util = require('util')

const secret = "lmao_we_suck"



var db_users = firebase.database().ref().child("User");  //firebase realtime db storing paths for all users
var db_admin = firebase.database().ref().child("admin");

escapeEmail = utils.escapeEmail
unescapeEmail = utils.unescapeEmail


const login_post_route ='/api/users/login' 
const signup_post_route = '/api/users/signup'




function user_exists(email){
    return new Promise(function (resolve, reject) {
        db_users.child(escapeEmail(email)).once("value", function(snapshot) {
            if(!snapshot.exists())
                reject(null) 
            else
                resolve(snapshot)
        });
    });
}


function push_user_helper(key, to_push){
    return new Promise(function(resolve, reject){
        db_users.child(escapeEmail(key)).set(to_push).then(()=> resolve(200))
        .catch((error)=>reject(400))
    })
}

function push_user(key, to_push){
    return new Promise(function(resolve, reject){
        user_exists(key).then(() => reject(404)) 
        .catch(() => push_user_helper(key, to_push).then((status) => resolve(status)).catch((status) => reject(status)))
    })
}

function extract_user_data(req, first_time)
{
    var data = req.body["data"]

    console.log("data " + util.inspect(Object.keys(req.body)[0], false, null, true /* enable colors */))

    if(typeof data == "undefined")
        return

    var user_data = {"email": data["email"], "firstName":data["firstName"], "lastName":data["lastName"], 
        "contact_no":data["phone"], "address":data["address"]}

    if(!("google" in data) || !data["google"])
        user_data["password"] = data["password"]

    else
        user_data["password"] = ""
    
    

    return user_data
}

function googleSignIn(req, res){
    console.log("here")
    var email = ""
    try{
        var data = req.body["data"]
        email = data["email"]
    }
    catch(err){
        res.status(403)
        res.send("Wrong format used for post request.")
        return
    }
        
    user_exists(email).then((user_snapshot) => {

        var to_send = {"data" :{"contents" : {"email" :  unescapeEmail(email), "firstName" : (user_snapshot.val()["firstName"] || ""), "lastName" : (user_snapshot.val()["lastName"] || ""), "phone" : (user_snapshot.val()["contact_no"] || ""), "address" : (user_snapshot.val()["address"] || "") , "google" : true  }, "success" : true, "error" : "All is well."    }}


        email = escapeEmail(email)
        const payload = {"email" : email}
        const token = jwt.sign(payload, secret, {
            expiresIn : '1h'
        });
        return res.cookie('token', token, {httpOnly : true,  sameSite : true, secure : false, maxAge: 2 * 60 * 60 * 1000})
        .header('Access-Control-Expose-Headers', 'token')
        .header('token', token)
        .status(200)
        .send(JSON.stringify(to_send))

    }).catch((err) =>{  
        req.body["data"]["google"] = true
        var user_data = extract_user_data(req)
        user_data["google"] = true
        db_users.child(escapeEmail(email)).set(user_data).then(() =>{
            email = escapeEmail(email)
            const payload = {"email" : email}
            const token = jwt.sign(payload, secret, {
                expiresIn : '1h'
            });
            var to_send = {"data" :{"contents" : {"email" :  unescapeEmail(email), "firstName" : (user_data["firstName"] || ""), "lastName" : (user_data["lastName"] || ""), "phone" : (user_data["contact_no"] || ""), "address" : (user_data["address"] || "") , "google" : true }, "success" : true, "error" : "All is well."    }}

            return res.cookie('token', token, {httpOnly : true,  sameSite : true, secure : false, maxAge: 2 * 60 * 60 * 1000})
            .header('Access-Control-Expose-Headers', 'token')
            .header('token', token)
            .status(200)
            .send(JSON.stringify(to_send))

        }).catch(() => res.status(404).send(JSON.stringify({"success" : false, "error" : "Server side error" })))
    });
    
}

function reset_password_customer(req, res)
{
    if(res.locals.cookieValid)
    {
        user_exists(res.locals.uid).then((user_snapshot) =>{
            if(typeof req.body["data"]["password"] == "undefined"){
                res.status(403).send({"data":  {"success" : false, "error" : "Invalid post request format"}})
                return
            }

            var isGoogle = false;

            if(("google" in user_snapshot.val())  && (user_snapshot.val()["google"].toString() == "true"))
                isGoogle = true
            

            if(req.body["data"]["oldPassword"] == user_snapshot.val()["password"])
            {
                var user = {...user_snapshot.val(), "password" : req.body["data"]["password"]}
                
                push_user_helper(user["email"], user).then((statusCode) => {

                    var to_send = {"data" :{"contents" : {"email" :  res.locals.uid, "firstName" : (user["firstName"] || ""), "lastName" : (user["lastName"] || ""), "phone" : (user["contact_no"] || ""), "address" : (user["address"] || "") , "google" : isGoogle }, "success" : true, "error" : "All is well."    }}

                    console.log(statusCode)
                    return res
                    .status(statusCode)
                    .send(JSON.stringify(to_send))
                }).catch(() =>{
                    
                    var to_send = {"data" :{"contents" : { }, "success" : false, "error" : "Couldn't change password. Please try again."    }}

                    console.log(statusCode)
                    return res.status(400).send(JSON.stringify(to_send))
                })

                    
            }
            else
            {
                var to_send = {"data" :{"contents" : { }, "success" : false, "error" : "Incorrect password."    }}
                return res
                .status(401)
                .send(JSON.stringify(to_send))

            }
        }).catch((err) => {
            var to_send = {"data" :{"contents" : { }, "success" : false, "error" : "User accout not found."    }}
            return res.status(404).send(JSON.stringify(to_send))  
        })
    }
    else{
        var to_send = {"data" :{"contents" : { }, "success" : false, "error" : "You must be logged in to be able to reset your password."    }}
        return res
        .status(401)
        .send(JSON.stringify(to_send))    
    }
}


function reset_settings_customer(req, res){
    if(res.locals.cookieValid)
    {
        user_exists(res.locals.uid).then((user_snapshot) =>{
            if(typeof req.body["data"] == "undefined"){
                res.status(403).send({"data":  {"success" : false, "error" : "Invalid post request format"}})
                return
            }
            var user = {...req.body["data"]}

            user["email"] = res.locals.uid
            user["password"] = user_snapshot.val()["password"]
            user["contact_no"] = req.body["data"]["phone"] || ""

            var isGoogle = false;

            if(("google" in user_snapshot.val())  && (user_snapshot.val()["google"].toString() == "true"))
                isGoogle = true
                        
            push_user_helper(user["email"], user).then((statusCode) => {

                var to_send = {"data" :{"contents" : {"email" :  res.locals.uid, "firstName" : (user["firstName"] || ""), "lastName" : (user["lastName"] || ""), "phone" : (user["contact_no"] || ""), "address" : (user["address"] || "")  }, "success" : true, "error" : "All is well." , "google" : isGoogle   }}
                
                console.log(statusCode)
                return res
                .status(statusCode)
                .send(JSON.stringify(to_send))
            }).catch(() =>{
                
                var to_send = {"data" :{"contents" : { }, "success" : false, "error" : "Couldn't change password. Please try again."    }}

                return res.status(400).send(JSON.stringify(to_send))
            })

                    
            
        }).catch((err) => {
            var to_send = {"data" :{"contents" : { }, "success" : false, "error" : "User accout not found."    }}
            return res.status(404).send(JSON.stringify(to_send))  
        })
    }
    else{
        var to_send = {"data" :{"contents" : { }, "success" : false, "error" : "You must be logged in to be able to change your settings."    }}
        return res
        .status(401)
        .send(JSON.stringify(to_send))    
    }
}

function signup_post_handler(req, res)
{
    var user_data = extract_user_data(req);
    push_user(user_data["email"], user_data).then(() => {

        var to_send = {"data" :{"contents" : {"email" :  unescapeEmail(user_data["email"]), "firstName" : (user_data["firstName"] || ""), "lastName" : (user_data["lastName"] || ""), "phone" : (user_data["contact_no"] || ""), "address" : (user_data["address"] || "")  }, "success" : true, "error" : "All is well.", "google" :false    }}
          

        var email = escapeEmail(user_data["email"])
        const payload = {"email" : email}
        const token = jwt.sign(payload, secret, {
            expiresIn : '1h'
        });

        return res.cookie('token', token, {httpOnly : true,  sameSite : true, secure : false, maxAge: 2 * 60 * 60 * 1000})
        .status(200)
        .send(JSON.stringify(to_send))
    
    }).catch((statusCode) =>{
        var to_send = {"data" : {"success" : false , "error" : "User prolly already exists."}}
        return res
        .status(statusCode)
        .send(JSON.stringify(to_send))            
    })
    
}


function login_post_handler_customer(req, res){
    console.log("here")
    var email = ""
    try{
        var data = req.body["data"]
        email = data["email"]
    }
    catch(err){
        res.status(403)
        res.send("Wrong format used for post request.")
        return
    }

    if(!("google" in data) )
        var password = data["password"]
    
    user_exists(email).then(user_snapshot => {


        console.log("Exists")
        if(user_snapshot.val()["password"] == undefined || user_snapshot.val()["password"] != password)
        {
            console.log("wrong password")
            var to_send = {"data" : {"success" : false , "error" : "Incorrect password entered."}}
            return res
            .status(404)
            .send(JSON.stringify(to_send))            
        }
        email = escapeEmail(email)
        const payload = {"email" : email}
        const token = jwt.sign(payload, secret, {
            expiresIn : '1h'
        });
        console.log("here sending cookie")

        var to_send = {"data" :{"contents" : {"email" :  unescapeEmail(email), "firstName" : (user_snapshot.val()["firstName"] || ""), "lastName" : (user_snapshot.val()["lastName"] || ""), "phone" : (user_snapshot.val()["contact_no"] || ""), "address" : (user_snapshot.val()["address"] || ""), "google" : false  }, "success" : true, "error" : "All is well."    }}
        

        return res.cookie('token', token, {httpOnly : true,  sameSite : true, secure : false, maxAge: 2 * 60 * 60 * 1000})
        .status(200)
        .send(JSON.stringify(to_send))
    
    }).catch((err)=> {
        console.log(err)
            var to_send = {"data" : {"success" : false , "error" : "Email not found in database."}}
            res.status(404).send(to_send)
        })

}

function login_post_handler_admin(req, res){
    if(!("data" in req.body) || !("username" in req.body["data"]) || !("password" in req.body["data"]) )
        return res.status(403).send(JSON.stringify({"success" : false, "error" : "invalid post request format"}))
    var username = req.body["data"]["username"]
    var password = req.body["data"]["password"]
    db_admin.once("value", (admin_snap) => {
        if( !(admin_snap.exists()) || !("password" in admin_snap.val()) || admin_snap.val()["password"] != password || admin_snap.val()["username"] != username)
            return res.status(401).send(JSON.stringify({"success" : false, "error" : "incorrect password"}))
        
        const payload = {"email" : username}
        const token = jwt.sign(payload, secret, {
            expiresIn : '1h',
            })

        return res.cookie('token', token, {httpOnly : true, sameSite : true, secure : false, maxAge: 2 * 60 * 60 * 1000})
        .status(200)
        .send(JSON.stringify({"success" : true, "error" : "All is well! You are signed in"}))
    
    }).catch((err) =>{
        return res.status(404).send(JSON.stringify({"success" : false, "error" : "User not found."}))
    })
}

function isCookieValid(req, res, next){
    const token = 
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    
    console.log("HIT")
    
    res.locals.cookieValid = false
    res.locals.cookieMissing = false
    res.locals.cookieUnauthorized = false
  
    if (!token) 
    {
        console.log("No token")
        res.locals.cookieMissing = true
    } 
    else 
    {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) 
        {
            console.log("Invalid token")
            res.locals.cookieUnauthorized = true
        } 
        else {
            console.log("Decoded email: " + decoded.email)
            res.locals.cookieValid = true
            res.locals.uid = unescapeEmail(decoded.email)
        }
      });
    }
    next()
  }


function admin_middleware(req, res, next){
    
    if(res.locals.cookieValid)
    {
        db_admin.once("value").then((admin_snapshot) =>{
            if(res.locals.uid == admin_snapshot.val()["username"]){
                next()
            }
            else
            {
                res.locals.cookieValid = false
                res.locals.cookieUnauthorized = true
            }
        })
    }  
    
    if(!res.locals.cookieValid)
    {
        if(res.locals.cookieUnauthorized)
            return res.status(401).send(JSON.stringify({"cookieValid" : "invalid", "error" : "Cookie invalid. Unauthorized. Please login again"}))
        else
            return res.status(401).send(JSON.stringify({"cookieValid" : "missing", "error" : "Cookie missing. Please login to proceed."}))
    } 
}

function customer_middleware(req, res, next){
    console.log("2")
    if(res.locals.cookieValid){
        user_exists(res.locals.uid).then((val) => {
        }) //if user exists then move to the next middleware function i.e the main request handler
        .catch((val) => { //if user does not exist, set unauthorized cookie boolean to true to hanlde it later in the function
            res.locals.cookieUnauthorized = true; 
            res.locals.cookieValid = false
        })      
    }
    next()
}


module.exports.login_post_handler = login_post_handler_customer
module.exports.signup_post_handler = signup_post_handler

module.exports.login_post_route = login_post_route
module.exports.signup_post_route = signup_post_route


module.exports.reset_settings_customer = reset_settings_customer
module.exports.reset_password_customer = reset_password_customer

module.exports.customer_password_reset_route = '/api/users/reset/password'
module.exports.customer_settings_reset_route = '/api/users/reset/settings' 


module.exports.isCookieValid = isCookieValid

module.exports.customer_middleware = customer_middleware
module.exports.admin_middleware = admin_middleware

module.exports.admin_login_post_handler = login_post_handler_admin
module.exports.admin_login_route = '/admin/api/login'


module.exports.googleSignIn = googleSignIn
module.exports.googleSignIn_route = '/api/users/google/signin'