const util = require('util')
example_data = 
{
  "data" : {
    "20200401183724788" : {
      "address" : "Lums",
      "contact_no" : "03030013191",
      "email" : "guest",
      "id" : "20200401183724788",
      "items" : [ {
        "cartNotFull" : false,
        "id" : 41,
        "name" : "big burger",
        "option_list_choices" : [ {
          "list_name" : "Sauce",
          "option_choice" : "Honey mustard",
          "price" : 20
        }, {
          "list_name" : "Add-on",
          "option_choice" : "Mushrooms",
          "price" : 50
        } ],
        "price" : 999,
        "quantity" : 1,
        "showPopup" : true,
        "type" : "Menu",
        "visible" : false
      } ],
      "price" : 1069,
      "status" : "0",
      "time" : 1588599444789,
      "type" : "1"
    },
    "20200401210910925" : {
      "address" : "Lums",
      "contact_no" : "0303-1234567",
      "email" : "guest",
      "id" : "20200401210910925",
      "items" : [ {
        "cartNotFull" : false,
        "id" : "5",
        "name" : "Better Name",
        "option_list_choices" : [ {
          "list_name" : "Flavour",
          "option_choice" : "Jalapeno",
          "price" : "0"
        }, {
          "list_name" : "Topping",
          "option_choice" : "Cheese Slice",
          "price" : "30"
        } ],
        "price" : "150",
        "quantity" : 2,
        "showPopup" : true,
        "type" : "Menu",
        "visible" : false
      } ],
      "price" : 360,
      "status" : "0",
      "time" : 1588608550925,
      "type" : "1"
    },
    "20200401211824743" : {
      "address" : "Lums",
      "contact_no" : "0303-1234567",
      "email" : "guest",
      "id" : "20200401211824743",
      "items" : [ {
        "cartNotFull" : false,
        "id" : "6",
        "name" : "Wrap",
        "option_list_choices" : [ {
          "list_name" : "Flavour",
          "option_choice" : "BBQ",
          "price" : "0"
        }, {
          "list_name" : "Topping",
          "option_choice" : "Cheese Slice",
          "price" : "30"
        } ],
        "price" : "150",
        "quantity" : 2,
        "showPopup" : true,
        "type" : "Menu",
        "visible" : false
      } ],
      "price" : 360,
      "status" : "0",
      "time" : 1588609104743,
      "type" : "1"
    }
  },

}



function parse_orders(orders){
  
    orders = Object.values(orders["data"]).map((order_obj, i) => {
       order_obj["orders"] = []
       if ("items" in order_obj) 
       {
           order_obj["items"].forEach((item) =>{
             item["options"] = {}
             item["optionsPrices"] = {}
             if("option_list_choices" in item){
               item["option_list_choices"].forEach((choice) => {
                 item["options"][choice["list_name"]] = choice["option_choice"]
                 item["optionsPrices"][choice["list_name"]] = choice["price"]
               })
             }
           delete item.option_list_choices
           item["type"] = "Menu"
           order_obj["orders"].push(item)
         })
       }
 
       if ("deals" in order_obj) 
       {
         order_obj["deals"].forEach((deal) =>{
           var deal_items = deal["items"]
           deal["items"] = []
           deal_items.forEach((item) => {
             item["options"] = {}
             item["optionsPrices"] ={}
             if("option_list_choices" in item){
               item["option_list_choices"].forEach((choice) => {
                 item["options"][choice["list_name"]] = choice["option_choice"]
                 item["optionsPrices"][choice["list_name"]] = choice["price"]
               })
             }
             delete item.option_list_choices
             deal["items"].push(item)
           })
           deal["type"] = "Deal"
           order_obj["orders"].push(deal)  
         })
       }
 
       delete order_obj.deals
       delete order_obj.items
       return order_obj
    })
 
    return orders
 }
 

console.log(util.inspect(parse_orders(example_data), false, null, true /* enable colors */))











OUTPUT = 
[
  {
    address: 'Model town',
    contact_no: '03004950280',
    email: 'papa_ki_princess@gmail.com',
    id: '129590596',
    status: '0',
    time: '129590596',
    type: '0',
    orders: [
      {
        id: '40',
        name: 'cheese burger',
        quantity: '1',
        options: { sauce: 'chipotole', 'add-ons': 'jalepenos' },
        optionsPrices: { sauce: '50', 'add-ons': '60' },
        type: 'menu'
      },
      {
        id: '40',
        name: 'cheese burger',
        quantity: '3',
        options: { sauce: 'garlic mayo', 'add-ons': 'olives' },
        optionsPrices: { sauce: '80', 'add-ons': '90' },
        type: 'menu'
      },
      {
        id: '58',
        items: [
          {
            id: '40',
            name: 'cheese burger',
            options: { sauce: 'jalepenos' },
            optionsPrices: { sauce: 60 }
          },
          {
            id: '42',
            name: 'fries',
            options: { Type: 'curly' },
            optionsPrices: { Type: '40' }
          }
        ],
        name: 'big mega deal',
        price: '450',
        quantiy: '3',
        type: 'deal'
      }
    ]
  },
  {
    address: 'Model town',
    contact_no: '03004950280',
    email: 'papa_ki_princess@gmail.com',
    id: '129590596',
    status: '0',
    time: '129590596',
    type: '1',
    orders: [
      {
        id: '40',
        name: 'cheese burger',
        quantity: '2',
        options: { sauce: 'chipotole', 'add-ons': 'jalepenos' },
        optionsPrices: { sauce: '50', 'add-ons': '60' },
        type: 'menu'
      },
      {
        id: '40',
        name: 'cheese burger',
        quantity: '2',
        options: { sauce: 'garlic mayo', 'add-ons': 'olives' },
        optionsPrices: { sauce: '80', 'add-ons': '90' },
        type: 'menu'
      },
      {
        id: '58',
        items: [
          {
            id: '40',
            name: 'cheese burger',
            options: { sauce: 'jalepenos' },
            optionsPrices: { sauce: 60 }
          },
          {
            id: '42',
            name: 'fries',
            options: { Type: 'curly' },
            optionsPrices: { Type: '40' }
          }
        ],
        name: 'big mega deal',
        price: '450',
        quantity: '2',
        type: 'deal'
      }
    ]
  }
]
    