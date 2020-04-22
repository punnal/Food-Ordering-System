
route = '/api/items' //will return all items
route = '/api/items/:category' //replace category with 0, 1, 2. Will return items belonging to only that category
type_of_http_request = 'get'
//Note: $ sign means a variable

response = 
{
    "data" :
    [
        {
            "$id" : 
            {
                "id" : 41,
                "name" : "V v v tasty burger",
                "price" : 55,
                "description" : "burger has big chic inside. man hungry, burger fill tummy",
                "photo_url" : "https://www.burgerfoto.com/thicburger.jpg",
                "options_list" :
                {
                    "bigger" : 60, //extra charge if u make burger big
                    "very very big" : 90
                },
                "category" : 0 //integer   
            }
        },

        {
            "$id":
            {
                "id" : 48,
                "name" : "V v v big burger",
                "price" : 45,
                "description" : "burger has big cow inside. man hungry, burger fill tummy",
                "photo_url" : "https://www.burgerfoto.com/thicbeefburger.jpg",
                "options_list" :
                {
                    "bigger" : 55, //extra charge if u make burger big
                    "very very big" : 75
                },
                "category" : 0 //integer   
            }
        }
    ]
}

category_int_to_str = {0:"Main", 1:"Extras", 2:"Drinks"}
category_str_to_int = {"Main":0, "Extras":1, "Drinks":2}
