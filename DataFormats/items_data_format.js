
route = '/api/items' //will return all items
route = '/api/items/:category' //replace category with 0, 1, 2. Will return items belonging to only that category
type_of_http_request = 'get'
//Note: $ sign means a variable


///RESPONSE FROM SERVER SIDE

response = 
{
    "data" :
    {
        "Main" :
        [
            {
                "$id" : 
                {
                    "id" : 41,
                    "name" : "big burger",
                    "price" : 999,
                    "description" : "juicy",
                    "photo_url" : "https://www.burgerfoto.com/thicburger.jpg",
                    "options_list" :
                    {
                        "Extra Patty" : 55
                    },
                    "category" : 0         
                }  
            }
        ],

        "Extras" : 
        [
                
            {
                "$id" : 
                {
                    "id" : 42,
                    "name" : "fries",
                    "price" : 120,
                    "description" : "masala",
                    "photo_url" : "https://www.burgerfoto.com/fries.jpg",
                    "options_list" :
                    {
                        "large" : 55
                    },
                    "category" : 1         
                }  
            }
        ],

        "Drinks" :
        [
            {
                "$id" : 
                {
                    "id" : 44,
                    "name" : "pepsi",
                    "price" : 40,
                    "description" : "chiiled",
                    "photo_url" : "https://www.burgefoto.com/pepsi.jpg",
                    "options_list" :
                    {
                        "Big can" : 10
                    }
                }, 
                "category" : 2
            }
        ]
    }
}



category_int_to_str = {0:"Main", 1:"Extras", 2:"Drinks"}
category_str_to_int = {"Main":0, "Extras":1, "Drinks":2}
