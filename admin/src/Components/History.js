import React from "react"
import { api_pull} from '../api/api'
import { res } from '../res/res'
import Card from './Card'

const parseData = data => {
    return Object.values(data)
}

class History extends React.Component {

    constructor(props) {
        super(props)
        this.page = res.admin.pages[this.props.id]
        this.api = this.page.api
        this.state = {
            'data': [],
            'filters':{
                'time':{
                    'asc':false
                }
            }
        }

    }

    componentDidMount() {
        api_pull(this.api, data => 
            this.setState( old => { 
                console.log(data)
                return {
                    ...old, 
                    'data': this.applyFilters(parseData(data), this.state.filters)
                }
            }))
    }

    sortByTime(data, asc){
        return data.sort((a,b)=> asc? a.time>b.time: a.time<b.time)
    }

    applyFilters(data, filters){
        return this.sortByTime(data, filters.time.asc)
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
                                />
                        )})
                        :
                        null
                }
            </div>
        )
    }
}

export default History
