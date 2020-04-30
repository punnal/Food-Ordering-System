var firebase = require('./db_initialize.js')
var utils = require('./utils.js')

var db_deals = firebase.database().ref().child("Deals");



function get_handler(req, res){
    db_deals.once("value", (deals_snapshot) => {
        res.send(deals_snapshot.val())
    })
}


module.exports.get_handler = get_handler
module.exports.route = '/api/deals'