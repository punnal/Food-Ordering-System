
route = '/api/items' //will return all items category-wise
type_of_http_request = 'get'
//Note: $ sign means a variable


/*
Note: options_list is an optional attribute. When parsing, make sure you check whether or not it's there.
*/

///RESPONSE FROM SERVER SIDE

response = 
{
    "data" :
    {
       "Main" :
        {
            
            "$id" : 
            {
                "id" : 41,
                "name" : "big burger",
                "price" : 999,
                "description" : "juicy",
                "photo_url" : "https://www.burgerfoto.com/thicburger.jpg",
                "options_lists" : //will contain all options lists. keys would represent names for the optin list
                {
                    "Sauce":  // key representing option list name
                    {              //value representing the options_lists themselves
                        "Honey mustard" : 20, // key represents the option. value represents additional price
                        "Garlic Mayo" :10
                    },

                    "Add-on":
                    {
                        "Mushrooms" : 50,
                        "Jalepnos" : 60
                    }
                },
                "category" : 0         
            }  
        },

        "Extras" :
        {
            "$id" : 
            {
                "id" : 42,
                "name" : "fries",
                "price" : 50,
                "description" : "juicy",
                "photo_url" : "https://www.burgerfoto.com/thicfries.jpg",
                "options_lists" : //will contain all options lists. keys would represent names for the optin list
                {
                    "exists" : true,

                    "Type":  // key representing option list name
                    {              //value representing the options_lists themselves
                        "Curly" : 50, // key represents the option. value represents additional price
                        "Onion rings" :50
                    },

                    "Upsize":
                    {
                        "large" : 40,
                        "Extra large" : 60
                    }
                },
                "category" : 0         
            }  
        },

        "Drinks" :
        {
            
            "$id" : 
            {
                "id" : 44,
                "name" : "Pepsi",
                "price" : 50,
                "description" : "juicy",
                "photo_url" : "https://www.burgerfoto.com/pepsi.jpg",
                // NOTE: options_list is not present here. that is because options list is an optional field
                "category" : 0         
            }  
        },
    }
}



category_int_to_str = {0:"Main", 1:"Extras", 2:"Drinks"}
category_str_to_int = {"Main":0, "Extras":1, "Drinks":2}
