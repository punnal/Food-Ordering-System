import React from "react"
import Card from './Card'
import { api_pull, api_push} from '../api/api.js'
import { res } from '../res/res.js'


class Pending extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
        this.page = this.props.page
        this.tab_id = this.props.tab_id
        this.state = {'tab': this.props.page.tabs[0], 'data': []}
    }
    componentDidMount() {
        api_pull(res.admin.api.pull.pending, data => this.setState({'data': data}))
    }
    clickHandler(button, id) {
        this.setState(old => {
            let newdata = old.data.map((e,i) => {
                if(i === id) {
                    const updated = (button === 'Accept')? 'Accepted' : 'Rejected'
                    api_push(res.admin.api.push.pending, {'value': updated})
                    return {
                        ...e,
                        'status': updated
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
                     inputs={this.page.tabs[this.tab_id].inputs}
                     data={e} 
                     onClick={this.clickHandler}/>
            )})
        )
    }
}


class InProgress extends React.Component {
    render() {
        return <div> SubTab Placeholder </div>
    }
}

class Delivered extends React.Component {
    render() {
        return <div> SubTab Placeholder </div>
    }
}

export {
    Pending,
    InProgress,
    Delivered
}
