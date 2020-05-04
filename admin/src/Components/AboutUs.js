import React from "react"
import _ from "lodash"
import {api_push, api_pull} from '../api/api'

const parseData = (data) => {
    return data
}

class AboutUs extends React.Component {

    constructor() {
        super()
        this.state = {data:{heading:"", body:""}}
        this.originalData = {}
        this.api = '/api/aboutus'
        this.loadData = this.loadData.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    loadData() {
        api_pull(this.api, data => {
            this.originalData = parseData(data)
            console.log(data)
            this.setState(old => {
                return {
                    ...old,
                    data:parseData(data)
                }
            })
        })
    }

    componentDidMount() {
        this.loadData()
    }

    onSave(changed, data){
        if(!changed)
            return

        api_push(this.api, {edit:data})
        this.loadData()
    }

    onTextChange(event){
        const {id, value} = event.target
        this.setState(old => {
            return {
                ...old,
                data: {
                    ...old.data,
                    [id]:value
                }
            }
        })
    }


    render() {
        return (
            <div>
                <label> Heading </label>
                <textarea 
                    id="heading"
                    onChange={this.onTextChange}
                    value={this.state.data.heading}
                />

                <label> Body </label>
                <textarea 
                    id="body"
                    onChange={this.onTextChange}
                    value={this.state.data.body}
                />

                <button onClick={() => this.onSave(!_.isEqual(this.originalData, this.state.data), this.state.data)}> Save Changes </button>
            </div>
        )
    }
}

export default AboutUs
