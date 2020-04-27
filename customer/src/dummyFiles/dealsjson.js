const Deals = 
{
    "data" : 
    {

        "$id":{
            "name" : "big mega deal 1",
            "id" : 100,
            "photo_url" : "https://www.bigmegadeal.com/deal.jpg",
            "price" : "1000",
            "items":
            [
           
                {
                    "id" : 41,
                    "name" : "big burger",
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

                {
                    "id" : 42,
                    "name" : "fries",
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
                
                {
                    "id" : 44,
                    "name" : "Pepsi",
                    "options_lists" :
                    {

                    },
                    "category" : 0         
                }  
        
            ]
        }
    }
}

export default Deals
