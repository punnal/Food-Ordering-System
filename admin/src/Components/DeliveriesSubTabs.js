import React from "react"
import _ from "lodash"
import Card from './Card'
import { Popup, PopupH, PopupBody, PopupButtons } from './Popup'
import { api_pull, api_push} from '../api/api.js'

const parse_option_list = item => {
    if (!("option_list_choices" in item)){ // insert an empty list in place if options list does not exist
        item["option_list_choices"] = []
        return item 
    }

    item["option_list_choices"] = Object.values(item["option_list_choices"])
    return item
}

const parse_items = obj => { //either deal or order
    if (!("items" in obj)){ // insert an empty list in place if no items exist 
        let order = {}
        order["items"] = []
        return obj 
    }

    obj["items"].forEach(item => {
        parse_option_list(item)
    })
    return obj
}

const parse_deals = order => {

    if (!("deals" in order)){ // insert an empty list in place if no deals exist
        order["deals"] = []
        return order 
    }

    order["deals"] = Object.values(order["deals"])

    order["deals"].forEach(deal =>{
        parse_items(deal)
    })

    return order
}

const parse_order = order => {
    order = parse_items(order)
    order = parse_deals(order)
    return order
}

class DeliveriesSubTabs extends React.Component {
    constructor(props) {
        super(props)
        this.page = this.props.page
        this.tab_id = this.props.tab_id
        this.tab = this.page.tabs[this.tab_id]
        this.api = this.tab.api
        this.apiOrderManagement = '/admin/api/orders/management'
        this.state = {'data': [], 'showpopup':false}
        this.clickHandler = this.clickHandler.bind(this)
        this.onPopupClose = this.onPopupClose.bind(this)
        this.onOrderRejected = this.onOrderRejected.bind(this)
        this.reloadData = this.reloadData.bind(this)
    }

    reloadData(){
        api_pull(this.api, data => 
            this.setState( old => { 
                if(!data) return
                let parsed =  Object.values(data) //will give all orders as dictionaries {"name" : name, "id" : id and so on}
                parsed.forEach(order =>{
                    parse_order(order)
                })
                return {
                    ..._.cloneDeep(old), 
                    'data': parsed
                }
        }))
    }

    componentDidMount() {
        this.reloadData()
    }

    clickHandler(button, id) {
        if(button.id === 1){
            this.setState(old => {
                let newstate = {...old, showpopup:true, 'reject_id':id}
                return newstate
            })
            return
        }

        console.log(`Accepted order ${this.state.data[id].id}`)
        let updatedOrder = _.cloneDeep(this.state.data[id])
        updatedOrder.status = parseInt(updatedOrder.status) + 1
        api_push(this.apiOrderManagement, {edit:{...updatedOrder}})
        this.reloadData()
    }

    onPopupClose(){
        this.setState(old => { return {...old, showpopup:false}})
    }

    onOrderRejected(){
        let updatedOrder = _.cloneDeep(this.state.data[this.state.reject_id])
        updatedOrder.status = -1
        this.onPopupClose()
        api_push(this.apiOrderManagement, {edit:{...updatedOrder}})
        this.reloadData()
    }

    render() {
        return (
        <div>
                <Popup
                    show = {this.state.showpopup}
                > 
                    <PopupH><div className="DeliveriesPopupHeading">Reject</div> </PopupH>
                    <PopupBody>
                        <p className="DeliveriesPopupSubHeading">Are you sure you want to reject this delivery?</p>
                    </PopupBody>
                    <PopupButtons>
                        <div className="DeliveriesPopupButtons">
                            <button id="DeliveriesPopupClose" class="btn btn-success" onClick={this.onPopupClose}> Close </button>
                            <button id="DeliveriesPopupReject" class="btn btn-danger" onClick={this.onOrderRejected}> Reject </button>
                        </div>
                    </PopupButtons>
                </Popup> 
                {
                    this.state.data.map((e, i) =>{
                        return (
                            <Card 
                                key={i} 
                                id = {i}
                                inputType='button'
                                inputClassNames= {this.tab.buttonscss}
                                inputs={this.tab.buttons}
                                data={e}
                                onClick={this.clickHandler}/>
                        )})
                }
            </div>
        )
    }
}

export default DeliveriesSubTabs
