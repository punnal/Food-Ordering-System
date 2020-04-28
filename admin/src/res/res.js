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
import '../css/cssFile.css'

export const res = {
    'admin': {
        'pages': [
            {
                'id': 0,
                'title':'Login',
                'component':Login,
                'path':'/login'
            },
            {
                'id': 1,
                'title':'Deliveries',
                'component':Deliveries,
                'path':'/deliveries/pending',
                'tabs': [
                    {
                        'name': 'Pending',
                        'path':'/deliveries/pending',
                        'component': DeliveriesSubTabs,
                        'api': '/api/deliveries',
                        'buttons': ['Accept', 'Reject'],
                        'buttonscss': ["btn btn-success", "btn btn-danger"]
                    },
                    {
                        'name':'In Progress',
                        'path':'/deliveries/inprogress',
                        'component': DeliveriesSubTabs,
                        'api': '/api/deliveries',
                        'buttons': ['Completed', 'Failed'],
                        'buttonscss': ["btn btn-success", "btn btn-danger"]
                    }, 
                    {
                        'name':'Delivered',
                        'path':'/deliveries/delivered',
                        'component': DeliveriesSubTabs,
                        'api': '/api/deliveries',
                        'buttons':['Delivered', 'Failed'],
                        'buttonscss': ["btn btn-success", "btn btn-danger"]

                    }
                ]
            },
            {
                'id': 2,
                'title':'Orders',
                'component':Orders,
                'path':'/orders',
                'api':'/api/orders',
                'tables': 
                { 
                    'left':
                    [
                        {
                            'heading':'Deals',
                            'cols':['ID', 'Name', 'Items', 'Image', 'Price']
                        },
                        {
                            'heading':'Mains',
                            'cols':['ID', 'Name', 'Description', 'Image', 'Option Lists', 'Price']
                        },
                        {
                            'heading':'Drinks',
                            'cols':['ID', 'Name', 'Description', 'Image', 'Option Lists', 'Price']
                        }
                    ]
                }
            },
            {
                'id': 3,
                'title':'Menu',
                'component':Menu,
                'path':'/menu',
                'api':'/api/menu',
                'tables': 
                [
                        {
                            'heading':'Mains',
                            'cols':['ID', 'Name', 'Description', 'Image', 'Option Lists', 'Price']
                        },
                        {
                            'heading':'Drinks',
                            'cols':['ID', 'Name', 'Description', 'Image', 'Option Lists', 'Price']
                        },
                        {
                            'heading':'Extras',
                            'cols':['ID', 'Name', 'Description', 'Image', 'Option Lists', 'Price']
                        }
                    ]
            },
            {
                'id': 4,
                'title':'Deals',
                'component':Deals,
                'path':'/deals'
            },
            {
                'id': 5,
                'title':'Gallery',
                'component':Gallery,
                'path':'/gallery'
            },
            {
                'id': 6,
                'title':'About Us',
                'component':AboutUs,
                'path':'/aboutus'
            },
            {
                'id': 7,
                'title':'Contact Us',
                'component':ContactUs,
                'path':'/contactus'
            },
            {
                'id':8,
                'title':'History',
                'component':History,
                'path':'/history',
                'api':'/api/pending'
            
            },
            {
                'id': 9,
                'title':'Settings',
                'component':Settings,
                'path':'/settings'
            }
        ],

        'navbar': {
            'logo':'',
            'left': [1,2,3,4,5,6,7],
            'dropdown': {
                'title': 'Hi, Admin',
                'options': [
                    {'name':'History', 'path':'/history'},
                    {'name':'Settings', 'path':'/settings'},
                    {'name':'Signout', 'path':'/gallery'},
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
