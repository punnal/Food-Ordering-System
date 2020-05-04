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



function get_handler(req, res){
    db_deals.once("value", (deals_snapshot) => {
        var all_deals = deals_snapshot.val()
        Object.values(deals_snapshot.val()).forEach((deal) => {
            if(!("items" in deal))
                return

            deal["items"].forEach((item) => {
                if(!("options_lists" in item)){
                    item["options_lists"] = [] 
                }
            }) 
         })
        res.send(JSON.stringify({"data" : all_deals})).status(200)
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
                    
                    var item_quantities = {}

                    deal_data["items"].forEach((item_id) => {
                        if(!(item_id in item_quantities))
                            item_quantities[item_id] = 1
                        else
                            item_quantities[item_id] = item_quantities[item_id] + 1 
                    })
                                        
                    deal_data["items"] = []
                    Object.keys(item_quantities).forEach((item_id) =>{
                        if(item_id in items)
                        {
                            var item = items[item_id]

                            delete item.photo_url
                            delete item.description
                            delete item.price
                            
                            item["quantity"] = item_quantities[item_id]

                            deal_data["items"].push(item)                            
                        }
                        else
                            reject(404)
                        
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


module.exports.get_handler = get_handler
module.exports.post_handler = post_handler
module.exports.route = '/api/deals'