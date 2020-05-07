const navBarData = [
    {
        id: 0,
        name: "Menu",
        link: "/"
    },
    {
        id: 1,
        name: "Deals",
        link: "/deals"
    },
    {
        id: 2,
        name: "Gallery",
        link: "/gallery"
    },
    {
        id: 3,
        name: "About Us",
        link: "/about"
    },
    {
        id: 4,
        name: "Contact Us",
        link: "/contact"
    },
    {
        id: 5,
        name: "Divider",
    },
    {
        id: 6,
        name: "Customer",
        options:{
            loggedOut: {
                id:8,
                name: "Account",
                when: "Logged Out",
                options: [
                    {
                        id: 10,
                        name: "Sign In",
                        link: "/login"
                    },
                    {
                        id: 11,
                        name: "Sign Up",
                        link: "/signup"
                    },

                ]

            },
            loggedIn: {
                id:9,
                name: "Hi, Customer",
                options: [
                    {
                        id: 12,
                        name: "Orders",
                        link: "/orders"
                    },
                    {
                        id: 13,
                        name: "Edit Password",
                        link: "/editpassword"
                    },
                    {
                        id: 14,
                        name: "Edit Account Information",
                        link: "/editaccount"
                    },
                    {
                        id: 15,
                        name: "Sign Out",
                        link: "/signout"
                    },

                ]

            }
        }
    },
    {
        id: 7,
        name: "Cart",
        link: "/cart"
    },
]

export default navBarData
