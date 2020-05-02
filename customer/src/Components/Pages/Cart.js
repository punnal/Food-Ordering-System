import React from 'react'
import Axios from 'axios'

import Api from '../../api/api'

class Cart extends React.Component {

    constructor() {
        super()
        this.state = {
            minOrder: 200,
            delivery: 300,
            totalPrice: 0,
            phone: "",
            address: "",
        }
    }

    componentDidMount() {
        //Initilize values here
        this.setState({totalPrice: this.calTotalPrice(this.state.delivery)})
    }
    
    // order.type === "Menu"?
    //     order.price + ((Object.values(order.optionsPrices)).reduce((a, b) => a+b, 0))*order.quantity:
    //     order.price + (order.items.reduce((acc, ord) => acc + ((Object.values(ord.optionsPrices)).reduce((a, b) => a+b, 0)), 0))*order.quantity

    calTotalPrice = (init) => this.props.orders.reduce( (total, order) => total + (
        order.type === "Menu"?
        (order.price + (Object.values(order.optionsPrices)).reduce((a, b) => a+b, 0))*order.quantity:
         (order.price + (order.items.reduce((acc, ord) => acc + ((Object.values(ord.optionsPrices)).reduce((a, b) => a+b, 0)), 0)))*order.quantity
    ), init)

    handleClick = (type, order) => {
        
        if(type === "increase"){
            this.props.changeQuantity(order, 1, () => this.setState({totalPrice: this.calTotalPrice(this.state.delivery)}))
            this.setState({totalPrice: this.calTotalPrice(this.state.delivery)})
        } 
        else if(type === "decrease"){
            this.props.changeQuantity(order, -1, () => this.setState({totalPrice: this.calTotalPrice(this.state.delivery)}))
            this.setState({totalPrice: this.calTotalPrice(this.state.delivery)})
        } 
        else if(type === "delete"){
            this.props.deleteOrder(order, () => this.setState({totalPrice: this.calTotalPrice(this.state.delivery)}))
            this.setState({totalPrice: this.calTotalPrice(this.state.delivery)})
        } 
        else if(type === "checkOut"){
            if(this.props.orders.length === 0 || this.state.phone === "" || this.state.address === "" || (this.state.totalPrice - this.state.delivery) < this.state.minOrder){
                return
            }
            console.log({
                user: "guest",
                orders: this.props.orders,
                address: this.state.address,
                phone: this.state.phone,
            })
            Axios.post(Api.orders, {
                    user: "guest",
                    orders: this.props.orders,
                    address: this.state.address,
                    phone: this.state.phone,
                })
            this.props.resetOrders(() => this.setState({totalPrice: this.calTotalPrice(this.state.delivery)}))
        } 
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    listOrders = (order) => {
        console.log(order)
        return (
                <div>
                    <div className = "CartOrderItem">
                        <div className = "CartOrderName">{order.name}</div>
                        <div className = "CartQuantity">
                        <div className = "CartDecrease" onClick={ () => this.handleClick("decrease", order)}>◀</div>
                        <div>{order.quantity}</div>
                        <div className = "CartIncrease" onClick={ () => this.handleClick("increase", order)}>▶</div>
                        </div>
                        <div className = "CartPrice">{(
                            order.type === "Menu"?
                                order.price + ((Object.values(order.optionsPrices)).reduce((a, b) => a+b, 0))*order.quantity:
                                order.price + (order.items.reduce((acc, ord) => acc + ((Object.values(ord.optionsPrices)).reduce((a, b) => a+b, 0)), 0))*order.quantity
                        )}
                        </div>
                        <div className = "CartDelete" onClick={ () => this.handleClick("delete", order)}>&#128465;</div>
                    </div>
                    <div className = "CartOrderItemOutter"></div>
                </div>    
            )
    }

    render() {
        const orders = this.props.orders.map(this.listOrders)
        return(
            <div className = "CartMain">
                <div>
                    <div>
                        <div className = "CartMinOrder">Minimum order of {this.state.minOrder} PKR</div>
                        <div className = "CartHeading">
                            <div>Item</div>
                            <div>Quantity</div>
                            <div>Price</div>
                        </div>
                        {orders}
                        <div className = "CartLine"></div>
                        <div className = "CartDeliveryFee">
                        <div>Delivery</div>
                        <div className = "Price">{this.state.delivery} PKR</div>
                        </div>
                        <div className = "CartTotal">
                            <div>Total(Including Tax)</div>
                            <div className = "Price">{this.state.totalPrice} PKR</div>
                        </div>
                    </div>
                    <div className = "CartPhoneAndAddress">
                        <div className = "CartPhoneLabel">Phone Number</div>
                        <div>
                            <input className = "CartPhone"
                                type="text" 
                                value={this.state.phone} 
                                name="phone" 
                                placeholder="Enter Phone Number" 
                                onChange={this.handleChange} 
                                />
                        </div>
                        <div className = "CartPhoneLabel">Address</div>
                        <div>
                            <input className = "CartAddress"
                                type="text" 
                                value={this.state.address} 
                                name="address" 
                                placeholder="Enter Address" 
                                onChange={this.handleChange} 
                                />
                        </div>
                    </div>
                    <div className = "CartCheckOutButton" onClick={ () => this.handleClick("checkOut", null)}>Check Out</div>
                    
                </div>
            </div>
        )
    }

}

export default Cart
