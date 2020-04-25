import React from "react"
import Card from './Card'
import Popup from './Popup'
import { api_pull, api_push} from '../api/api.js'

class DeliveriesSubTabs extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
        this.page = this.props.page
        this.tab_id = this.props.tab_id
        this.tab = this.page.tabs[this.tab_id]
        this.api = this.tab.api
        this.state = {'data': [], 'showpopup':false}
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
            let newstate = {...old, showpopup:showpopup}
            delete newstate.data[id]
            return newstate
        })
    }

    render() {
        return (
            <div>
                <Popup  
                    text = 'Are you sure?'
                    show = {this.state.showpopup}
                    onClose={() => this.setState(old => {
                        return {
                            ...old,
                            showpopup:false
                        }
                    })}/>
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
