import React from "react"


const InputArray = (props) =>{ 
    return (
        (props.inputs)?
        <div>
            {props.inputs.map( (e, i) => {
                return (
                    <input 
                        className = {props.classNames[i]}
                        id = 'Accept'
                        key={i} 
                        value={e} 
                        onClick={() => props.onClick({'name':e, 'id':i}, props.id)} 
                        type={props.type}/>
                )})}
            </div>
    :
        null
    )
}

export default InputArray
