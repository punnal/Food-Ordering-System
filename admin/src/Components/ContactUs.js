import React from "react"
import {api_pull, api_push} from '../api/api'

class ContactUs extends React.Component {

    constructor(){
        super()
        this.state = {
            data:{
                email:'',
                phone:'',
                address:''

        }}
        this.onChange = this.onChange.bind(this)
        this.loadFromDB = this.loadFromDB.bind(this)
        this.onSave = this.onSave.bind(this)
        this.api = '/admin/api/contactus'
    }

    loadFromDB(){
        api_pull(this.api, data => {
            this.setState(old => {
                return {
                    ...old,
                    data:{
                        ...data
                    }
                }
            })
        })
    }

    componentDidMount(){
        this.loadFromDB()
    }

    onChange(event){
        const {id, value} = event.target
        this.setState(old => {
            return {
                ...old,
                data:{
                    ...old.data,
                    [id]:value
                }
            }
        })
    }

    onSave() {
        api_push(this.api, this.state.data)
        this.loadFromDB()
    }

    render() {
        return (
            <div id="ContactUsMain" class="container pt-3">
                <label id="AboutUsHeading"> Phone </label>
                <input
                    class="form-control"
                    onChange={this.onChange}
                    id="phone"
                    value={this.state.data.phone}
                />
                <label id="AboutUsHeading"> Email </label>
                <input
                    class="form-control"
                    onChange={this.onChange}
                    id="email"
                    value={this.state.data.email}
                />
                <label id="AboutUsHeading"> Address </label>
                <input
                    class="form-control"
                    onChange={this.onChange}
                    id="address"
                    value={this.state.data.address}
                />
                <button id="ContactUsButton" class="btn btn-success" onClick={this.onSave}> Save Changes </button>
            </div>
        )
    }
}

export default ContactUs
