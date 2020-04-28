const MenuData = {
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
                [
                    {
                        "Sauce":  // key representing option list name
                        {              //value representing the options_lists themselves
                            "Honey mustard" : 20, // key represents the option. value represents additional price
                            "Garlic Mayo" :10
                        }
                    },

                    {
                        "Add-on":
                        {
                            "Mushrooms" : 50,
                            "Jalepnos" : 60
                        }
                    }
                ],
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
                [
                    {
                        "Type":  // key representing option list name
                        {              //value representing the options_lists themselves
                            "Curly" : 50, // key represents the option. value represents additional price
                            "Onion rings" :50
                        }
                    },

                    {
                        "Upsize":
                        {
                            "large" : 40,
                            "Extra large" : 60
                        }
                    }
                ],
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
                "options_lists" :
                [

                ],
                "category" : 0         
            }  
        },
    }
}

export default MenuData
