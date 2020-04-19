const navBarData = [
    {
        id: 0,
        name: "Menu"
    },
    {
        id: 1,
        name: "Deals"
    },
    {
        id: 2,
        name: "Gallery"
    },
    {
        id: 3,
        name: "About Us"
    },
    {
        id: 4,
        name: "Contact Us"
    },
    {
        id: 5,
        name: "Divider"
    },
    {
        id: 6,
        name: "Customer",
        options:[
            [
                {
                    id:8,
                    name: "Account",
                    when: "Logged Out",
                    options: [
                        {
                            id: 10,
                            name: "Login"
                        },
                        {
                            id: 11,
                            name: "Sign Up"
                        },

                    ]

                },
                {
                    id:9,
                    name: "Hi, Customer",
                    when: "Logged In",
                    options: [
                        {
                            id: 12,
                            name: "Orders"
                        },
                        {
                            id: 13,
                            name: "Edit Password"
                        },
                        {
                            id: 14,
                            name: "Edit Account Information"
                        },
                        {
                            id: 15,
                            name: "Sign Out"
                        },

                    ]

                }
            ]
        ]
    },
    {
        id: 7,
        name: "Cart"
    },
]
