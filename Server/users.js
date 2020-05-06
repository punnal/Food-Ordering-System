
var firebase = require('./db_initialize.js')
const jwt = require('jsonwebtoken')
var utils = require('./utils.js')

const util = require('util')

const secret = "lmao_we_suck"

// require('firebase/auth');

// var admin = require("firebase-admin");

// var serviceAccount = require("./test-smoke-n-grill-firebase-adminsdk-v1ikj-07e81ae93f.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://test-smoke-n-grill.firebaseio.com"
// });



var db_users = firebase.database().ref().child("User");
var db_admin = firebase.database().ref().child("admin");
// const auth = firebase.auth()


// auth.signInWithEmailAndPassword("mahad@gmail.com", "some_shit94a").then((val) => {
//     auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
//         // Send token to your backend via HTTPS
//         // ...
//         console.log(idToken)
//       }).catch(function(error) {
//         // Handle error
//         console.log(error)
//       });
      
// }).
// catch((err) => console.log(err))

// firebase.auth().signInWithPopup(firebase.auth.GoogleAuthProvider()).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });
  

escapeEmail = utils.escapeEmail
unescapeEmail = utils.unescapeEmail


const login_post_route ='/api/users/login' 
const signup_post_route = '/api/users/signup'

// function create_custom_token(uid){
//     console.log("here")
//     return admin.auth().createCustomToken(uid)
// }

// function create_custom_cookie(idToken){
//     const expiresIn = 60 * 60 * 24 * 5 * 1000;
//     // Create the session cookie. This will also verify the ID token in the process.
//     // The session cookie will have the same claims as the ID token.
//     // To only allow session cookie setting on recent sign-in, auth_time in ID token
//     // can be checked to ensure user was recently signed in before creating a session cookie.
//     return admin.auth().createSessionCookie(idToken, {expiresIn})

// }



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
    data = req.body

    console.log("data " + util.inspect(Object.keys(req.body)[0], false, null, true /* enable colors */))

    if(typeof data == "undefined")
        return

    user_data = {"email": data["email"], "firstName":data["firstName"], "lastName":data["lastName"], 
        "contact_num":data["phone"], "address":data["address"]}

    if(!("isGoogleAcc" in data) || !data["isGoogleAcc"])
        user_data["password"] = data["password"]
    // if(!("isGoogleAcc" in data) || !data["isGoogleAcc"])
    // {
    //     user_data["password"] = data["password"]
    //     user_data["password_set"] = true
    // }

    // else if(first_time)
    //     user_data["password_set"] = false

    

    return user_data
}


function reset_password_customer(req, res)
{
    if(req.locals.cookieValid)
    {
        user_exists(req.locals.uid).then((user_snapshot) =>{
            if(typeof req.body["data"]["password"] == "undefined"){
                res.status(403).send({"data":  {"success" : false, "error" : "Invalid post request format"}})
                return
            }

            if(req.body["data"]["password"] == user_snapshot.val()["password"])
            {
                var user = {...user_snapshot.val(), "password" : req.body["data"]["password"]}
                
                push_user_helper(user["email"], user).then(() => {

                    to_send = {"data" :{"contents" : {"email" :  res.locals.uid, "firstName" : (user["firstName"] || ""), "lastName" : (user["lastName"] || ""), "phone" : (user["contact_no"] || ""), "address" : (user["address"] || "")  }, "success" : true, "error" : "All is well."    }}

                    return res
                    .status(statusCode)
                    .send(JSON.stringify(to_send))
                }).catch(() =>{
                    
                    to_send = {"data" :{"contents" : { }, "success" : false, "error" : "Couldn't change password. Please try again."    }}

                    return res.status(400).send(JSON.stringify(to_send))
                })

                    
            }
            else
            {
                to_send = {"data" :{"contents" : { }, "success" : false, "error" : "Incorrect password."    }}
                return res
                .status(401)
                .send(JSON.stringify(to_send))

            }
        }).catch((err) => {
            to_send = {"data" :{"contents" : { }, "success" : false, "error" : "User accout not found."    }}
            return res.status(404).send(JSON.stringify(to_send))  
        })
    }
    else{
        to_send = {"data" :{"contents" : { }, "success" : false, "error" : "You must be logged in to be able to reset your password."    }}
        return res
        .status(401)
        .send(JSON.stringify(to_send))    
    }
}


function reset_settings_customer(req, res){
    if(req.locals.cookieValid)
    {
        user_exists(req.locals.uid).then((user_snapshot) =>{
            if(typeof req.body["data"] == "undefined"){
                res.status(403).send({"data":  {"success" : false, "error" : "Invalid post request format"}})
                return
            }

            
            var user = {...req.body["data"]}

            user["email"] = res.locals.uid
            user["password"] = user_snapshot.val()["password"]
            
                        
            push_user_helper(user["email"], user).then(() => {

                to_send = {"data" :{"contents" : {"email" :  res.locals.uid, "firstName" : (user["firstName"] || ""), "lastName" : (user["lastName"] || ""), "phone" : (user["contact_no"] || ""), "address" : (user["address"] || "")  }, "success" : true, "error" : "All is well."    }}

                return res
                .status(statusCode)
                .send(JSON.stringify(to_send))
            }).catch(() =>{
                
                to_send = {"data" :{"contents" : { }, "success" : false, "error" : "Couldn't change password. Please try again."    }}

                return res.status(400).send(JSON.stringify(to_send))
            })

                    
            
        }).catch((err) => {
            to_send = {"data" :{"contents" : { }, "success" : false, "error" : "User accout not found."    }}
            return res.status(404).send(JSON.stringify(to_send))  
        })
    }
    else{
        to_send = {"data" :{"contents" : { }, "success" : false, "error" : "You must be logged in to be able to change your settings."    }}
        return res
        .status(401)
        .send(JSON.stringify(to_send))    
    }
}

