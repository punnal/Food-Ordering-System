import React from "react"

class MenuItem extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            options: {},
            optionsPrices: {},
            price: 0,
            quantity: 0,
            id: 0,
            showPopup: false,
        }
    }
    componentDidMount() {
        this.setState({
            price: this.props.menuData.price,
            quantity: 1,
            id: this.props.menuData.id,
            name: this.props.menuData.name,

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
            this.setState({
                showPopup: true
            })
        }
        else if(type === "hidePopup"){
            console.log("hidePopup")
            //ADD YOUR CODE TO DISPLAY POPUP HERE
            this.setState({
                showPopup: false
            })
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
                    price: this.props.menuData.price,
                    quantity: 1,
                    id: this.props.menuData.id,
                })
            }
        }

    } 

    createRadioButtons = (name, options) => {
        return options.map((option) => {
            const val = option[0]
            return (
                <div>
                <input className = "RadioButtons"
                        type="radio" 
                        name={name}
                        value={val}
                        checked={this.state.options[name] === option[0]}
                        onChange={this.handleChange}
                    /> {option[0]}

                <div>{option[1]}</div>
                </div>
            )

        })
        
    }

    render() {
        console.log(this.state)
        const option_lists = Object.entries(this.props.menuData.options_lists).map((options) => <div><div className = "OptionsHeading">{options[0]}</div>{this.createRadioButtons(options[0], Object.entries(options[1]))}</div>)

        return (
            <div className = "MenuItem">
                <img src={this.props.menuData.photo_url} height = '200' weight = '200'></img>
                <div className = "MenuItemName">{this.props.menuData.name}</div>
                <div className = "MenuItemDescription">{this.props.menuData.description}</div>
                <div className = "MenuItemPrice">{this.props.menuData.price} PKR</div>
                <div className = "MenuItemAddToCart" onClick={() => {this.handleClick("showPopup")}}>Add to Cart</div>
                {this.state.showPopup?   
                    <div className = "popup">
                        <div className = "popupInner">
                            <img src = {require('../../img/close2.png')} className = "ClosePopup" onClick = {() => {this.handleClick("hidePopup")}} />
                            <div className = "PopupOptions">
                                <div> {option_lists} </div>
                            </div>
                            <div className = "PopupQuantity">
                                <div onClick={() => {this.handleClick("decrease")}}> ◀ </div>
                                <div  > {this.state.quantity} </div>
                                <div onClick={() => {this.handleClick("increase")}}> ▶ </div>
                            </div>
                                <div className = "PopupAddToCart" onClick={() => {this.handleClick("addToCart")}}>Add to cart</div>
                        </div>
                    </div>
                    : null 
                }
            </div>
        )
    }

}

export default MenuItem
