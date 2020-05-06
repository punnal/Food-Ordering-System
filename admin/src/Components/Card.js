import React from "react"
import InputArray from "./InputArray"
import { res } from "../res/res"
import {MAP_C2T, MAP_C2S} from '../res/CodeMappings'
import Table from './Table'

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
            <h6> {item.name} </h6>
            <div className = "CardInfoInner"> {parseOptions(item.option_list_choices)} </div>
        </div>
    )
}

const parseDeals = (deal, id) => {
    return (
        <div key={id}> 
            <h6> {deal.name} </h6>
            {
                (deal.items)?
                    deal.items.map((e,i) => {
                        return (

                            <div className = "CardInfoInner" key={i}>
                                <h6> {e.name} </h6>
                                {parseOptions(e.option_list_choices)}
                            </div>
                        )})
                    :
                    null
            }

        </div>
    )
}

const parseToTableFormat = (data) => {
    return Object.keys(data).map(key => {
        let d = (key === 'deals')? 
            data[key].map((item, dealid) => parseDeals(item, dealid))
            : 
            (key === 'items')?
            data[key].map((item, itemid) => parseItem(item, itemid))
            :
                <div>
                    <h6> {key.toUpperCase()}</h6> 
                    <p> {(key === 'status')? 
                            MAP_C2S[data[key]]
                            :
                            (key === 'type')?
                            MAP_C2T[data[key]]
                            :
                            data[key]
                    } 
                </p>
            </div>

        return {
            field:key,
            data:d
        }
    })
}

const Card = (props) => {
    console.log(parseToTableFormat(props.data))
    return ( 
        <div className={res.admin.css_classes.OrdersLeftTable}>
            <Table 
                heading = {MAP_C2T[props.data.type]}
                cssClassName = "TableLeftButton"
                cols = {['Field', 'Data']}
                data = {parseToTableFormat(props.data)}
            />
            <div className={res.admin.css_classes.DeliveriesButtons}>
                <InputArray 
                    id={props.id} 
                    inputs={props.inputs} 
                    classNames={props.inputClassNames}
                    type={props.inputType} 
                    onClick={props.onClick}/>
                </div>
            </div>
                /*
        <div className = {res.admin.css_classes.DeliveriesContainer}> 
            <div className = "bg-dark text-white" id = {res.admin.css_classes.DeliveriesInfo}>
                {
                    Object.keys(props.data).map((e, i) => {
                        return (
                            (e === 'items')?
                            props.data[e].map((item, itemid) => parseItem(item, itemid))
                            :
                            (e === 'deals')?
                            props.data[e].map((item, dealid) => parseDeals(item, dealid))
                            :
                                <div className = "CardInfo" key={i}>
                                    <h6> {e.toUpperCase()}</h6> 
                                    <p> {(e === 'status')? 
                                            MAP_C2S[props.data[e]]
                                            :
                                            (e === 'type')?
                                            MAP_C2T[props.data[e]]
                                            :
                                            props.data[e]
                                    } 
                                    </p>
                                    </div>
                        )
                    })
                }
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
                        */
    )

}


export default Card
