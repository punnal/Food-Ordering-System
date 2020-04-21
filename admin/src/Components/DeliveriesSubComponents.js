import React from "react"
import Card from './Card'

class Pending extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'tab': this.props.page.tabs[0], 'fetched_deliveries': []}
    }
    componentDidMount() {
        fetch('/api/deliveies')
            .then(response => response.json())
            .then(json => {
                this.setState({'fetched_deliveries': json.data})
            })
    }
    render() {
        return (
            this.state.fetched_deliveries.map((e, i) => <Card key={i} data={e} />)
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
