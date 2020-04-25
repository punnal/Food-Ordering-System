const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));
const dummydata = 
`
{
"data":
[
            {"orderid": 1, "Name": "Ahmad Humayun", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 2, "Name": "something", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 3, "Name": "Punnal", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 4, "Name": "Ismail", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 5, "Name": "Khan", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 6, "Name": "Baloch", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 7, "Name": "Mahad", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 8, "Name": "Ali", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 9, "Name": "Ayaz", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 10, "Name": "Abdullah", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 11, "Name": "Hassan Mahad", "Address":"Falcon complex", "Order":"something different", "status":"Pending"}
]
}
`

const dummytables = 
` 
{
"data": 
{
    "Deals": 
    [
        {"ID":1, "Name": "Kamaal Deal", "Items":[1,2,3,4], "Image":"images", "Price":6969}
    ],
    "Mains":
    [
        {"ID":1, "Name": "Kamaal Main", "Items":[1,2,3,4], "Image":"images", "Price":6969, "Description":"WOWOWOOWOWOWOWOWO"}
    ],
    "Drinks":
    [
        {"ID":1, "Name": "Kamaal Drink", "Items":[1,2,3,4], "Image":"images", "Price":6969, "Description":"WOWOWOOWOWOWOWOWO"}
    ]
}
}
`
var dummy_menu = 
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
            }, 
            
            "60" : 
            {
                "id" : 60, 
                "name" : "very very chicken",
                "price" : 700,
                "description" : "juicy juicy burger",
                "photo_url" : "https://www.burgerfoto.com/beefyburger.jpg",
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
            
            "44" : 
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
        }
    }
}



app.get("/api/tables", (req, res) => {
    console.log(req.url)
    res.send(JSON.parse(dummytables))
})

app.get("/api/menu", (req, res) => {
    console.log(req.url)
    res.send(JSON.parse(dummy_menu))
})

app.get("/api/*", (req, res) => {

    console.log(req.url)
    res.send(JSON.parse(dummydata))
})
app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post("/api/*", (req, res) => {
    console.log("POST", req.body)
})


app.listen(9000);
