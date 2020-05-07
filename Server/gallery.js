var firebase = require('./db_initialize.js')
var db_gallery = firebase.database().ref().child("Gallery");

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

function parse_gallery_post(req){
    return new Promise(function(resolve, reject){
        
        var gallery_data = req.body["data"]
        if(typeof gallery_data == 'undefined')
            reject(403)

        Object.keys(gallery_data).forEach((type_of_operation) => {
            var gallery_data_item = gallery_data[type_of_operation]
            if(type_of_operation == "add" ){
                gallery_data_item["id"] = getTimeStamp()
                
                db_gallery.child(gallery_data_item["id"]).set(gallery_data_item).then(() => resolve(200)).catch((err) => reject(404))
                
            }
            else if(type_of_operation == "delete")
                if("id" in gallery_data_item)
                    db_gallery.child(gallery_data_item["id"]).remove().then(() => resolve(200)).catch((err)=> reject(404))
                else
                    reject(403)
            else
                reject(403)
        })
    })
}

function post_handler(req, res){
    parse_gallery_post(req).then((statusCode) => res.status(statusCode).send(JSON.stringify({"data" :  {}, "cookieValid" : "valid"})))
    .catch((statusCode) => res.status(statusCode).send(JSON.stringify({"data" :  {}, "cookieValid" : "valid"})))
}

function get_handler(req, res){
    var cookieValid = "valid"

    if(res.locals.cookieValid)
        cookieValid = "valid"
    else if(!res.locals.cookieValid && res.locals.cookieMissing)
        cookieValid = "missing"
    else
        cookieValid = "invalid"

    
    db_gallery.once("value", (gallrey_snapshot) =>{ res.status(200).send(JSON.stringify( {"data" : Object.values(gallrey_snapshot.val()), "cookieValid" : cookieValid }  )) })
}

route = '/api/gallery'

module.exports.route = route
module.exports.get_handler = get_handler
module.exports.post_handler = post_handler