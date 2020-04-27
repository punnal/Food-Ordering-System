import React from 'react'
import DealItem from './DealItem'

import Items from '../../dummyFiles/dealsjson'

class Deals extends React.Component {

    constructor() {
        super()
        this.state = {
            dealsItems: [],
        }
    }

    componentDidMount() {
        this.setState({
            dealsItems: Object.values(Items.data),

        })
    }

    createDeals = (item) => {
        return (
            <DealItem key={item.id} dealData={item} orders={this.props.orders} addOrders={this.props.addOrders} />
        )
    }

    render() {
        const DealsItems = this.state.dealsItems.map(this.createDeals)
        
        return(
            <div className = "DealContainer"> 
                <div id = "Deals" className = "DealsTitle">Deals</div>
                <div className = "DealsContainer">
                    {DealsItems}
                </div>
            </div>
        )
    }

}

export default Deals
