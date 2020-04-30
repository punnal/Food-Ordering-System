var firebase = require('./db_initialize.js')
var utils = require('./utils.js')

var snapshotToArray = utils.snapshotToArray



var db_menu = firebase.database().ref().child("Menu");


route = '/api/menu'
var menu_by_category = {"Mains" : {}, "Extras" : {}, "Drinks" : {}}
var menu = {}


category_int_to_str = {0:"Mains", 1:"Extras", 2:"Drinks"}
category_str_to_int = {"Mains":0, "Extras":1, "Drinks":2}

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


function conv_back_options_lists(item_data){
    
    options_lists = item_data["options_lists"]
    item_data["options_lists"] = {}
    
    options_lists.forEach((options_list) => { 
        item_data["options_lists"][Object.keys(options_list)[0]] = Object.values(options_list)[0] 
    });

    return item_data
}



function parse_menu_post(req){ //parses the req object and does the neccessary formatting

    var menu_data = req.body["data"]

    return new Promise(function(resolve, reject){
        Object.keys(menu_data).forEach((type_of_operation) => {
            item_data = menu_data[type_of_operation]
            if(type_of_operation == "edit" || type_of_operation == "add"){
                if(type_of_operation == "add"){
                    item_data["id"] = getTimeStamp()
                }
    
                item_data = conv_back_options_lists(item_data)
                
                if("id" in item_data){
                    try
                    {
                        db_menu.child(item_data["id"]).set(item_data, () =>{
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
                if("id" in item_data)
                {
                    try{
                        db_menu.child(item_data["id"]).remove(() =>{
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

}
    





function post_handler(req){
    
    menu_item_op_promise = parse_menu_post(req).then((statusCode) => {
        res.statusCode = statusCode
        res.send("Update successful!")
    })
    .catch((statusCode) =>{
        res.statusCode = statusCode
        res.send("Could not make the changes. (Hint: Maybe you are deleting/editing an id that does not exist?)")
    })
}

function get_handler(req, res){
    res.send(JSON.stringify({"data" : menu_by_category}))
}






db_menu.on("child_added", (child_snapshpt) =>{
    category = child_snapshpt.val()["category"]
    item_data = child_snapshpt.val()

    category = category_int_to_str[parseInt(category)]


    item_data = conv_options_lists(item_data)

    menu_by_category[category][item_data["id"]] = {}
    
    menu_by_category[category][item_data["id"]] = item_data
    menu[item_data["id"]] = item_data

}) 


db_menu.on("child_removed", (child_snapshpt) => {

    if(child_snapshpt)
    {
        deleted_item = child_snapshpt.val()
        category =  category_int_to_str[parseInt(deleted_item["category"])]

        menu_by_category.category
        
        id = deleted_item["id"]

        delete menu_by_category[category][id]
        delete menu[id]
    }
    
})


db_menu.on("child_changed", (child_snapshot) => {
    
    changed_item = child_snapshot.val()

    id = changed_item["id"]

    prev_category = category_int_to_str[parseInt(menu[changed_item["id"]]["category"])]
    category = category_int_to_str[parseInt(changed_item["category"])]


    changed_item = conv_options_lists(changed_item)

    
    delete menu_by_category[prev_category][id]

    menu_by_category[category][id] = changed_item
    menu[id] = changed_item
})


module.exports.get_handler = get_handler
module.exports.route = route

module.exports.post_handler = post_handler