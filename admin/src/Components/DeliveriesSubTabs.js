import React from "react"
import Card from './Card'
import { Popup, PopupH, PopupBody, PopupButtons } from './Popup'
import { api_pull, api_push} from '../api/api.js'

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
            return {
                ...old, 
                'data': data
            }
        }))
    }

    clickHandler(button, id) {
        console.log(this.state.data[id].orderid)
        api_push(this.api, {'orderid': this.state.data[id].orderid})
        this.setState(old => {
            const showpopup = (button.id === 1)? true:false 
            let newstate = {...old, showpopup:showpopup, 'reject_id':id}
            return newstate
        })
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
