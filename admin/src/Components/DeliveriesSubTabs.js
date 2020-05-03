import React from "react"
import Card from './Card'
import { Popup, PopupH, PopupBody, PopupButtons } from './Popup'
import { api_pull, api_push} from '../api/api.js'

function parse_option_list(item){
    if (!("option_list_choices" in item)){ // insert an empty list in place if options list does not exist
        item["option_list_choices"] = []
        return item 
    }

    item["option_list_choices"] = Object.values(item["option_list_choices"])
    return item
}

function parse_items(obj){ //either deal or order
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


function parse_deals(order){

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

function parse_order(order){
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
        this.state = {'data': [], 'showpopup':false}
        this.clickHandler = this.clickHandler.bind(this)
        this.onPopupClose = this.onPopupClose.bind(this)
        this.onOrderRejected = this.onOrderRejected.bind(this)
    }


    componentDidMount() {
        api_pull(this.api, data => this.setState( old => { 
            if(!data) return
            let parsed =  Object.values(data) //will give all orders as dictionaries {"name" : name, "id" : id and so on}
            parsed.forEach(order =>{
                parse_order(order)
            })
            return {
                ...old, 
                'data': parsed
            }
        }))
    }

    clickHandler(button, id) {
        if(button.id === 1){
            console.log('rejected') 
            this.setState(old => {
                let newstate = {...old, showpopup:true, 'reject_id':id}
                return newstate
            })
        }

        let updatedorder = {...this.state.data[id]}
        updatedorder.status += 1
        api_push('/api/orders', {edit:{updatedorder}})
    }

    onPopupClose(){
        this.setState(old => { return {...old, showpopup:false}})
    }

    onOrderRejected(){
        this.setState(old => {
            let newstate = {...old, showpopup:false}
            delete newstate.data[old.reject_id]
            delete newstate.reject_id
            return newstate
        })
    }

    render() {
        return (
            <div>
                <Popup
                    show = {this.state.showpopup}
                > 
                <PopupH> Reject </PopupH>
                <PopupBody>
                    Are you sure you want to reject this delivery?
                </PopupBody>
                <PopupButtons>
                    <button onClick={this.onPopupClose}> Close </button>
                    <button onClick={this.onOrderRejected}> Reject </button>
                </PopupButtons>
                </Popup> 
                }
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
