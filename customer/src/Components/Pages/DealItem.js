import React from "react"

class DealItem extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            items: [],
            price: 0,
            quantity: 0,
            id: 0,
            showPopup: false,
            init: 0,
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
                ...newState.items[iter].options,
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
            if(Object.keys(this.state.options).length === Object.keys(this.props.dealData.options_lists).length){
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
                <input className = "RadioButtons"
                        type="radio" 
                        name={name}
                        value={val}
                        checked={this.state.init && (this.state.items[iter].options[name] === option[0])}
                        onChange={(event) => this.handleChange(event, iter)}
                    /> {option[0]}

                <div>{option[1]}</div>
                </div>
            )

        })
        
    }

    render() {
        const option_lists = this.props.dealData.items.map((item, iter) => 
            <div>
                <div>{item.name}</div>{ 
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
                <div className = "DealItemAddToCart" onClick={() => {this.handleClick("showPopup")}}>Add to Cart</div>
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

export default DealItem
