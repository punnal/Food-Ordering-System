import React from "react"
import InputArray from "./InputArray"
import { res } from "../res/res"

const Card = (props) => {
    return ( 
        <div className = {res.admin.css_classes.DeliveriesContainer}> 
            <div className = {res.admin.css_classes.DeliveriesInfo}>
                {
                    Object.keys(props.data).map((e, i) => {
                        return <p key={i}> {e}: {props.data[e]} </p>
                })}
            </div>
            <div className={res.admin.css_classes.DeliveriesButtons}>
                <InputArray 
                    id={props.id} 
                    inputs={props.inputs} 
                    classNames={props.inputClassNames}
                    type={props.inputType} 
                    onClick={props.onClick}/>
            </div>
        </div>
    )

}
export default Card
