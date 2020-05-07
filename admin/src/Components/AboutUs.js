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
        this.api = '/admin/api/aboutus'
        this.loadData = this.loadData.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    loadData() {
        api_pull(this.api, data => {
            this.originalData = parseData(data)
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
            <div id="AboutUsMain" class="container pt-3">
                <label id="AboutUsHeading"> Heading </label>
                <textarea class="form-control"
                    id="heading"
                    onChange={this.onTextChange}
                    value={this.state.data.heading}
                />

                <label id="AboutUsBody"> Body </label>
                <textarea class="form-control"
                    id="body"
                    onChange={this.onTextChange}
                    value={this.state.data.body}
                />

                <button id="AboutUsButton" class="btn btn-success" onClick={() => this.onSave(!_.isEqual(this.originalData, this.state.data), this.state.data)}> Save Changes </button>
            </div>
        )
    }
}

export default AboutUs
