import React from 'react'
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

    componentDidMount() {
        this.setState({
            mainMenuItems: Object.values(Items.data.Main),
            extrasMenuItems: Object.values(Items.data.Extras),
            drinksMenuItems: Object.values(Items.data.Drinks),

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
                <div className = "MainTitle">Main</div>
                <div className = "MainContainer">
                    {mainMenuItems}
                </div>
                <div className = "Extras">Extras</div>
                <div className = "ExtrasContainer">
                    {extrasMenuItems}
                </div>    
                <div className = "Drinks">Drinks</div>
                <div className = "DrinksContainer">
                    {drinksMenuItems}
                </div>
            </div>
        )
    }

}

export default Menu
