import React from "react"
import Card from './Card'
import { api_pull, api_push} from '../api/api.js'

class DeliveriesSubTabs extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
        this.page = this.props.page
        this.tab_id = this.props.tab_id
        this.tab = this.page.tabs[this.tab_id]
        this.api = this.tab.api
        this.state = {'data': []}
    }

    componentDidMount() {
        api_pull(this.api, data => this.setState({'data': data}))
    }

    clickHandler(button, id) {
        this.setState(old => {
            let newdata = old.data.map((e,i) => {
                if(i === id) {
                    api_push(this.api, {'value': button})
                    return {
                        ...e,
                        'status': `${button}`
                    }
                }
                return e
            })
            return {
                ...old,
                'data': newdata
            }
        })
    }

    render() {
        return (
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
        )
    }
}

export default DeliveriesSubTabs
