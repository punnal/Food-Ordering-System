import React from "react"
import Alert from 'react-bootstrap/Alert'

class DealItem extends React.Component {
    constructor() {
        super()
        this.state = {
            type: "Deal",
            name: "",
            items: [],
            price: 0,
            quantity: 0,
            id: 0,
            showPopup: false,
            init: 0,
            visible: false,
            cartNotFull: false
        }
    }
    componentDidMount() {

        const items = this.props.dealData.items.map((item) => {
            return ({
                name:item.name, 
                id:item.id, 
                options:{}, 
                optionsPrices:{}
            })
        })

        this.setState({
            price: this.props.dealData.price,
            quantity: 1,
            init:1,
            id: this.props.dealData.id,
            name: this.props.dealData.name,
            items: items 
        })
    }
   
    handleChange = (event, iter) => {
        const {name, value, type} = event.target
        console.log(this.props.dealData)
        this.setState(prevState => {
            let newState = {...prevState,}
            newState.items[iter].options = {
                ...newState.items[iter].options,
                [name]: value
            }
            newState.items[iter].optionsPrices = {
                ...newState.items[iter].optionsPrices,
                [name]: this.props.dealData.items[iter].options_lists[name][value]
            } 
            
            return(newState)
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
            console.log(this.state)
            console.log(this.props.dealData)

            if(this.state.items.reduce((a, b) => a + Object.keys(b.options).length, 0) === this.props.dealData.items.reduce((a, b) => a + Object.keys(b.options_lists).length,0)){
                console.log("Order added")
                this.props.addOrders({...this.state,})
                this.handleClick("hidePopup")
                this.setState({
                    options: {},
                    optionsPrices: {},
                    price: this.props.dealData.price,
                    quantity: 1,
                    id: this.props.dealData.id,
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

    createRadioButtons = (name, options, iter) => {
        return options.map((option) => {
            if(this.state.init){
                console.log(this.state.items[iter].options[name], "===", option[0])
            }
            const val = option[0]
            return (
                <div>
                <div className="DealItemRadio">
                <input className = "RadioButtons"
                        type="radio" 
                        name={name}
                        value={val}
                        checked={this.state.init && (this.state.items[iter].options[name] === option[0])}
                        onChange={(event) => this.handleChange(event, iter)}
                    /> {option[0]}
                </div>
                <div className="DealItemPrice">{option[1]}</div>
                <br/>
                </div>
            )

        })
        
    }

    render() {
        const option_lists = this.props.dealData.items.map((item, iter) => 
            <div>
                <div className="DealItemHeading">{item.name}</div>{ 
                    Object.entries(item.options_lists).map((options) => 
                        <div><div className = "OptionsHeading">{options[0]}</div>{this.createRadioButtons(options[0], Object.entries(options[1]), iter)}</div>
                    )
                }
            </div>
        )

        return (
            <div className = "DealItem">
                <img src={this.props.dealData.photo_url} height = '200' weight = '200'></img>
                <div className = "DealItemName">{this.props.dealData.name}</div>
                <div className = "DealItemDescription">{this.props.dealData.description}</div>
                <div className = "DealItemPrice">{this.props.dealData.price} PKR</div>
                <div className = "DealItemAddToCart" onClick={() => {this.handleClick("showPopup")}}><img src = {require('../../img/cart.png')} height = '35' width = '35'/></div>
                {this.state.showPopup?   
                    <div className = "popup">
                        <div className = "popupInner">
                            <div className = "ClosePopup" onClick = {() => {this.handleClick("hidePopup")}}><i class="fas fa-times fa-2x"></i></div>
                            <div className = "PopupOptions">
                                <div> {option_lists} </div>
                            </div>
                            <div className = "PopupQuantity">
                                <div>Quantity</div>
                                <div onClick={() => {this.handleClick("decrease")}}> ◀ </div>
                                <div> {this.state.quantity} </div>
                                <div onClick={() => {this.handleClick("increase")}}> ▶ </div>
                            </div>
                                <Alert variant = "danger" show = {this.state.cartNotFull}>
                                    <strong>Select all options to add</strong>
                                </Alert>
                                <div id = "PopupAddToCart" class="btn btn-success" onClick={() => {this.handleClick("addToCart")}}>Add to cart</div>
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

export default DealItem
