import React from "react"


const InputArray = (props) =>{ 
    return (
        <div>
            {props.inputs.map( (e, i) => {
                return (
                    <input 
                        className = {props.classNames[i]}
                        key={i} 
                        value={e} 
                        onClick={() => props.onClick(e, props.id)} 
                        type={props.type}/>
                )})}
            </div>
    )
}

export default InputArray
