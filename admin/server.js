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
        {"photo_url" : "https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg","id":1, "name": "Kamaal Deal", "items":[1,2,3,4], "image":"images", "price":6969}
    ],
    "Mains":
    [
        {"photo_url" : "https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg","id":2, "name": "Kamaal Main", "items":[1,2,3,4], "image":"images", "price":6969, "description":"WOWOWOOWOWOWOWOWO"}
    ],
    "Drinks":
    [
        {"photo_url" : "https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg","id":3, "name": "Kamaal Drink", "items":[1,2,3,4], "image":"images", "price":6969, "description":"WOWOWOOWOWOWOWOWO"}
    ]
}
}
`
var dummy_menu = 
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
