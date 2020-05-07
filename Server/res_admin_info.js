var firebase = require('./db_initialize.js')

const db_admin = firebase.database().ref().child("admin");
const db_contact_us = firebase.database().ref().child("ContactUs");
const db_restaurant_info = firebase.database().ref().child("RestaurantInformation")


function post_handler_contact_us(req, res){
    var contactus_details = {...req.body["data"]}

    db_contact_us.set(contactus_details).then(() => res.status(200).send(JSON.stringify({"data" : {}, "cookieValid" : "valid"}  )))
    .catch(() => res.status(404).send(JSON.stringify({"data" : {}, "cookieValid" : "valid"})))    
}

function get_handler_contact_us(req, res){
    var cookieValid = "valid"

    if(res.locals.cookieValid)
        cookieValid = "valid"
    else if(!res.locals.cookieValid && res.locals.cookieMissing)
        cookieValid = "missing"
    else
        cookieValid = "invalid"


    db_contact_us.once("value", (admin_snapshot) =>{ res.status(200).send({"data" : admin_snapshot.val() || {}, "cookieValid" : cookieValid } ) })
    .catch(() => res.status(404).send(JSON.stringify({"data" : {}, "cookieValid" : cookieValid })))
}


function post_handler_settings(req, res){

    db_admin.once("value").then((admin_snapshot) => {
        if(req.body["data"]["password"] == admin_snapshot.val()["password"])
        {
            db_admin.set({"username" : req.body["username"], "password" : req.body["newPassword1"]}).then(() => {
                var rest_info = {...req.body["data"]}
                delete rest_info.username
                delete rest_info.password
                delete rest_info.newPassword1
                delete rest_info.newPassword2
                
                db_restaurant_info.set(rest_info).then(() => res.status(200).send(JSON.stringify({"data" : {}, "cookieValid" : "valid" })))
                .catch(() => res.status(404).send(JSON.stringify({"data" : {}, "cookieValid" : "valid"})) )
            
            }).catch(() => res.status(404).send(JSON.stringify({"data" : {}, "cookieValid" : "valid"})) )
        }
        else
            res.status(401).send(JSON.stringify({"data" : {}, "cookieValid" : "valid"}))

    })
}


function get_handler_res_info(req, res){
    var cookieValid = "valid"

    if(res.locals.cookieValid)
        cookieValid = "valid"
    else if(!res.locals.cookieValid && res.locals.cookieMissing)
        cookieValid = "missing"
    else
        cookieValid = "invalid"

    db_restaurant_info.once("value", (res_snapshot) =>{ res.status(200).send({"data" : res_snapshot.val() || {}, "cookieValid" : cookieValid } ) })
    .catch(() => res.status(404).send(JSON.stringify({"data" : {}, "cookieValid" : cookieValid })))
}



module.exports.route_contact_us = '/api/contactus'
module.exports.get_handler_contact_us = get_handler_contact_us
module.exports.post_handler_contact_us = post_handler_contact_us

module.exports.route_res_info = '/api/settings'
module.exports.get_handler_res_info = get_handler_res_info
module.exports.post_handler_settings = post_handler_settings


// /api/admin/contactus

// /api/admin/settings

