import React from 'react'
import _ from "lodash"
import {Popup, PopupH, PopupBody} from './Popup'

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
            <select class="custom-select" id={props.id} value="Select" onChange={props.onItemChange}>
                <option key={-1} id={-1}>Select</option>
                {
                    props.menu.map((item, i) => {
                        return <option key={i} id={i}> {i}. {item.name} </option>
                    })
                }
            </select>
        :
            <input id="AddDealPopupDisabled" class="form-control" type="text" disabled={true} value={props.name}/>
    )
}

const ListItem = (props) => {
    return (
        <div id="DealsPopupList">
            <ItemDropDown 
                itemID={props.itemID}
                id={props.id}
                new={props.new}
                menu={props.menu}
                onItemChange={props.onItemChange}
                name={props.name}
            />
            <div class="input-group-prepend">
                <span class="input-group-text">Quantity</span>
                <input className = "form-control"
                    type="number" 
                    id={props.id} 
                    name="quantity" 
                    min="1" 
                    value={props.qty} 
                    onChange={props.onChange}
                />
            </div>
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
        this.onNameChange = this.onNameChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)
        this.onImageUpload = this.onImageUpload.bind(this)
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

    onNameChange(event) {
        const {value} = event.target
        this.setState(old => {
            return {
                deal: {
                    ...old.deal,
                    name:value
                }
            }
        })
    }

    onImageUpload(event){
        let file = event.target.files[0]
        var reader = new FileReader()
        let dataurl = ''
        reader.onload = () => {
            dataurl = reader.result
            console.log(dataurl)
            this.setState(old => {
                return {
                    deal:{
                        ...old.deal,
                        'photo_url':dataurl
                    }
                }
            })
        }
        reader.readAsDataURL(file)
    }

    onPriceChange(event) {
        const {value} = event.target
        this.setState(old => {
            return {
                deal: {
                    ...old.deal,
                    price:value
                }
            }
        })
    }

    render() {
        return (
            <Popup 
                show={this.props.show}>
                <PopupH><div id="AddDealPopupHeading"> Add/Edit An Item </div> </PopupH>
                <PopupBody> 
                    <div>
                        <button id="DealsPopupClose" type="button" class="btn btn-danger" onClick={() => this.props.onClose('cancel')}> Close </button>
                        <button id="DealsPopupAdd" type="button" class="btn btn-success" onClick={() => this.props.onAdd(!_.isEqual(this.props.prefill, this.state.deal), this.state.deal, this.props.type)}> Add </button>
                        <div id="DealsPopupName" class="input-group-prepend">
                            <span class="input-group-text">Deal Name</span>
                            <input className = "form-control" type="text" onChange={this.onNameChange} value={this.state.deal.name} />
                        </div>
                        <div id="DealsPopupPrice" class="input-group-prepend">
                            <span class="input-group-text">Price</span>
                            <input className = "form-control" type="number" onChange={this.onPriceChange} value={this.state.deal.price} />
                        </div>
                        <h4 id="AddDealPopupItems"> Items </h4>
                        {
                            this.state.deal.items.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <div id="AddDealPopupMinus"> 
                                            <button type="button" class="btn btn-danger" id={i} onClick={this.onRemove}> - </button>
                                        </div>
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
                                    </div>
                                )
                            })
                        }
                        <div id="AddDealPopupPlus">
                            <button type="button" class="btn btn-success" id={this.state.deal.items.length} onClick={this.onAdd}> + </button>
                        </div>
                        <br/>
                        <img id="AddDealPopupImage" height="100" src={this.state.deal.photo_url}/>
                        <br/>
                        <input id="AddDealPopupImageButton" className = "form-control" onChange={this.onImageUpload} type="file"/>
                    </div>
                </PopupBody>
            </Popup>
        )
    }
}

export default AddDealPopup
