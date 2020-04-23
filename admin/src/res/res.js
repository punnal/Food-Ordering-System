import styles from '../css/cssFile.css'
import Login from '../Components/Login'
import Deliveries from '../Components/Deliveries'
import { Pending, InProgress, Delivered} from '../Components/DeliveriesSubComponents'
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
        'api' : {
            'pull': {
                'pending':'/api/pending'
            },
            'push': {
                'pending':'api/something'
            }
        },
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
                'path':'/deliveries',
                'tabs': [
                    {
                        'name': 'Pending',
                        'path':'/pending',
                        'component': Pending,
                        'inputs': ['Accept', 'Reject']
                    },
                    {
                        'name':'In Progress',
                        'path':'/inprogress',
                        'component': InProgress,
                        'inputs': ['Completed', 'Failed']
                    }, 
                    {
                        'name':'Delivered',
                        'path':'/delivered',
                        'component': Delivered,
                        'inputs':['Delivered', 'Failed']

                    }
                ]
            },
            {
                'id': 2,
                'title':'Orders',
                'component':Orders,
                'path':'/orders'
            },
            {
                'id': 3,
                'title':'Menu',
                'component':Menu,
                'path':'/menu'
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
                'path':'/history'
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
                'options': [8,]
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
            'DeliveriesSubTabClicked': 'DeliveriesSubTabClicked',
            'DeliveriesButtons':'DeliveriesButtons',
            'DeliveriesContainer': 'DeliveriesContainer',
            'DeliveriesInfo': 'DeliveriesInfo',
            'NavBarDivider': 'NavBarDivider' //div
        }

    }


}
