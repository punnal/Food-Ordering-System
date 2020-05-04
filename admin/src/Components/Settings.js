import React from "react"

class Settings extends React.Component {

    constructor(){
        super()
        this.state = {'photo_url':"https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg"}
        this.onImageUpload = this.onImageUpload.bind(this)
    }

    onImageUpload(event){
        let file = event.target.files[0]
        var reader = new FileReader()
        let dataurl = ''
        reader.onload = () => {
            dataurl = reader.result
            console.log(dataurl)
            this.setState(old => {
                return {
                    ...old,
                    'photo_url':dataurl
                }
            })
        }
        reader.readAsDataURL(file)
    }

    render() {
        return (
            <div>
                <h1>Account Settings</h1>
                <h2>Change Username</h2>
                <input onChange={this.validateUsername} type="text" placeholder="Username"/>
                <br/>
                <h2>Change Password</h2>
                <input type="text" placeholder="Current Password"/>
                <br/>
                <input onChange={this.validateNewPwd} type="text" placeholder="New Password"/>
                <br/>
                <input onChange={this.validateNewPwd} type="text" placeholder="Re-enter New Password"/>
                <br/>
                <h1>Resaurant Settings</h1>
                <h2>Change Timings</h2>
                <input onChange={this.validateTime} type="text" placeholder="Open Time"/>
                <input onChange={this.validateTime} type="text" placeholder="Close Time"/>
                <br/>
                <h2>Minimum Order</h2>
                <input onChange={this.validatePrice} type="text" placeholder="Price"/>
                <br/>
                <h2>Site Banner</h2>
                <img height="200" src={this.state.photo_url}/>
                <br/>
                <input onChange={this.onImageUpload} type="file"/>
            </div>
        )
    }
}

export default Settings
