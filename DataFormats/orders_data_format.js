
route = '/api/offers' //will return all offers
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
                "name" : "big mega deall",
                "price" : 999,
                "photo_url" : "https://www.burgerfoto.com/thicburgerpepsi.jpg",
                "items" :
                [
                    20,
                    30,
                    40 //and so on...
                ],
                "options_lists" :
                [
                    {
                        "medium" : 20,
                        "large" : 50     
                    },

                    {
                        "double patty" : 100,
                        "triple patty" : 170
                    }
                ]
            }
        },

        {
            "$id" : 
            {
                "id" : 43,
                "name" : "big mega deall 2",
                "price" : 999,
                "photo_url" : "https://www.burgerfoto.com/thicburgerpepsi.jpg",
                "items" :
                [
                    20,
                    30,
                    40 //and so on...
                ],
                "options_lists" :
                [
                    {
                        "medium" : 20,
                        "large" : 50     
                    },

                    {
                        "double patty" : 100,
                        "triple patty" : 170
                    }
                ]           
            }
        }
    ]
}

response["data"].forEach(element => {
    console.log(Object.values(element))
});