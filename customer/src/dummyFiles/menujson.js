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
                "photo_url" : "https://www.rd.com/wp-content/uploads/2019/04/burger.jpg",
                "options_lists" : //will contain all options lists. keys would represent names for the optin list
                {
                    "Sauce":  // key representing option list name
                    {              //value representing the options_lists themselves
                        "Honey mustard" : 20, // key represents the option. value represents additional price
                        "Garlic Mayoa" :12,
                        "Garlic Mayos" :15,
                        "Garlic Mayod" :19,
                        "Garlic Mayof" :13,
                        "Garlic Mayog" :16
                    },

                    "Add-on":
                    {
                        "Mushrooms" : 50,
                        "Jalepnos" : 60
                    }
                },
                "category" : 0         
            },
            "$id2" : 
            {
                "id" : 41,
                "name" : "Mac Burger",
                "price" : 699,
                "description" : "juicy",
                "photo_url" : "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4.jpg",
                "options_lists" : //will contain all options lists. keys would represent names for the optin list
                {
                    "Sauce":  // key representing option list name
                    {              //value representing the options_lists themselves
                        "OOEE" : 20, // key represents the option. value represents additional price
                        "Mayo" :10
                    },

                    "Add-on":
                    {
                        "Mushrooms" : 50,
                        "Jalepnos" : 60,
                        "Turkey": 54
                    }
                },
                "category" : 0         
            },
            "$id3" : 
            {
                "id" : 41,
                "name" : "Yet Another Burger",
                "price" : 999,
                "description" : "BIG",
                "photo_url" : "data:image/jpeg;base64,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",
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
            },
            "$id4" : 
            {
                "id" : 41,
                "name" : "Royal burger",
                "price" : 999,
                "description" : "King",
                "photo_url" : "https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/exps28800_UG143377D12_18_1b_RMS.jpg",
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
            },
            "$id5" : 
            {
                "id" : 41,
                "name" : "Combo Wombo",
                "price" : 399,
                "description" : "Not Hallal",
                "photo_url" : "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1563381003%2Fhatch-chile-smash-burgers-FT-seo-RECIPE0719.jpg%3Fitok%3D-AfufnnB",
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
                "photo_url" : "https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg",
                "options_lists" : //will contain all options lists. keys would represent names for the optin list
                {

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
            },
            "$id2" : 
            {
                "id" : 42,
                "name" : "fries",
                "price" : 50,
                "description" : "juicy",
                "photo_url" : "https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg",
                "options_lists" : //will contain all options lists. keys would represent names for the optin list
                {

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
            },
            "$id3" : 
            {
                "id" : 42,
                "name" : "fries",
                "price" : 50,
                "description" : "juicy",
                "photo_url" : "https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg",
                "options_lists" : //will contain all options lists. keys would represent names for the optin list
                {

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
                "photo_url" : "https://dydza6t6xitx6.cloudfront.net/ci-corona-extra-2501fe5ca490cb1d.jpeg",
                "options_lists" : {},
                "category" : 0         
            }  
        }
    }
}


export default MenuData
