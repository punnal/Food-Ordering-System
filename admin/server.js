const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

const dummy_menu = 
`
{
    "data" :
    {
       "Mains" :
        {

            "44" : 
            {
                "id" : 41,
                "name" : "big burger",
                "price" : 999,
                "description" : "juicy",
                "photo_url" : "https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg",
                "options_lists" : 
                [
                    {
                        "Sauce": 
                        {             
                            "Honey mustard" : 20,
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
            }, 

            "60" : 
            {
                "id" : 60, 
                "name" : "very very chicken",
                "price" : 700,
                "description" : "juicy juicy burger",
                "photo_url" :"https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg",
                "options_lists" : 
                [
                    {
                        "Sauce":
                        {
                            "Chipotle" : 40 
                        }
                    }
                ],
                "category" : 0
            }
        },

        "Extras" :
        {
            "43" : 
            {
                "id" : 42,
                "name" : "fries",
                "price" : 50,
                "description" : "juicy",
                "photo_url" :"https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg",
                "options_lists" :
                [
                    {
                        "Type": 
                        {             
                            "Curly" : 50,
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

            "49" : 
            {
                "id" : 44,
                "name" : "Pepsi",
                "price" : 50,
                "description" : "juicy",
                "photo_url" :"https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg",
                "options_lists" :
                [

                ],
                "category" : 0         
            }  
        }
    }
}
`

const deliveries = 
`
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
                        "name" : "fries", "id" : "42", "price" : "40", "quantity" : "1",  
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
`

const deals =
`
{
    "data" :
    {
            "165431354":
            {
            "name" : "big mega deal 1",
            "id" : 100,
            "photo_url" : "https://www.bigmegadeal.com/deal.jpg",
            "price" : "1000",
            "items":
            [
                {
                    "id" : 41,
                    "name" : "big burger",
                    "options_lists" : 
                    [
                        {
                            "Sauce": 
                            {              
                                "Honey mustard" : 20, 
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
                },  

                {
                    "id" : 42,
                    "name" : "fries",
                    "options_lists" : 
                    [
                        {
                            "Type":  
                            {              
                                "Curly" : 50, 
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
                },  

                {
                    "id" : 44,
                    "name" : "Pepsi",
                    "options_lists" :
                    [

                    ],
                    "category" : 0         
                }  

            ]
        },
        "1345135234" : 
        {
            "name" : "big mega deal 1",
            "id" : 100,
            "photo_url" : "https://www.bigmegadeal.com/deal.jpg",
            "price" : "1000",
            "items":
            [
                {
                    "id" : 41,
                    "name" : "big burger",
                    "options_lists" : 
                    [
                        {
                            "Sauce": 
                            {              
                                "Honey mustard" : 20, 
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
                },  

                {
                    "id" : 42,
                    "name" : "fries",
                    "options_lists" : 
                    [
                        {
                            "Type":  
                            {              
                                "Curly" : 50, 
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
                },  

                {
                    "id" : 44,
                    "name" : "Pepsi",
                    "options_lists" :
                    [

                    ],
                    "category" : 0         
                }  

            ]
        }
    }
}
`

app.get("/api/deliveries", (req, res) => {
    res.send(JSON.parse(deliveries))
})

app.get("/api/deals", (req, res) => {
    res.send(JSON.parse(deals))
})

app.get("/api/menu", (req, res) => {
    console.log(req.url)
    res.send(JSON.parse(dummy_menu))
})

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post("/api/*", (req, res) => {
    console.log("POST", req.body)
})


app.listen(9000);
