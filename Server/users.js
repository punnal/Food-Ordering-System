
var firebase = require('./db_initialize.js')

var utils = require('./utils.js')

var db_users = firebase.database().ref().child("User");

escapeEmail = utils.escapeEmail
unescapeEmail = utils.unescapeEmail


const login_post_route ='/api/users/login' 
const signup_post_route = '/api/users/signup'


function user_exists(email){
    return new Promise(function (resolve, reject) {
        db_users.orderByKey().equalTo(escapeEmail(email)).once("value", function(snapshot) {
            console.log("snapshot val: ", snapshot.val())
            if(!snapshot.exists())
            {
                resolve([false, null])
            }
            else{
                resolve([true, snapshot])
            }
            
        });
    });
}


function push_user_helper(key, to_push)
{
    db_users.child(escapeEmail(key)).set(to_push).then(()=>{
        return 200
    })
    .catch((error)=>{
        return 404
    });
}

function push_user(key, to_push){
    userExists = false
    userExists, _ = user_exists(key)

    if(!userExists){
        return push_user_helper(key, to_push)
    }
    else{
        return 400
    }
}

function extract_user_data(req)
{
    data = req.body["data"]
    user_data = {"email": data["email"], "password":data["password"], "firstName":data["firstName"], "lastName":data["lastName"], 
    "contact_num":data["contact_num"], "isGoogleAcc":data["isGoogleAcc"]}

    return user_data
}

function signup_post_handler(req, res)
{
    // try{
    user_data = extract_user_data(req);
    console.log(user_data)
    res.statusCode = push_user(user_data["email"], user_data)

    if(res.status == 400){
        res.send("User already exists in database.")
    }
        else if(res.status == 404){
        res.send("Unexpected error...could not push user to the database.")
    }
    else if(res.status == 200){
        res.send("User entry made. Sign up successful!")
    }
}

function login_post_handler(req, res){
    try{
        console.log(req.body)
        data = req.body["data"]
        email = data["email"]
        password = data["password"]
    }
    catch(err){
        res.statusCode = 403
        res.send("Wrong format used for post request.")
    }
    
    
    user_exists(email).then(result => {
        userExists = result[0]
        user_snapshot = result[1].val()
        console.log(user_snapshot)
        if(!userExists){
            res.statusCode = 400
            res.send("Login failed. Email not found in database.")
        }

        else{
            if(!(user_snapshot[escapeEmail(email)]["password"] == password)){
                res.statusCode = 403
                res.send("Login failed. Wrong password entered.")
            }
            else{
                res.statusCode = 200
                res.send("Logged in successfuly!")
            }
        }

    })

    
    
    
}

module.exports.login_post_handler = login_post_handler
module.exports.signup_post_handler = signup_post_handler

module.exports.login_post_route = login_post_route
module.exports.signup_post_route = signup_post_route
