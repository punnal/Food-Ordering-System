var firebase = require('./db_initialize.js')
var utils = require('./utils.js')

var db_deals = firebase.database().ref().child("Deals");
var db_menu = firebase.database().ref().child("Menu");


function getTimeStamp(){
    const d = new Date()
    return [d.getFullYear(), d.getMonth(), d.getDay(),  d.getHours(),  d.getMinutes(), d.getSeconds(), d.getMilliseconds()].map( (val) =>{
        if(val.toString().length < 2)
            return '0' + val.toString()
    }).join('')
}



function get_handler(req, res){
    db_deals.once("value", (deals_snapshot) => {
        var all_deals = deals_snapshot.val()
        Object.values(deals_snapshot.val()).forEach((deal) => {
            deal["items"].forEach((item) => {
                if(!("options_lists" in item)){
                    all_deals["options_lists"] = [] 
                }
            }) 
         })
        res.send(JSON.stringify({"data" : all_deals}))
    })
}

function conv_options_lists(item_data){
    
    if (!("options_lists" in item_data)){
        item_data["options_lists"] = []
    }
    else{
        var options_lists_object = item_data["options_lists"]
        var options_lists_list = Object.keys(options_lists_object).map(function(option_list_name) {
            return {[option_list_name] : options_lists_object[option_list_name]};
        });

        item_data["options_lists"] = options_lists_list
    }

    return item_data
}


function deal_parse_post(req){
    return new Promise(function(resolve, reject){

        var deal_data = req.body["data"]
        
        if(typeof deal_data == 'undefined'){
            reject(403)
        }

        
        db_menu.once("value", (menu_snapshot) =>{

            if(!menu_snapshot.exists()){
                reject(400)
            }
            const items = menu_snapshot.val()

            Object.keys(deal_data).forEach((type_of_operation) => {
                deal_data = deal_data[type_of_operation]
                
                if(type_of_operation == "edit" || type_of_operation == "add"){
                    if(type_of_operation == "add"){
                        deal_data["id"] = getTimeStamp()
                    }

                    if(!"items" in deal_data){
                        reject(403)
                    }
        
                    deal_data["items"] = deal_data["items"].map((item_id) =>{
                        if(item_id in items)
                        {
                            var item = items[item_id]

                            delete item.photo_url
                            delete item.description
                            delete item.price
                            
                            item = conv_options_lists(item)

                            return item
                        }
                        else
                        {
                            reject(404)
                        }    
                    })
                    
                    
                    if("id" in deal_data){
                        try
                        {
                            db_deals.child(deal_data["id"]).set(deal_data, () =>{
                                resolve(200)
                            })
                        }
                        catch(err)
                        {
                            reject(404)
                        }   
                    }
        
                }
                else if(type_of_operation == "delete"){
                    if("id" in deal_data)
                    {
                        try{
                            db_deals.child(deal_data["id"]).remove(() =>{
                                resolve(200)
                            })
                        }
                        catch(err)
                        {
                            reject(404)
                        }
                        
                    }
                }
                
            })
        })

        
    })
}

function post_handler(req, res){
    deal_parse_post(req).then((statusCode) => {
        res.statusCode = statusCode
        res.send("Changes made successfully!")
    })
    .catch((statusCode) =>{
        res.statusCode = statusCode

        if(statusCode == 403)
        {
            res.send("Please check post request again.")
        }
        else if(statusCode == 400)
        {
            res.send("Couldn't fetch the list of menu items. Please check if there are items stored in the database.")
        }
        else if(statusCode == 404)
        {
            res.send("Check if the item you are trying to edit/add/delete exists.")
        }

    })
}


module.exports.get_handler = get_handler
module.exports.post_handler = post_handler
module.exports.route = '/api/deals'