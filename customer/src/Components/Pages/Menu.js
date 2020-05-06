import React from 'react'
import Axios from 'axios'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import MenuItem from './MenuItem'
import Api from '../../api/api'

import Items from '../../dummyFiles/menujson'

class Menu extends React.Component {

    constructor() {
        super()
        this.state = {
            mainMenuItems: [],
            extrasMenuItems: [],
            drinksMenuItems: [],
            loading:false
        }
    }
        
    listToObject = (item) => {
        if(!item.options_lists){
            item["options_lists"] = {}
            return item
        }
        item.options_lists = item.options_lists.reduce((accum, options) => {
            accum[Object.keys(options)[0]] = Object.values(options)[0]
            return accum
        }, {})
        return item
    }

    // componentDidMount() {
    //     /*Axios.get('http://localhost:5000/api/menu')
    //         .then((response) => {
    //             console.log(response) 
    //             const itemsCopy = {...response,}
    //             let main = Object.values(itemsCopy.data.Main)
    //             let extras = Object.values(itemsCopy.data.Extras)
    //             let drinks = Object.values(itemsCopy.data.Drinks)
    //             main = main.map(this.listToObject)
    //             extras = extras.map(this.listToObject)
    //             drinks = drinks.map(this.listToObject)
    //             this.setState({
    //                 mainMenuItems: main,
    //                 extrasMenuItems: extras,
    //                 drinksMenuItems: drinks,

    //     })


    //         })*/
    //     const itemsCopy = {...Items,}
    //     let main = Object.values(itemsCopy.data.Main)
    //     let extras = Object.values(itemsCopy.data.Extras)
    //     let drinks = Object.values(itemsCopy.data.Drinks)
    //     main = main.map(this.listToObject)
    //     extras = extras.map(this.listToObject)
    //     drinks = drinks.map(this.listToObject)
    //     this.setState({
    //         mainMenuItems: main,
    //         extrasMenuItems: extras,
    //         drinksMenuItems: drinks,

    //     })
    // }

    componentWillMount(){
        this.setState({loading: true}, () =>
            Axios.get(Api.menu)
                .then((response) => {
                    const itemsCopy = response.data
                    let main = Object.values(itemsCopy.data.Mains)
                    let extras = Object.values(itemsCopy.data.Extras)
                    let drinks = Object.values(itemsCopy.data.Drinks)
                    main = main.map(this.listToObject)
                    extras = extras.map(this.listToObject)
                    drinks = drinks.map(this.listToObject)
                    this.setState({
                        mainMenuItems: main,
                        extrasMenuItems: extras,
                        drinksMenuItems: drinks,
                    }, () => this.setState({
                        loading: false
                    }))
                }).catch((error) => {
                    const itemsCopy = {...Items,}
                    let main = Object.values(itemsCopy.data.Main)
                    let extras = Object.values(itemsCopy.data.Extras)
                    let drinks = Object.values(itemsCopy.data.Drinks)
                    main = main.map(this.listToObject)
                    extras = extras.map(this.listToObject)
                    drinks = drinks.map(this.listToObject)
                    this.setState({
                        mainMenuItems: main,
                        extrasMenuItems: extras,
                        drinksMenuItems: drinks,
                    }, () => this.setState({
                        loading: false
                    }))
                })
        )

    }
    createMenu = (item) => {
        return (
            <MenuItem key={item.id} menuData={item} orders={this.props.orders} addOrders={this.props.addOrders} />
        )
    }

    render() {
        const mainMenuItems = this.state.mainMenuItems.map(this.createMenu)
        const extrasMenuItems = this.state.extrasMenuItems.map(this.createMenu)
        const drinksMenuItems = this.state.drinksMenuItems.map(this.createMenu)
        
        return(
            <div className = "MenuContainer">
                <div className = "ScrollImageContainer">
                    <OverlayTrigger 
                        key = "top"
                        placement = "top"
                        overlay = {
                            <Tooltip id = "tooltip-top">
                                Click me, for big juicy burgers and wraps!
                            </Tooltip>
                        }
                     >
                        <a href = '#Main'> 
                            <img  src = "https://www.macphie.com/wp-content/uploads/2018/08/branded-melts-1-350x350.jpg" className = "ScrollImage" />   
                            <p> Main </p>
                        </a>
                    </OverlayTrigger>
                    <OverlayTrigger 
                        key = "top"
                        placement = "top"
                        overlay = {
                            <Tooltip id = "tooltip-top">
                                Click me for a snack to grab!
                            </Tooltip>
                        }
                     > 
                        <a href = "#Extra">
                            <img src = "https://www.fda.gov/media/87250/download" className = "ScrollImage" />
                            <p> Extras </p> 
                        </a>
                    </OverlayTrigger>
                    <OverlayTrigger 
                        key = "top"
                        placement = "top"
                        overlay = {
                            <Tooltip id = "tooltip-top">
                                Click me for thirst quenching drinks made buy our mixologist!
                            </Tooltip>
                        }
                     >
                        <a href = "#Drink">
                            <img src = "https://www.nerdwallet.com/assets/blog/wp-content/uploads/2017/10/Bartender_original-350x350.jpg" className = "ScrollImage" />
                            <p> Drinks </p>
                        </a>
                    </OverlayTrigger>
                </div>
                <div id = "Main" className = "MainTitle">Main</div>
                <div className = "MainContainer">
                    {mainMenuItems}
                </div>
                <div id = "Extra" className = "Extras">Extras</div>
                <div className = "ExtrasContainer">
                    {extrasMenuItems}
                </div>    
                <div id = "Drink" className = "Drinks">Drinks</div>
                <div className = "DrinksContainer">
                    {drinksMenuItems}
                </div>
            </div>
        )
    }

}

export default Menu