function signup_post_handler(req, res)
{
    user_data = extract_user_data(req.body);
    push_user(user_data["email"], user_data).then(() => {

        to_send = {"data" :{"contents" : {"email" :  unescapeEmail(user_data["email"]), "firstName" : (user_data["firstName"] || ""), "lastName" : (user_data["lastName"] || ""), "phone" : (user_data["contact_no"] || ""), "address" : (user_data["address"] || "")  }, "success" : true, "error" : "All is well."    }}
          

        email = escapeEmail(user_data["email"])
        const payload = {email}
        const token = jwt.sign(payload, secret, {
            expiresIn : '1h'
        });

        return res.cookie('token', token, {httpOnly : true, secure : true})
        .status(200)
        .send(JSON.stringify(to_send))
    
    }).catch((statusCode) =>{
        to_send = {"data" : {"success" : false , "error" : "User prolly already exists."}}
        return res
        .status(statusCode)
        .send(JSON.stringify(to_send))            
    })
    
}


function login_post_handler_customer(req, res){
    email = ""
    try{
        data = req.body["data"]
        email = data["email"]
    }
    catch(err){
        res.status(403)
        res.send("Wrong format used for post request.")
        return
    }
        
    if(("isGoogleAcc" in data) && (email != "") && data["isGoogleAcc"]){
        user_exists(email).then(() => {}).catch((err) =>{  
            db_users.child(escapeEmail(email)).set({"email" : email, "password_set" : false, "isGoogleAcc" : true})
        });

        email = escapeEmail(email)
        const payload = {email}
        const token = jwt.sign(payload, secret, {
            expiresIn : '1h'
        });

        return res.cookie('token', token, {httpOnly : true, secure : true})
        .status(200)
        .send(JSON.stringify({status : 'success'}))
    }

    else
        password = data["password"]
    
    user_exists(email).then(user_snapshot => {

        if(user_snapshot.val()["password"] == undefined || user_snapshot.val()["password"] != password)
        {
            to_send = {"data" : {"success" : false , "error" : "Incorrect password entered."}}
            return res
            .status(404)
            .send(JSON.stringify(to_send))            
        }
        email = escapeEmail(email)
        const payload = {email}
        const token = jwt.sign(payload, secret, {
            expiresIn : '1h'
        });

        to_send = {"data" :{"contents" : {"email" :  unescapeEmail(email), "firstName" : (user_snapshot.val()["firstName"] || ""), "lastName" : (user_snapshot.val()["lastName"] || ""), "phone" : (user_snapshot.val()["contact_no"] || ""), "address" : (user_snapshot.val()["address"] || "")  }, "success" : true, "error" : "All is well."    }}
        

        return res.cookie('token', token, {httpOnly : true, secure : true})
        .status(200)
        .send(JSON.stringify(to_send))

    }).catch((err)=> {
            to_send = {"data" : {"success" : false , "error" : "Email not found in database."}}
            res.status(404).send(to_send)
        })

}

function login_post_handler_admin(req, res){
    if(!("data" in req.body) || !("username" in req.body["data"]) || !("password" in req.body["data"]) )
        return res.status(403).send(JSON.stringify({"success" : false, "error" : "invalid post request format"}))
    username = req.body["data"]["username"]
    password = req.body["data"]["password"]
    db_admin.once("child", (admin_snap) => {
        if( !(admin_snap.exists()) || !("password" in admin_snap.val()) || admin_snap.val()["password"] != password || admin_snap.val()["username"] != userna)
            return res.status(401).send(JSON.stringify({"success" : false, "error" : "incorrect password"}))
        
        
        const payload = {username}
        const token = jwt.sign(payload, secret, {
            expiresIn : '1h'
            })

        return res.cookie('token', token, {httpOnly : true, secure : true})
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
            res.locals.cookieValid = true
            res.locals.uid = unescapeEmail(decoded.email)
        }
      });
    }
    next()
  }


function admin_middleware(req, res, next){
      if(res.locals.cookieValid){
          if(res.locals.uid == "admin")
            next()
          else
            res.status(401).sendFile()
      }
      else
          res.sendFile()
      
      /*
        do something like sending login file back etc

        will consult with admin side developer before writing code
      */
  }

function customer_middleware(req, res, next){
    console.log("2")
    if(res.locals.cookieValid){
        user_exists(res.locals.uid).then((val) => next()) //if user exists then move to the next middleware function i.e the main request handler
        .catch((val) => { //if user does not exist, set unauthorized cookie boolean to true to hanlde it later in the function
            res.locals.cookieUnauthorized = true; 
            next()
        }) 
          
    }

    

    if(res.locals.cookieMissing) //means is guest user to begin with
    { 
        /*
            just send the data thats being requested except for some routes, which are handled in their respective handlers

            only changes required maybe to set a cookie invisible field. will do after consulting customer side developer
        */
        next()
    } 
    if(res.locals.cookieUnauthorized) //handle unauthorized cookie (either expired or did not belong to a user)
    {
        res.locals.cookieValid = false
        /*
            do something like sending back log file
        */
    }
    

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

module.exports.admin_login_post_handler = login_post_handler_admin
module.exports.admin_login_route = '/admin/api/login'