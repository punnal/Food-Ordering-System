import React from "react"

class InputArray extends React.Component {

    render() {
        return (
            <div>
                {this.props.inputs.map( e => <input value={e} type={this.props.type}/>)}
            </div>
        )
    }
}

export default InputArray
