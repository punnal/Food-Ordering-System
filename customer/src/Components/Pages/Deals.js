import React from 'react'
import DealItem from './DealItem'
import DealsCarousel from './DealsCarousel'

import Items from '../../dummyFiles/dealsjson'

class Deals extends React.Component {

    constructor() {
        super()
        this.state = {
            dealsItems: [],
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
        let deals = Object.values(Items.data).map((deal) => {
            deal.items = deal.items.map(this.listToObject)
            return deal
            
        })
        this.setState({
            dealsItems: deals,

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
                <div className = "DealsContainerOutter"> 
                    <DealsCarousel/>
                    <div className = "DealsTitle">Deals</div>
                    <div className = "DealsContainerInner">
                        {DealsItems}
                    </div>
                </div>
        )
    }

}

export default Deals
