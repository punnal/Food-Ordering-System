import React from "react"

class MenuItem extends React.Component {
    constructor() {
        super()
        this.state = {
            options: {},
            optionsPrices: {},
            price: 0,
            quantity: 0,
            id: 0,
        }
    }
    componentDidMount() {
        this.setState({
            price: this.props.menuData.price,
            quantity: 1,
            id: this.props.menuData.id,

        })
    }
   
    handleChange = (event) => {
        const {name, value, type} = event.target
        this.setState(prevState => { 
            return({
                options: {
                    ...prevState.options,
                    [name]: value
                },
                optionsPrices: {
                    ...prevState.optionsPrices,
                    [name]: this.props.menuData.options_lists[name][value]
                },
            })
        })
    }
    
    handleClick = (type) => {
        if(type === "showPopup"){
            console.log("openPopup")
            //ADD YOUR CODE TO DISPLAY POPUP HERE
        }
        else if(type === "hidePopup"){
            console.log("hidePopup")
            //ADD YOUR CODE TO DISPLAY POPUP HERE
        }
        else if(type === "increase"){
            this.setState((prevState) => {
                return {quantity: prevState.quantity + 1}

            })
        }
        else if(type === "decrease"){
            this.setState((prevState) => {
                return {quantity: (prevState.quantity-1?prevState.quantity - 1: prevState.quantity)}
            })
        }
        else if(type === "addToCart"){
            if(Object.keys(this.state.options).length === Object.keys(this.props.menuData.options_lists).length){
                console.log("Order added")
                this.props.addOrders({...this.state,})
                this.handleClick("hidePopup")
                this.setState({
                    options: {},
                    optionsPrices: {},
                    price: 0,
                    quantity: 0,
                    id: 0,
                })
            }
        }

    } 

    createRadioButtons = (name, options) => {
        return options.map((option) => {
            const val = option[0]
            return (
                <div>
                <input 
                        type="radio" 
                        name={name}
                        value={val}
                        checked={this.state.options[name] === option[0]}
                        onChange={this.handleChange}
                    /> {option[0]}
                </div>
            )

        })
        
    }

    render() {
        console.log(this.state)
        const option_lists = Object.entries(this.props.menuData.options_lists).map((options) => <div><div>{options[0]}</div>{this.createRadioButtons(options[0], Object.entries(options[1]))}</div>)

        return (
            <div>
                <img src={this.props.menuData.photo_url}></img>
                <div>{this.props.menuData.name}</div>
                <div>{this.props.menuData.description}</div>
                <div>{this.props.menuData.price} PKR</div>
                <div onClick={() => {this.handleClick("showPopup")}}>Add to Cart</div>
                <div>
                    <div>
                        <div>
                            <div> {option_lists} </div>
                        </div>
                        <div>
                            <div onClick={() => {this.handleClick("decrease")}}> ◀ </div>
                            <div  > {this.state.quantity} </div>
                            <div onClick={() => {this.handleClick("increase")}}> ▶ </div>

                            <div onClick={() => {this.handleClick("addToCart")}}>Add to cart</div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default MenuItem
