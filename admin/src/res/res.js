import styles from '../css/cssFile.css'
import Login from '../Components/Login'
import Deliveries from '../Components/Deliveries'
import DeliveriesSubTabs from '../Components/DeliveriesSubTabs'
import Orders from '../Components/Orders'
import Menu from '../Components/Menu'
import Deals from '../Components/Deals'
import Gallery from '../Components/Gallery'
import AboutUs from '../Components/AboutUs'
import ContactUs from '../Components/ContactUs'
import History from '../Components/History'
import Settings from '../Components/Settings'
import Signout from '../Components/Signout'
import '../css/cssFile.css'

export const res = {
    'admin': {
        'pages': [
            //            {
            //                'id': 0,
            //                'title':'Login',
            //                'component':Login,
            //                'path':'/login'
            //            },
            {
                'id': 1,
                'title':'Deliveries',
                'component':Deliveries,
                'path':'/admin/deliveries/pending',
                'tabs': [
                    {
                        'name': 'Pending',
                        'path':'/admin/deliveries/pending',
                        'component': DeliveriesSubTabs,
                        'api': '/admin/api/orders?status=0',
                        'buttons': ['Accept', 'Reject'],
                        'buttonscss': ["btn btn-success", "btn btn-danger"]
                    },
                    {
                        'name':'In Progress',
                        'path':'/admin/deliveries/inprogress',
                        'component': DeliveriesSubTabs,
                        'api': '/admin/api/orders?status=1',
                        'buttons': ['Completed', 'Failed'],
                        'buttonscss': ["btn btn-success", "btn btn-danger"]
                    }, 
                    {
                        'name':'Completed',
                        'path':'/admin/deliveries/delivered',
                        'component': DeliveriesSubTabs,
                        'api': '/admin/api/orders?status=2',
                        'buttons':['Delivered', 'Failed'],
                        'buttonscss': ["btn btn-success", "btn btn-danger"]

                    }
                ]
            },
            {
                'id': 2,
                'title':'Orders',
                'component':Orders,
                'path':'/admin/orders',
                'api':'/admin/api/orders',
                'tables': 
                {
                    'Mains':
                    {
                        'cols':['ID', 'Name', 'Description', 'Image', 'Price']
                    },
                    'Deals':
                    {
                        'cols':['ID', 'Name', 'Items', 'Image', 'Price']
                    },
                    'Drinks':
                    {
                        'cols':['ID', 'Name', 'Description', 'Image', 'Price']
                    },
                    'Extras':
                    {
                        'heading':'Extras',
                        'cols':['ID', 'Name', 'Description', 'Image', 'Price']
                    }
                }
            },
            {
                'id': 3,
                'title':'Menu',
                'component':Menu,
                'path':'/admin/menu',
                'api':'/api/menu',
                'tables': 
                [
                        {
                            'heading':'Mains',
                            'cols':['ID', 'Name', 'Description', 'Image', 'Price']
                        },
                        {
                            'heading':'Drinks',
                            'cols':['ID', 'Name', 'Description', 'Image', 'Price']
                        },
                        {
                            'heading':'Extras',
                            'cols':['ID', 'Name', 'Description', 'Image', 'Price']
                        }
                    ]
            },
            {
                'id': 4,
                'title':'Deals',
                'component':Deals,
                'path':'/admin/deals',
                'api':'/admin/api/deals'
            },
            {
                'id': 5,
                'title':'Gallery',
                'component':Gallery,
                'path':'/admin/gallery'
            },
            {
                'id': 6,
                'title':'About Us',
                'component':AboutUs,
                'path':'/admin/aboutus'
            },
            {
                'id': 7,
                'title':'Contact Us',
                'component':ContactUs,
                'path':'/admin/contactus'
            },
            {
                'id':8,
                'title':'History',
                'component':History,
                'path':'/admin/history',
                'api':'/api/orders?status=3'
            
            },
            {
                'id': 9,
                'title':'Settings',
                'component':Settings,
                'path':'/admin/settings'
            },
            {
                'id':10,
                'component':Signout,
                'path':'/admin/signout'
            }
        ],

        'navbar': {
            'logo':'',
            'left': [1,2,3,4,5,6,7],
            'dropdown': {
                'title': 'Hi, Admin',
                'options': [
                    {'name':'History', 'path':'/admin/history'},
                    {'name':'Settings', 'path':'/admin/settings'},
                    {'name':'Signout', 'path':'/admin/signout'},
                ]
            }
        },

        'css_classes': {
            'Logo':'Logo',
            'NavBar': 'NavBar',  //the <div> that wraps NavBarElements
            'NavBarElement': 'NavBarElement',  // <div>
            'NavBarDropdown': 'NavBarDropdown',  // <div>
            'Footer': '', //div
            'Header': 'Header', //div
            'Deliveries':'Deliveries',
            'DSubTabs' : 'DSubTabs',
            'DSubTabElement' : 'DSubTabElement',
            'DeliveriesSubTabs': '',
            'Popup':'',
            'DeliveriesSubTabClicked': 'DeliveriesSubTabClicked',
            'DeliveriesButtons':'DeliveriesButtons',
            'DeliveriesContainer': 'DeliveriesContainer',
            'DeliveriesInfo': 'DeliveriesInfo',
            'NavBarDivider': 'NavBarDivider', //div
            'OrdersRightTable': 'OrdersRightTable',
            'Orders': 'Orders',
            'OrdersLeftTable': 'OrdersLeftTable',
            'TableHeadingAndButtonDiv': 'TableHeadingAndButtonDiv',
            'TableHeading': 'TableHeading',
            'TableAddButton': 'TableAddButton',
            'TableColumnHeadings': 'TableColumnHeadings',
            'TableBody': 'TableBody',
            'TableRow': 'TableRow'
        }

    }


}
