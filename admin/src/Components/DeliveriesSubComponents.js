import React from "react"
import Card from './Card'

const parseDeliveries = (data) => {
    return data
}

class Pending extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
        this.state = {'tab': this.props.page.tabs[0], 'data': []}
    }
    componentDidMount() {
        fetch('/api/deliveies')
            .then(response => response.json())
            .then(json => {
                this.setState({'data': parseDeliveries(json.data)})
            })
    }
    clickHandler(button, id) {
        this.setState(old => {
            let newdata = old.data.map((e,i) => {
                if(i === id) {
                    return {
                        ...e,
                        'status': (button === 'Accept')? 'Accepted' : 'Rejected'
                    }
                }
                return e
            })
            return {
                ...old,
                'data': newdata
            }
        })
    }
    render() {
        return (
            this.state.data.map((e, i) =>{
                return (
                 <Card 
                     key={i} 
                     id = {i}
                     inputType='button'
                     inputs={['Accept', 'Reject']}
                     data={e} 
                     onClick={this.clickHandler}/>
            )})
        )
    }
}


class InProgress extends React.Component {
    render() {
        return <div> SubTab Placeholder </div>
    }
}

class Delivered extends React.Component {
    render() {
        return <div> SubTab Placeholder </div>
    }
}

export {
    Pending,
    InProgress,
    Delivered
}
