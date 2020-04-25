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


    handleClick = (type, id) => {
        
        if(type === "increase"){
            this.props.changeQuantity(id, 1)
        } 
        else if(type === "decrease"){
            this.props.changeQuantity(id, -1)
        } 
        else if(type === "delete"){
            this.props.deleteOrder(id)
        } 
        else if(type === "checkOut"){
            if(this.props.orders.length === 0){
                return
            }
            console.log({
                user: "guest",
                orders: this.props.orders,
                address: this.state.address,
                phone: this.state.phone,
            })
        } 
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    listOrders = (order) => {
        return (
            <div>
                <div>{order.name}</div>
                <div>
                <div onClick={ () => this.handleClick("decrease", order.id)}>◀</div>
                <div>{order.quantity}</div>
                <div onClick={ () => this.handleClick("increase", order.id)}>▶</div>
                </div>
                <div>{(order.price + (Object.values(order.optionsPrices)).reduce((a, b) => a+b))*order.quantity}</div>
                <div onClick={ () => this.handleClick("delete", order.id)}>&#128465;</div>
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
                    <div onClick={ () => this.handleClick("checkOut")}>Check Out</div>
                    
                </div>
            </div>
        )
    }

}

export default Cart
