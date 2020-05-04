import React from 'react'
import Axios from 'axios'
import Api from '../../api/api'
import Item from '../../dummyFiles/ordersjson'


class Orders extends React.Component {

    constructor() {
        super()
        this.state = {
            orders: [],
            loading: true
        }
    }
    parseOrders = (orders) => {
        orders = Object.values(orders["data"]).map((order_obj, i) => {
        order_obj["orders"] = []
        if ("items" in order_obj) 
        {
            order_obj["items"].forEach((item) =>{
                item["options"] = {}
                item["optionsPrices"] = {}
                if("options_lists" in item){
                    item["options_lists"].forEach((choice) => {
                        item["options"][choice["list_name"]] = choice["option_choice"]
                        item["optionsPrices"][choice["list_name"]] = choice["price"]
                    })
                }
                delete item.options_lists
                item["type"] = "menu"
                order_obj["orders"].push(item)
            })
        }
 
        if ("deals" in order_obj) 
        {
            order_obj["deals"].forEach((deal) =>{
                var deal_items = deal["items"]
                deal["items"] = []
                deal_items.forEach((item) => {
                    item["options"] = {}
                    item["optionsPrices"] ={}
                    if("options_lists" in item){
                        item["options_lists"].forEach((choice) => {
                            item["options"][choice["list_name"]] = choice["option_choice"]
                            item["optionsPrices"][choice["list_name"]] = choice["price"]
                        })
                    }
                    delete item.options_lists
                    deal["items"].push(item)
                })
                deal["type"] = "deal"
                order_obj["orders"].push(deal)  
            })
        }
 
        delete order_obj.deals
        delete order_obj.items
        return order_obj
    })
 
        return orders
    }
    

    componentWillMount(){
        this.setState({loading: true}, () =>
                Axios.get(Api.orders)
                    .then((response) => {
                        const orders = this.parseOrders(response.data)
                        this.setState({
                            //Hardcoded here
                            //pictures: [
                            //    {id:1,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}, 
                            //    {id:2,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}
                            //]
                            orders:orders
                        }, () => this.setState({
                            loading: false
                        }))
                    }).catch(() => {
                        this.setState({
                            //Hardcoded here
                            orders: this.parseOrders(Item)//response.data
                        }, () => this.setState({
                            loading: false
                        }))
                    })
        )

    }
    
    handleClick = (orders) => {
        orders.forEach((order) => {
            this.props.addOrder(order, () => void(0))
        }) 
    }   

    calTotalPrice = (orders) => orders.reduce( (total, order) => total + (
        order.type === "Menu"?
        (order.price + (Object.values(order.optionsPrices)).reduce((a, b) => a+b, 0))*order.quantity:
         (order.price + (order.items.reduce((acc, ord) => acc + ((Object.values(ord.optionsPrices)).reduce((a, b) => a+b, 0)), 0)))*order.quantity
    ), 0)


    createOrders = () => this.state.orders.map((order) => {
        const names = order.orders.reduce((accum, item) => accum + ", " + item.name, "")
        const price = this.calTotalPrice(order.orders)
        return (
            <div>
                <div>
                    {names}
                </div>
                    {order.status}
                <div>
                    {price}
                </div>
                <div onClick={() => this.handleClick(order.orders)}>
                    Add to Cart
                </div>
            </div> 
        )
    })
     

    createLoading = () => {
        return (
            <div>Loading...</div>
        )
    }

    render() {

        console.log("===>", this.state)
        const orders = this.createOrders()
        const loading = this.createLoading()
        return(
            <div className = "">
                <div>Customer Orders</div>
                {this.state.loading?loading:orders}
            </div>
        )
    }

}

export default Orders
