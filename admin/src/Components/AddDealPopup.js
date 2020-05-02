import React from 'react'
import _ from "lodash"
import {Popup, PopupH, PopupBody, PopupButtons } from './Popup'

const menuToItemsArray = (menu) => {
    let items = []
    Object.keys(menu).forEach((table,i) => {
        let arr = Object.values(menu[table]).map((item, j) => {
            return item
        })
        items = [...items, ...arr]
    })
    return items
}

const ItemDropDown = (props) => {
    return (
        props.name === ""?
            <select id={props.id} value="Select" onChange={props.onItemChange}>
                <option key={-1} id={-1}>Select</option>
                {
                    props.menu.map((item, i) => {
                        return <option key={i} id={i}> {i}. {item.name} </option>
                    })
                }
            </select>
        :
            <input type="text" disabled={true} value={props.name}/>
    )
}

const ListItem = (props) => {
    return (
        <div>
            <ItemDropDown 
                itemID={props.itemID}
                id={props.id}
                new={props.new}
                menu={props.menu}
                onItemChange={props.onItemChange}
                name={props.name}
            />
            <input 
                type="number" 
                id={props.id} 
                name="quantity" 
                min="1" 
                value={props.qty} 
                onChange={props.onChange}
            />
        </div>
    )
}

class AddDealPopup extends React.Component {
    constructor(props) {
        super(props)
        let prefill = _.cloneDeep(this.props.prefill)
        this.state = {deal:prefill}
        this.onChange = this.onChange.bind(this)
        this.itemArray = menuToItemsArray(props.menu)
        this.onItemChange = this.onItemChange.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onRemove = this.onRemove.bind(this)
    }

    onChange(event) {
        const {name, value, id} = event.target
        this.setState(old => {
            let newstate = {...old}
            newstate.deal.items[id].quantity = value
            return newstate
        })
    }

    onItemChange(event) {
        const {id, value} = event.target
        if(value === "None") return
        let item = _.cloneDeep(this.itemArray[parseInt(value.split(".")[0])])
        this.setState(old => {
            let newstate = _.cloneDeep(old)
            let index = -1
            let exist = Object.values(newstate.deal.items).filter((it, i) => {
                if(it.id === item.id){
                    index = i
                    return true
                }
                return false
            })
            if(index !== -1){
                exist[0].quantity = parseInt(exist[0].quantity) + 1
                return newstate
            }
            newstate.deal.items[id] = item
            newstate.deal.items[id].quantity = 1
            console.log(newstate)
            return newstate
        })
    }

    onAdd(event) {
        const {id} = event.target
        this.setState(old => {
            let newstate = _.cloneDeep(old)
            newstate.deal.items[id] = {
                name:""
            }
            return newstate
        })
    }

    onRemove(event) {
        const {id} = event.target
        console.log(id)
        this.setState(old => {
            let newstate = _.cloneDeep(old)
            newstate.deal.items = newstate.deal.items.filter((item, i) => i != id)
            console.log(newstate.deal.items)
            return newstate
        })
    }

    render() {
        return (
            <Popup 
                show={this.props.show}>
                <PopupH> Add/Edit An Item </PopupH>
                <PopupBody> 
                    <div>
                        <h2> {this.state.deal.name} </h2>
                        <h4> Items </h4>
                        {
                            this.state.deal.items.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <ListItem 
                                            new={false}
                                            id={i}
                                            onItemChange={this.onItemChange}
                                            itemID={item.id}
                                            name={item.name}
                                            qty={item.quantity}
                                            onChange={this.onChange}
                                            menu={this.itemArray}
                                        /> 
                                        <button id={i} onClick={this.onRemove}> - </button>
                                    </div>
                                )
                            })
                        }
                        <button id={this.state.deal.items.length} onClick={this.onAdd}> + </button>
                    </div>
                </PopupBody>
                <button onClick={() => this.props.onClose('cancel')}> Close </button>
                <button onClick={() => this.props.onAdd(!_.isEqual(this.props.prefill, this.state.deal), this.state.deal, this.props.type)}> Add </button>
            </Popup>
        )
    }
}

export default AddDealPopup
