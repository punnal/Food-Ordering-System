import React from "react"
import Alert from 'react-bootstrap/Alert'

class MenuItem extends React.Component {
    constructor() {
        super()
        this.state = {
            type: "Menu",
            name: "",
            options: {},
            optionsPrices: {},
            price: 0,
            quantity: 0,
            id: 0,
            showPopup: false,
            visible: false,
            cartNotFull: false
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
            //ADD YOUR CODE TO DISPLAY POPUP HERE
            this.setState({
                showPopup: true
            })
        }
        else if(type === "hidePopup"){
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
                this.props.addOrders({...this.state,})
                this.handleClick("hidePopup")
                this.setState({
                    options: {},
                    optionsPrices: {},
                    price: this.props.menuData.price,
                    quantity: 1,
                    id: this.props.menuData.id,
                })
                this.setState({visible:true}, () =>{
                    window.setTimeout(() => {
                    this.setState({visible:false})
                    }, 2000)
                })
            }
            else {
                this.setState({cartNotFull:true}, () =>{
                    window.setTimeout(() => {
                    this.setState({cartNotFull:false})
            }, 2000)
        })
            }
        }

    } 

    createRadioButtons = (name, options) => {
        return options.map((option) => {
            const val = option[0]
            return (
                <div>
                    <div className="MenuItemRadio">
                    <input className = "RadioButtons"
                            type="radio" 
                            name={name}
                            value={val}
                            checked={this.state.options[name] === option[0]}
                            onChange={this.handleChange}
                        /> {option[0]}
                    </div>
                    <div className="MenuItemRadioPrice"> {option[1]}</div>
                    <br/>
                </div>
            )

        })
        
    }

    render() {
        const option_lists = Object.entries(this.props.menuData.options_lists).map((options) => {
            return (
                <div>
                    <div className = "OptionsHeading">{options[0]}</div>
                    <div>{this.createRadioButtons(options[0], Object.entries(options[1]))}</div>
                </div>
                )})

        return (
            <div className = "MenuItem">
                <img src={this.props.menuData.photo_url} height = '200' weight = '200'></img>
                <div className = "MenuItemName">{this.props.menuData.name}</div>
                <div className = "MenuItemDescription">{this.props.menuData.description}</div>
                <div className = "MenuItemPrice">{this.props.menuData.price} PKR</div>
                <div className = "MenuItemAddToCart" onClick={() => {this.handleClick("showPopup")}}><img src = {require('../../img/cart.png')} height = '35' width = '35'/></div>
                {this.state.showPopup?   
                    <div className = "popup">
                        <div className = "popupInner">
                            <div className = "ClosePopup" onClick = {() => {this.handleClick("hidePopup")}}><i class="fas fa-times fa-2x"></i></div>
                            <div className = "PopupOptions">{option_lists}</div>
                            <div className = "PopupQuantity">
                                    <div>
                                        Quantity
                                    </div>
                                        <div className = "MenuItemPointers" onClick={() => {this.handleClick("decrease")}}> ◀ </div>
                                        <div> {this.state.quantity} </div>
                                        <div className = "MenuItemPointers" onClick={() => {this.handleClick("increase")}}> ▶ </div>
                            </div>
                                <Alert variant = "danger" show = {this.state.cartNotFull}>
                                    <strong>Select all options to add</strong>
                                </Alert>
                                <button id="MenuItemPopupAddToCart" type="button" class="btn btn-success"  onClick={() => {this.handleClick("addToCart")}}>Add to cart</button>
                        </div>
                    </div>
                    : null 
                }
                <Alert variant = "success" show = {this.state.visible}>
                    <strong>Order Added to Cart Succesfully!</strong>
                </Alert>
            </div>
        )
    }
}

export default MenuItem
