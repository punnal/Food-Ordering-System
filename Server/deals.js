var firebase = require('./db_initialize.js')
var utils = require('./utils.js')

var db_deals = firebase.database().ref().child("Deals");
var db_menu = firebase.database().ref().child("Menu");


function getTimeStamp(){
    const d = new Date()
    date_in_array = [d.getFullYear(), d.getMonth(), d.getDay(),  d.getHours(),  d.getMinutes(), d.getSeconds(), d.getMilliseconds()]
    date_in_array = date_in_array.map( (val) =>{
        val = val.toString()
        if(val.length < 2)
            val = '0' + val
        return val
    })
    if(date_in_array[6].length < 3)
        date_in_array[6] = '0' + date_in_array[6]
 
    return date_in_array.join('')
}



function get_handler_customer(req, res){
    db_menu.once("value", (menu_snapshot) => {
        const items = menu_snapshot.val()

        db_deals.once("value", (deals_snapshot) => {
            var all_deals = deals_snapshot.val()
            Object.values(deals_snapshot.val()).forEach((deal, i) => {
                
                if(!("items" in deal) || !("id" in deal)) 
                   return
    
                var parsed_deal = {...deal}
                parsed_deal["items"] = []

                var deal_faulty = false
    
                deal["items"].forEach((item_meta_data) => {
                    if(!(item_meta_data["id"] in items))
                    {
                        db_deals.child(deal["id"]).remove()
                        deal_faulty = true

                        return
                    }
                    item = items[item_meta_data["id"]]

                    if(!("options_lists" in item))
                        item["options_lists"] = [] 
                    
                    item["quantity"] = 1

                    delete item.photo_url
                    delete item.description
                    delete item.price
    
                    parsed_deal["items"] = parsed_deal["items"].concat(Array(parseInt(item_meta_data["quantity"])).fill(item))
    
                })
                if(!deal_faulty)
                    all_deals[Object.keys(deals_snapshot.val())[i]] = parsed_deal  
                
            })
            res.send(JSON.stringify({"data" : all_deals})).status(200)
        })    
    })
    
}


function get_handler_admin(req, res){
    db_menu.once("value", (menu_snapshot) => {
        const items = menu_snapshot.val()

        db_deals.once("value", (deals_snapshot) => {
            var all_deals = deals_snapshot.val()
            Object.values(deals_snapshot.val()).forEach((deal, i) => {
                
                if(!("items" in deal) || !("id" in deal)) 
                   return
    
                var parsed_deal = {...deal}
                parsed_deal["items"] = []

                var deal_faulty = false
    
                deal["items"].forEach((item_meta_data) => {
                    if(!(item_meta_data["id"] in items))
                    {
                        db_deals.child(deal["id"]).remove()
                        deal_faulty = true

                        return
                    }
                    item = items[item_meta_data["id"]]

                    if(!("options_lists" in item))
                        item["options_lists"] = [] 
                    
                    item["quantity"] = parseInt(item_meta_data["quantity"])

                    delete item.photo_url
                    delete item.description
                    delete item.price
    
                    parsed_deal["items"].push(item)
    
                })
                if(!deal_faulty)
                    all_deals[Object.keys(deals_snapshot.val())[i]] = parsed_deal  
                
            })
            res.send(JSON.stringify({"data" : all_deals})).status(200)
        })    
    })
}

function deal_parse_post(req){
    return new Promise(function(resolve, reject){

        var deal_data = req.body["data"]
        
        if(typeof deal_data == 'undefined')
            reject(403)

        db_menu.once("value", (menu_snapshot) =>{

            if(!menu_snapshot.exists())
                reject(400)
            
            const items = menu_snapshot.val()

            Object.keys(deal_data).forEach((type_of_operation) => {
                deal_data = deal_data[type_of_operation]
                
                if(type_of_operation == "edit" || type_of_operation == "add"){
                    if(type_of_operation == "add")
                        deal_data["id"] = getTimeStamp()

                    if(!("items" in deal_data))
                        reject(403)
                    
                 
                    var item_quantities = deal_data["items"].reduce(function(obj, item_id) {
                        obj[item_id] = ++obj[item_id] || 1;
                        return obj;
                    }, {});

                    deal_data["items"] = []
                    Object.keys(item_quantities).forEach((item_id) =>{
                        var item = {"id" : item_id}
                        item["quantity"] = item_quantities[item_id]

                        deal_data["items"].push(item)                            
                    })
                    
                    if("id" in deal_data)
                        db_deals.child(deal_data["id"]).set(deal_data).then(() => resolve(200)).catch((err)=> reject(404))
        
                }
                else if(type_of_operation == "delete")
                    if("id" in deal_data)
                        db_deals.child(deal_data["id"]).remove().then(() => resolve(200)).catch((err) => reject(404))
            })
        })

        
    })
}

function post_handler(req, res){
    deal_parse_post(req).then((statusCode) => {
        res.send("Changes made successfully!").status(200)
    })
    .catch((statusCode) =>{
        res.status(statusCode)

        if(statusCode == 403)
            res.send("Please check post request again.")
        
        else if(statusCode == 400)
            res.send("Couldn't fetch the list of menu items. Please check if there are items stored in the database.")
        
        else if(statusCode == 404)
            res.send("Check if the item you are trying to edit/add/delete exists.")
    })
}


var a = [1,2,3,1,2,3,4];

var map = a.reduce(function(obj, b) {
  obj[b] = ++obj[b] || 1;
  return obj;
}, {});

console.log(map)

module.exports.get_handler = get_handler_customer
module.exports.post_handler = post_handler

module.exports.get_handler_admin = get_handler_admin
module.exports.route = '/api/deals'