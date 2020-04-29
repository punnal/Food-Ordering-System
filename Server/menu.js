var firebase = require('./db_initialize.js')
var utils = require('./utils.js')

var snapshotToArray = utils.snapshotToArray



var db_menu = firebase.database().ref().child("Menu");


route = '/api/menu'
var menu_by_category = {"Mains" : {}, "Extras" : {}, "Drinks" : {}}
var menu = {}


category_int_to_str = {0:"Mains", 1:"Extras", 2:"Drinks"}
category_str_to_int = {"Mains":0, "Extras":1, "Drinks":2}


function parse_menu(req, res){
    var menu_data = JSON.stringify(req.body)
    photo_url = menu_data["photo_url"]
}


function post_handler(req, res){
    var menu_data = JSON.parse(req.body)

    menu_data = menu_data["data"]

    menu_data["id"] = Object.values(menu_by_category)
    

}

function get_handler(req, res){
    res.send(JSON.stringify({"data" : menu_by_category}))
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

