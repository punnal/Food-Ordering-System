import React from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Alert from 'react-bootstrap/Alert'

class Settings extends React.Component {

    constructor(){
        super()
        this.state = {'photo_url':"https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg", visible:false}
        this.onImageUpload = this.onImageUpload.bind(this)
        this.handleClick = this.handleClick.bind(this)
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

    handleClick(){
        this.setState({visible:true}, () =>{
            window.setTimeout(() => {
                this.setState({visible:false})
            }, 2000)
        })
    }

    render() {
        return (
            <div>
                <div className = "Marginer"></div>
                <div id = "AccountSettings" className = "container mt-5 pt-3 mb-5 pb-3">
                    <h1 id = "AccountSettingsHeading">Account Settings</h1>
                    <form id = "form" className="needs-validation"  action = "/action_page.php" novalidate>
                        <h2>Change Username</h2>
                        <div className = "form-group">
                            <input className = "form-control" onChange={this.validateUsername} type="text" placeholder="Username" required />
                        </div>
                        <OverlayTrigger 
                            key = "left"
                            placement = "left"
                            overlay = {
                                <Tooltip id = "tooltip-left">
                                    Password must be atleast <strong>8</strong> character long, having atleast <strong>one upper case character</strong>, <strong>one lower case character</strong>, and <strong>one digit</strong>.
                                </Tooltip>
                            }
                        >
                        <h2>Change Password</h2>
                        </OverlayTrigger>
                        <div className = "form-group">
                            <input type = "password" className = "form-control" id = "pass" placeholder = "Current Password" name = "passwords" required />
                        </div>
                        <div className = "form-group">
                            <input className = "form-control" onChange={this.validateNewPwd} type="password" placeholder="New Password" pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required />
                        </div>
                        <div className = "form-group">
                            <input className = "form-control" onChange={this.validateNewPwd} type="password" placeholder="Re-enter New Password" required/>
                        </div>
                        <h1>Resaurant Settings</h1>
                        <h2>Change Timings</h2>
                        <div className = "form-group">
                            <input className = "form-control" onChange={this.validateTime} type="date" required/>
                        </div>
                        <div className = "form-group">
                            <input className = "form-control" onChange={this.validateTime} type="date" required/>
                        </div>
                        <h2>Minimum Order</h2>
                        <div className = "input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Rs</span>
                            </div>
                            <input className = "form-control" onChange={this.validatePrice} type="numbers" placeholder="00"/>
                        </div>
                        <h2>Site Banner</h2>
                        <img id = "AccountSettingsImage" className = "rounded" alt = "Uploaded Image" height="200" src={this.state.photo_url}/>
                        <div className = "custom-file">
                            <input type="file" id = "customFile" className = "custom-file-input" onChange={this.onImageUpload} name = "filename" required/>
                            <label className="custom-file-label" for="customFile">Choose image file to upload</label>
                        </div>
                        <button onClick = {this.handleClick} type = "submit" className = "btn mt-3 btn-dark">Save</button>
                        <Alert variant = "success" show = {this.state.visible}>
                            <strong>Changes Saved Succesfully!</strong>
                        </Alert>
                    </form>
                </div>
            </div>
        )
    }
}

export default Settings