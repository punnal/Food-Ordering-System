import React from 'react'


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

    calTotalPrice = (init) => this.props.orders.reduce( (total, order) => total + (order.price + (Object.values(order.optionsPrices)).reduce((a, b) => a+b))*order.quantity, init)

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
                <div>{order.name}</div>
                <div>
                <div onClick={ () => this.handleClick("decrease", order)}>◀</div>
                <div>{order.quantity}</div>
                <div onClick={ () => this.handleClick("increase", order)}>▶</div>
                </div>
                <div>{(order.price + (Object.values(order.optionsPrices)).reduce((a, b) => a+b))*order.quantity}</div>
                <div onClick={ () => this.handleClick("delete", order)}>&#128465;</div>
            </div>

            )
    }

    render() {
        const orders = this.props.orders.map(this.listOrders)
        return(
            <div>
                <div>
                    <div>
                        <div>Minimum order of {this.state.minOrder} PKR</div>
                        <div>
                            <div>Item</div>
                            <div>Quantity</div>
                            <div>Price</div>
                        </div>
                        {orders}
                        <div>------------line</div>
                        <div>
                        <div>Delivery</div>
                        <div>{this.state.delivery} PKR</div>
                        </div>
                        <div>
                            <div>Total(Including Tax)</div>
                            <div>{this.state.totalPrice} PKR</div>
                        </div>
                    </div>
                    <div>
                        <div>Phone Number</div>
                        <div>
                            <input 
                                type="text" 
                                value={this.state.phone} 
                                name="phone" 
                                placeholder="03001234567" 
                                onChange={this.handleChange} 
                                />
                        </div>
                        <div>Address</div>
                        <div>
                            <input 
                                type="text" 
                                value={this.state.address} 
                                name="address" 
                                placeholder="Your address" 
                                onChange={this.handleChange} 
                                />
                        </div>
                    </div>
                    <div onClick={ () => this.handleClick("checkOut", null)}>Check Out</div>
                    
                </div>
            </div>
        )
    }

}

export default Cart
