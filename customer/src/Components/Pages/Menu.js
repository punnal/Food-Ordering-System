import React from 'react'
import Axios from 'axios'
import MenuItem from './MenuItem'


import Items from '../../dummyFiles/menujson'

class Menu extends React.Component {

    constructor() {
        super()
        this.state = {
            mainMenuItems: [],
            extrasMenuItems: [],
            drinksMenuItems: [],
        }
    }
        
    listToObject = (item) => {
        console.log(item)
        item.options_lists = item.options_lists.reduce((accum, options) => {
            accum[Object.keys(options)[0]] = Object.values(options)[0]
            return accum
        }, {})
        return item
    }

    componentDidMount() {
        /*Axios.get('http://localhost:5000/api/menu')
            .then((response) => {
                console.log(response) 
                const itemsCopy = {...response,}
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

        })


            })*/
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

        })
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
                    <a href = '#Main'> 
                        <img  src = "https://www.macphie.com/wp-content/uploads/2018/08/branded-melts-1-350x350.jpg" className = "ScrollImage" />
                        <p> Main </p>
                    </a>
                    <a href = "#Extra">
                        <img src = "https://www.fda.gov/media/87250/download" className = "ScrollImage" />
                        <p> Extras </p> 
                    </a>
                    <a href = "#Drink">
                        <img src = "https://www.nerdwallet.com/assets/blog/wp-content/uploads/2017/10/Bartender_original-350x350.jpg" className = "ScrollImage" />
                        <p> Drinks </p>
                    </a>
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
