const util = require('util')
example_data = 
{
    "data" : {

      "129590523" : {
        "address" : "Model town",
        "contact_no" : "03004950280",
        "deals" : [ {
          "id" : "58",
          "items" : [ {
            "id" : "40",
            "name" : "cheese burger",
            "options_lists" : [ {
              "list_name" : "sauce",
              "option_choice" : "chipotole",
              "price" : 50
            }, {
              "list_name" : "sauce",
              "option_choice" : "jalepenos",
              "price" : 60
            } ]
          }, {
            "id" : "42",
            "name" : "fries",
            "options_lists" : [ {
              "list_name" : "Type",
              "option_choice" : "curly",
              "price" : "40"
            } ]
          } ],
          "name" : "big mega deal",
          "price" : "450",
          "quantiy" : "3"
        } ],
        "email" : "papa_ki_princess@gmail.com",
        "id" : "129590596",
        "items" : [ {
          "id" : "40",
          "name" : "cheese burger",
          "options_lists" : [ {
            "list_name" : "sauce",
            "option_choice" : "chipotole",
            "price" : "50"
          }, {
            "list_name" : "add-ons",
            "option_choice" : "jalepenos",
            "price" : "60"
          } ],
          "quantity" : "1"
        }, {
          "id" : "40",
          "name" : "cheese burger",
          "options_lists" : [ {
            "list_name" : "sauce",
            "option_choice" : "garlic mayo",
            "price" : "80"
          }, {
            "list_name" : "add-ons",
            "option_choice" : "olives",
            "price" : "90"
          } ],
          "quantity" : "3"
        } ],
        "status" : "0",
        "time" : "129590596",
        "type" : "0"
      },
      "129590596" : {
        "address" : "Model town",
        "contact_no" : "03004950280",
        "deals" : [ {
          "id" : "58",
          "items" : [ {
            "id" : "40",
            "name" : "cheese burger",
            "options_lists" : [ {
              "list_name" : "sauce",
              "option_choice" : "chipotole",
              "price" : 50
            }, {
              "list_name" : "sauce",
              "option_choice" : "jalepenos",
              "price" : 60
            } ]
          }, {
            "id" : "42",
            "name" : "fries",
            "options_lists" : [ {
              "list_name" : "Type",
              "option_choice" : "curly",
              "price" : "40"
            } ]
          } ],
          "name" : "big mega deal",
          "price" : "450",
          "quantity" : "2"
        } ],
        "email" : "papa_ki_princess@gmail.com",
        "id" : "129590596",
        "items" : [ {
          "id" : "40",
          "name" : "cheese burger",
          "options_lists" : [ {
            "list_name" : "sauce",
            "option_choice" : "chipotole",
            "price" : "50"
          }, {
            "list_name" : "add-ons",
            "option_choice" : "jalepenos",
            "price" : "60"
          } ],
          "quantity" : "2"
        }, {
          "id" : "40",
          "name" : "cheese burger",
          "options_lists" : [ {
            "list_name" : "sauce",
            "option_choice" : "garlic mayo",
            "price" : "80"
          }, {
            "list_name" : "add-ons",
            "option_choice" : "olives",
            "price" : "90"
          } ],
          "quantity" : "2"
        } ],
        "status" : "0",
        "time" : "129590596",
        "type" : "1"
      }
    }
}


function parse_orders(orders){
  
    orders = Object.values(orders["data"]).map((order_obj, i) => {
       order_obj["orders"] = []
       if ("items" in order_obj) 
       {
           order_obj["items"].forEach((item) =>{
             item["options"] = {}
             item["optionsPrices"] = {}
             if("options_lists" in item){
               item["options_lists"].forEach((choice) => {
                 item["options"][choice["list_name"]] = choice["option_choice"]
                 item["optionsPrices"][choice["list_name"]] = choice["price"]
               })
             }
           delete item.options_lists
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
             if("options_lists" in item){
               item["options_lists"].forEach((choice) => {
                 item["options"][choice["list_name"]] = choice["option_choice"]
                 item["optionsPrices"][choice["list_name"]] = choice["price"]
               })
             }
             delete item.options_lists
             deal["items"].push(item)
           })
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
            optionsPrices: { sauce: '50', 'add-ons': '60' }
          },
          {
            id: '40',
            name: 'cheese burger',
            quantity: '3',
            options: { sauce: 'garlic mayo', 'add-ons': 'olives' },
            optionsPrices: { sauce: '80', 'add-ons': '90' }
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
            quantiy: '3'
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
            optionsPrices: { sauce: '50', 'add-ons': '60' }
          },
          {
            id: '40',
            name: 'cheese burger',
            quantity: '2',
            options: { sauce: 'garlic mayo', 'add-ons': 'olives' },
            optionsPrices: { sauce: '80', 'add-ons': '90' }
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
            quantity: '2'
          }
        ]
      }
]
    