import React from "react"
import InputArray from "./InputArray"
import { res } from "../res/res"


const typemap = {
    0:'Delivery',
    1:'Local'
}

const statmap = {
    0:'Pending',
    1:'In Progress',
    2:'Delivered'
}

const parseOptions =(options) => {
    return (
        options.map((e, i) => {
            return <p key={i}>{e.list_name} : {e.option_choice} </p>
        })
    )
}

const parseItem = (item, id) => {
    return (
        <div key={id}> 
            <h2> {item.name} </h2>
            <div> {parseOptions(item.option_list_choices)} </div>
        </div>
    )
}

const parseDeals = (deal, id) => {
    return <div key={id}> {deal.name} </div>
}

const Card = (props) => {
    return ( 
        <div className = {res.admin.css_classes.DeliveriesContainer}> 
            <div className = {res.admin.css_classes.DeliveriesInfo}>
                {
                    Object.keys(props.data).map((e, i) => {
                        return (
                            (e === 'items')?
                            props.data[e].map((item, itemid) => parseItem(item, itemid))
                            :
                            (e === 'deals')?
                            props.data[e].map((item, dealid) => parseDeals(item, dealid))
                            :
                                <div key={i}>
                                    <h2> {e.toUpperCase()}</h2> 
                                    <p> {(e === 'status')? 
                                            statmap[props.data[e]]
                                            :
                                            (e === 'type')?
                                            typemap[props.data[e]]
                                            :
                                            props.data[e]
                                    } 
                                </p>
                            </div>
                        )
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
