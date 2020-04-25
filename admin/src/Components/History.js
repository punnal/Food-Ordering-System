import React from "react"
import Card from './Card'

class History extends React.Component {

    render() {
        return (
            <>
                {
                    this.state.data.map((e, i) =>{
                        return (
                            <Card 
                                key={i} 
                                id = {i}
                                inputType='button'
                                inputClassNames= {this.tab.buttonscss}
                                inputs={this.tab.buttons}
                                data={e} 
                                onClick={this.clickHandler}/>
                        )})
                }
            </>
        )
    }
}

export default History
