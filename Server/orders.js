const util = require('util')

var firebase = require('./db_initialize.js')


const db_orders = firebase.database().ref().child("Orders");
const db_local = firebase.database().ref().child("Local")
const db_deliveries_users = firebase.database().ref().child("Deliveries_users")

function getTimeStamp(){
    d = new Date()

    date_in_array = [d.getFullYear(), d.getMonth(), d.getDay(),  d.getHours(),  d.getMinutes(), d.getSeconds(), d.getMilliseconds()]
    
    date_in_array = date_in_array.map( (val) =>{
        val = val.toString()

        if(val.length < 2){
            val = '0' + val
        }
        return val
    })

    return date_in_array.join('')
}




function parse_options_list(item){
    if (!("options" in item)){
        return item
    }

    option_list_names = Object.keys(item["options"])
    option_list_choices = Object.values(item["options"])

    item["option_list_choices"] = []
    added_price = 0

    option_list_names.forEach((list_name, i) => {
        item["option_list_choices"].push({"list_name" : list_name, "option_choice" : option_list_choices[i], "price" : item["optionsPrices"][list_name]} )
        added_price += item["optionsPrices"][list_name]
    });

    return [item, added_price]

}


function parse_item(item){
    [parsed_item, added_price] = parse_options_list(item)
    
    delete parsed_item.options
    delete parsed_item.optionsPrices

    
    return [parsed_item, parsed_item["quantity"] * added_price]
}

function parse_deal(deal){
    parsed_deal = {}
    
    parsed_deal["name"] = deal["name"]
    parsed_deal["price"] = deal["price"]
    parsed_deal["id"] = deal["id"]
    parsed_deal["items"] = []
    parsed_deal["quantity"] = deal["quantity"]

    total_added_price = 0

    deal["items"].forEach(item => {
        [parsed_item, added_price] = parse_item(item)
        parsed_deal["items"].push(parsed_item)

        total_added_price += added_price
    })

    return [parsed_deal, deal["quantity"] * total_added_price]
}

function is_item(obj){
    if(!("items" in obj)){
        return true
    }
}




function parse_order(order){

    parsed_order = {}
    parsed_order["email"] = order["user"]
    parsed_order["contact_no"] = order["phone"]
    parsed_order["address"] = order["address"]
    parsed_order["items"] = []
    parsed_order["deals"] = []
    parsed_order["price"] = 0
    parsed_order["status"] = "0"
    
    if(!("type" in parsed_order))
        parsed_order["type"] = "1"


    order["orders"].forEach(obj =>{
        
        if(!("quantity" in obj))
            obj["quantity"] = 1
            
        else
            obj["quantity"] = parseInt(obj["quantity"])
        


        if(!is_item(obj)){
            [deal, added_price] = parse_deal(obj)
            parsed_order["deals"].push(deal)
            
        }
        else{
            [item, added_price] = parse_item(obj)
            parsed_order["items"].push(item)
        }

        parsed_order["price"] += ( (obj["price"] * obj["quantity"]) + added_price)
    })

    return parsed_order
}



// console.log(util.inspect(parse_order(request["data"]), false, null, true /* enable colors */))

function post_handler(req, res){
    if(!("data" in req.body))
    {
        res.status(403)
        res.send("Error: Possibly incorrect format for post request.")
    }


    try{
        parsed_order = parse_order(req.body["data"])
    }
    catch(err){
        res.status(403)
        res.send("Err: Possibly incorrect format for post request")
    }

    parsed_order["id"] = getTimeStamp()
    parsed_order["time"] = new Date().getTime()



    db_orders.child(parsed_order["id"]).set(parsed_order)

    if(parsed["type"] == "1")
        db_deliveries_users.child(parsed_order["email"]).child(parsed_order["id"]).set(parsed_order)
    else
        db_local.child(parsed_order["id"]).set(parsed_order)
    
    res.status(403)
    res.send("Order placed successfully!")
    
}


const route = '/api/orders'



function get_local_handler(req, res){
    if(typeof req.query.status != 'undefined'){
        status = req.query.status
        console.log(status)

        db_orders.orderByChild("status").equalTo(status).once("value", (db_snapshot) => {
            res.send({"data" : db_snapshot.val()})
        })
    }
    else{
        db_orders.once("value", (db_snapshot) => {
            res.send( {"data" : db_snapshot.val()} )
        })
    }
}

function get_handler(req, res){
    db_ref = db_orders

    if(typeof req.query.type != 'undefined' && parseInt(req.query.type) == 1)
        db_ref = db_local

    try{
        if(typeof req.query.email != 'undefined' && firebase.database().ref().hasChild("Deliveries_users") && db_deliveries_users.hasChild(req.params.email))
            db_ref = db_deliveries_users.child(req.params.email)
    }catch(err){
        
    }
    
    
    if(typeof req.query.status != 'undefined'){
        status = req.query.status
        db_ref.orderByChild("status").equalTo(status).once("value", (db_snapshot) =>{
            res.send( {"data" : db_snapshot.val()})
        })
    }
    else{
        db_ref.once("value", (db_snapshot) =>{
            res.send({"data" : db_snapshot.val()} )
        })
    }
}


module.exports.post_handler = post_handler
module.exports.get_handler = get_handler
module.exports.route = route