var firebase = require('./db_initialize.js')
var util = require('util')

var db_menu = firebase.database().ref().child("Menu");

route = '/api/menu'
const jwt = require('jsonwebtoken')
const secret = "lmao_we_suck"


category_int_to_str = {0:"Mains", 1:"Extras", 2:"Drinks"}
category_str_to_int = {"Mains":0, "Extras":1, "Drinks":2}

function getTimeStamp(){
    d = new Date()

    date_in_array = [d.getFullYear(), d.getMonth(), d.getDay(),  d.getHours(),  d.getMinutes(), d.getSeconds(), d.getMilliseconds()]
    
    date_in_array = date_in_array.map( (val) =>{
        val = val.toString()

        if(val.length < 2)
            val = '0' + val
        return val
    })

    return date_in_array.join('')
}

function parse_menu_post(req){ //parses the req object and does the neccessary formatting
    return new Promise(function(resolve, reject){
        
        var menu_data = req.body["data"]
        if(typeof menu_data == 'undefined')
            reject(403)

        Object.keys(menu_data).forEach((type_of_operation) => {
            var item_data = menu_data[type_of_operation]
            if(type_of_operation == "edit" || type_of_operation == "add"){
                if(type_of_operation == "add")
                    item_data["id"] = getTimeStamp()

                if(!("category" in item_data))
                    reject(403)
                
                item_data["category"] = item_data["category"].toString()
                                
                if("id" in item_data)
                    db_menu.child(item_data["id"]).set(item_data).then(() => resolve(200)).catch((err) => reject(404))
                
            }
            else if(type_of_operation == "delete")
                if("id" in item_data)
                    db_menu.child(item_data["id"]).remove().then(() => resolve(200)).catch((err)=> reject(404))
        })
    })

}

function post_handler(req, res){
    
    menu_item_op_promise = parse_menu_post(req).then((statusCode) => {
        res.status(statusCode).send("Update successful!")
    })
    .catch((statusCode) =>{
        res.status(statusCode).send("Could not make the changes. (Hint: Maybe you are deleting/editing an id that does not exist?)")
    })
}


function parse_menu_by_category(){
    all_promises =Object.keys(category_int_to_str).map((category_int) => {
        return new Promise(function(resolve, reject){
            db_menu.orderByChild("category").equalTo(category_int.toString()).once("value", (db_snapshot) => {
                if(db_snapshot.exists())
                {
                    val = db_snapshot.val()
                    if(Array.isArray(val))
                        val = {...db_snapshot.val()}
                    Object.keys(val).forEach(key => val[key] === undefined && delete val[key])
                    resolve({[category_int_to_str[category_int]] : val})
                }
                else   
                    resolve({[category_int_to_str[category_int]] : {}})
            })
        })  
    })

    return Promise.all(all_promises)
}

function get_handler(req, res){
    to_send = {"data" : {}}
    parse_menu_by_category().then((results) => {
        results.forEach((result) =>  to_send["data"][Object.keys(result)[0]] = Object.values(result)[0])
        res.send(JSON.stringify(to_send)).status(200)
    })
}

module.exports.get_handler = get_handler
module.exports.route = route
module.exports.post_handler = post_handler