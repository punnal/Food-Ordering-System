import React from "react"
import { api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import Card from './Card'

const parseData = data => {
    return Object.values(data)
}

class History extends React.Component {

    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
        this.page = res.admin.pages[this.props.id]
        this.api = this.page.api
        this.state = {'data': [], 'showpopup':false}

    }

    clickHandler() {
    }

    componentDidMount() {
        api_pull(this.api, data => 
            this.setState( old => { 
                console.log(data)
                return {
                    ...old, 
                    'data': parseData(data)
                }
            }))
    }

    render() {
        return (
            <div className = "History">
                {
                    (this.state.data)?
                    this.state.data.map((e, i) =>{
                        return (
                            <Card 
                                key={i} 
                                id = {i}
                                inputType='button'
                                data={e} 
                                onClick={this.clickHandler}/>
                        )})
                        :
                        null
                }
            </div>
        )
    }
}

export default History
