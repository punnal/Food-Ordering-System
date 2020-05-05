import React from "react"

class ContactUs extends React.Component {

    constructor(){
        super()
        this.state = {data:{}}
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
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

    render() {
        return (
            <div id="AboutUsMain" class="container pt-3">
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
            </div>
        )
    }
}

export default ContactUs
