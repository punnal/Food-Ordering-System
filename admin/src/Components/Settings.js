import React from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Alert from 'react-bootstrap/Alert'
import {api_pull, api_push} from '../api/api'

class Settings extends React.Component {

    constructor(){
        super()
        this.state = {
            data: {
                username:'mushtaq',
                password:'',
                newPassword1:'',
                newPassword2:'',
                minOrder:'',
                otime:'',
                ctime:'',
                photo_url:"https://i.ytimg.com/vi/L6yX6Oxy_J8/maxresdefault.jpg", 
            },
            visible:false
        }
        this.onImageUpload = this.onImageUpload.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onChange = this.onChange.bind(this)
        this.pullFromDB = this.pullFromDB.bind(this)
        this.api = '/admin/api/settings'
    }

    pullFromDB(){
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
        this.pullFromDB()
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
                    data:{
                        ...old.data,
                        'photo_url':dataurl
                    }
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

    onChange(event) {
        const {id, value} = event.target
        this.setState(old => {
            return {
                ...old,
                data:{
                    ...old.data,
                    [id]: value
                }
            }
        })
    }

    onSave(){
        if(this.state.newPassword1 !== this.state.newPassword2){
            console.log('not sending')
        }
        api_push(this.api, this.state.data)
    }

    render() {
        console.log(this.state.data)
        return (
            <div>
                <div className = "Marginer"></div>
                <div id = "AccountSettings" className = "container mt-5 pt-3 mb-5 pb-3">
                    <h1 id = "AccountSettingsHeading">Account Settings</h1>
                        <h2>Change Username</h2>
                        <div className = "form-group">
                            <input value={this.state.data.username} className = "form-control" id="username" onChange={this.onChange} type="text" placeholder="Username" required />
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
                            <input value ={this.state.data.password} type = "password" onChange={this.onChange} className = "form-control" id = "password" placeholder = "Current Password" name = "passwords" required />
                        </div>
                        <div className = "form-group">
                            <input value={this.state.data.newPassword1} className = "form-control" onChange={this.onChange} type="password" id="newPassword1" placeholder="New Password"  required />
                        </div>
                        <div className = "form-group">
                            <input value={this.state.data.newPassword2} className = "form-control" onChange={this.onChange} type="password" id="newPassword2" placeholder="Re-enter New Password" required/>
                        </div>
                        <h1>Resaurant Settings</h1>
                        <h2>Change Timings</h2>
                        <div className = "form-group">
                        <div class="input-group-prepend">
                                <span class="input-group-text">Opening</span>
                            </div>
                            <input id="SettingOpening" value={this.state.data.otime} className = "form-control" onChange={this.onChange} type="time" required/>
                        </div>
                        <div className = "form-group">
                        <div class="input-group-prepend">
                                <span class="input-group-text">Closing</span>
                            </div>
                            <input id="SettingClosing" value={this.state.data.ctime} className = "form-control" onChange={this.onChange} type="time" required/>
                        </div>
                        <h2>Minimum Order</h2>
                        <div className = "input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Rs</span>
                            </div>
                            <input id="minOrder" value={this.state.data.minOrder} className = "form-control" onChange={this.onChange} type="numbers" placeholder="00"/>
                        </div>
                        <h2>Site Banner</h2>
                        <img id = "AccountSettingsImage" className = "rounded" alt = "Uploaded Image" height="200" src={this.state.data.photo_url}/>
                        <div className = "custom-file">
                            <input type="file" id = "customFile" className = "custom-file-input" onChange={this.onImageUpload} name = "filename"/>
                            <label className="custom-file-label" for="customFile" value={this.state.data.photo_url}>Choose image file to upload</label>
                        </div>
                        <button onClick = {this.onSave}  className = "btn mt-3 btn-dark">Save</button>
                        <Alert variant = "success" show = {this.state.visible}>
                            <strong>Changes Saved Succesfully!</strong>
                        </Alert>
                </div>
            </div>
        )
    }
}

export default Settings
