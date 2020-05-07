import React from "react"
import InputArray from "./InputArray"
import { res } from "../res/res"
import {MAP_C2T, MAP_C2S} from '../res/CodeMappings'
import Table from './Table'

const parseOptions =(options) => {
    return (
        <ul>
            {
            options.map((e, i) => {
                return (
                    <div key={i}><li style={{'listStyleType': 'circle'}} key={i}>{e.list_name} : {e.option_choice} </li><br/></div>
                )
            })
            }
        </ul>
    )
}

const parseItem = (item, id) => {
    return (
        <div key={id}> 
            <h6> {item.name} </h6>
            <div className = "CardInfoInner"> 
                <div>
                    {parseOptions(item.option_list_choices)} 
                </div>
            </div>
        </div>
    )
}

const parseDeals = (deal, id) => {
    return (
        <div key={id}> 
            <h5 style={{'fontWeight':'bold', 'textDecoration': 'underline overline'}}> {deal.name} </h5>
            {
                (deal.items)?
                    deal.items.map((e,i) => {
                        return (

                            <div key={i}>
                                <h6> {e.name} </h6>
                                <div>
                                    {parseOptions(e.option_list_choices)}
                                </div>
                            </div>
                        )})
                    :
                    null
            }

        </div>
    )
}
const tstampToTime = (tstamp) => {

    // Months array
    const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    // Convert timestamp to milliseconds
    const date = new Date(parseInt(tstamp));

    // Year
    const year = date.getFullYear();

    // Month
    const month = months_arr[date.getMonth()];

    // Day
    const day = date.getDate();

    // Hours
    const hours = date.getHours();

    // Minutes
    const minutes = "0" + date.getMinutes();

    // Display date time in DD-Month-YYYY HH:MM AM/PM format
    return `${day}-${month}-${year} @ ${(hours>12)? hours-12: hours}:${minutes.substr(-2)} ${(hours>=12)? 'PM': 'AM'}`
 
}
const parseToTableFormat = (data) => {
    let _data = {...data}
    if(MAP_C2T[data.type] === 'Local'){
        delete _data.address
        delete _data.contact_no
        delete _data.email
    }
    let keys = Object.keys(_data)
    return keys.map(key => {
        let d = 
            (key === 'deals')? 
            data[key].map((item, dealid) => parseDeals(item, dealid))
            : 
            (key === 'items')?
            data[key].map((item, itemid) => parseItem(item, itemid))
            :
                <div>
                    <p> {(key === 'status')? 
                            MAP_C2S[data[key]]
                            :
                            (key === 'type')?
                            MAP_C2T[data[key]]
                            :
                            (key === 'time')?
                            tstampToTime(data[key])
                            :
                            data[key]
                    } 
                </p>
            </div>

        return {
            field:key.toUpperCase(),
            data:d
        }
    })
}

const Card = (props) => {
    return ( 
        <div className="DeliveriesTable">
            <div className={res.admin.css_classes.DeliveriesButtons}>
                <InputArray 
                    id={props.id} 
                    inputs={props.inputs} 
                    classNames={props.inputClassNames}
                    type={props.inputType} 
                    onClick={props.onClick}/>
            </div>
            <Table 
                heading = {MAP_C2T[props.data.type]}
                cssClassName = ""
                cols = {['Field', 'Data']}
                data = {parseToTableFormat(props.data)}
            />
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
