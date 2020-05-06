import React from "react"
import {Redirect} from "react-router-dom"


const Signout = (props) => {
    props.deAuth()
    return <Redirect to='/login'/>
}

export default Signout
