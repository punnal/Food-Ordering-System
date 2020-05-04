var firebase = require('./db_initialize.js')
var db_aboutus = firebase.database().ref().child("AboutUs");

function parse_aboutus_post(req){
    return new Promise(function(resolve, reject){
        
        var about_us_obj = req.body["data"]
        if(typeof about_us_obj == 'undefined')
            reject(403)

        Object.keys(about_us_obj).forEach((type_of_operation) => {
            var about_us = about_us_obj[type_of_operation]
            if(type_of_operation == "edit" ){     
                if(!("heading" in about_us && "body" in about_us))
                    reject(403)           
                db_aboutus.set(about_us).then(() => resolve(200)).catch((err) => reject(404))
            }            
            else
                reject(403)
        })
    })
}

function post_handler(req, res){
    parse_aboutus_post(req).then((statusCode) => res.status(statusCode).send("Update Successsful"))
    .catch((statusCode) => res.status(statusCode).send("Update unsuccessful :(. Please check response status."))
}

function get_handler(req, res){
    db_aboutus.once("value", (aboutus_snapshot) =>{ res.status(200).send({"data" : aboutus_snapshot.val()} ) })
}

route = '/api/aboutus'

module.exports.route = route
module.exports.get_handler = get_handler
module.exports.post_handler = post_handler