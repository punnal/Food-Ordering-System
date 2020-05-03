
route = '/api/offers' //will return all offers
type_of_http_request = 'get'


const util = require('util')


// alternative shortcut

//Note: $ sign means a variable

response = 
{
    "data":
        {  
            "129590596":
            {
                "id" : "129590596",
                "time" : "129590596",
                "email" : "papa_ki_princess@gmail.com",
                "contact_no" : "03004950280",
                "address" : "Model town",
                "status" : "0",
                "type" : "1",
                "items" :
                [
                    {
                        "name" : "cheese burger", "id" : "40", "price" : "200", "quantity" : "3", 
                        "option_list_choices" : 
                        [
                            {"list_name" : "sauce", "option_choice" : "chipotole", "price" : "50"},
                            {"list_name" : "add-ons", "option_choice" : "jalepenos", "price" : "60"}
                        ]
                    },
                    
                    {
                        "name" : "cheese burger", "id" : "40", "price" : "200", "quantity" : "1",
                        "option_list_choices" :
                        [
                            {"list_name" : "sauce", "option_choice" : "garlic mayo", "price": "80"},
                            {"list_name" : "add-ons", "option_choice" : "olives", "price" :  "90"}
                        ]
    
                    }
    
                  ],
                      
                "deals" :
                [
                  
                  {
                    "name" : "big mega deal", "id" : "58", "quantity" : "2", "price": "450",
                    "items" : 
                    [
                      {
                        "name" : "cheese burger", "id" : "40", "price" : "50", "quantity" : "1", 
                        "option_list_choices" : 
                        [
                          {"list_name" : "sauce", "option_choice" : "chipotole", "price" : 50},
                          {"list_name" : "sauce", "option_choice" : "jalepenos", "price" : 60}
                        ]
                      },  
        
                      {
                        "name" : "fries", "id" : "42", "price" : "40", "quantity" : "1",  //youll need to ignore individual items price in deals
                        "option_list_choices" :
                        [
                          {"list_name" : "Type", "option_choice" : "curly", "price" : "40"}
                        ]
                      }
                    ]
                  }
                ]
            }
        }
}


function parse_option_list(item){
    if (!("option_list_choices" in item)){ // insert an empty list in place if options list does not exist
        item["option_list_choices"] = []
        return item 
    }

    item["option_list_choices"] = Object.values(item["option_list_choices"])
    return item
}

function parse_items(obj){ //either deal or order
    if (!("items" in obj)){ // insert an empty list in place if no items exist 
        order["items"] = []
        return obj 
    }

    obj["items"] = Object.values(obj["items"])

    obj["items"].forEach(item => {
        parse_option_list(item)
    })
    return obj
}


function parse_deals(order){

    if (!("deals" in order)){ // insert an empty list in place if no deals exist
        order["deals"] = []
        return order 
    }
    
    order["deals"] = Object.values(order["deals"])

    order["deals"].forEach(deal =>{
        parse_items(deal)
    })

    return order
}

function parse_order(order){
    order = parse_items(order)
    order = parse_deals(order)

    return order

}


orders_list =  Object.values(response["data"]) //will give all orders as dictionaries {"name" : name, "id" : id and so on}


orders_list.forEach(order =>{
    parse_order(order)
})


// console.log(orders_list)

console.log(util.inspect(orders_list, false, null, true /* enable colors */))

/*
OUTPUT


[
  {
    id: '129590596',
    time: '129590596',
    email: 'papa_ki_princess@gmail.com',
    contact_no: '03004950280',
    address: 'Model town',
    status: '0',
    type: '1',
    items: [
      {
        name: 'cheese burger',
        id: '40',
        option_list_choices: [
          {
            list_name: 'sauce',
            option_choice: 'chipotole',
            price: '50'
          },
          {
            list_name: 'add-ons',
            option_choice: 'jalepenos',
            price: '60'
          }
        ]
      },
      {
        name: 'cheese burger',
        id: '40',
        option_list_choices: [
          {
            list_name: 'sauce',
            option_choice: 'garlic mayo',
            price: '80'
          },
          {
            list_name: 'add-ons',
            option_choice: 'olives',
            price: '90'
          }
        ]
      }
    ],
    deals: [
      {
        name: 'big mega deal',
        id: '58',
        price: '450',
        items: [
          {
            name: 'cheese burger',
            id: '40',
            option_list_choices: [
              {
                list_name: 'sauce',
                option_choice: 'chipotole',
                price: 50
              },
              {
                list_name: 'sauce',
                option_choice: 'jalepenos',
                price: 60
              }
            ]
          },
          {
            name: 'fries',
            id: '42',
            option_list_choices: [
              {
                list_name: 'Type',
                option_choice: 'curly',
                price: '40'
              }
            ]
          }
        ]
      }
    ]
  }
]

*/
