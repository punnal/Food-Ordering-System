import React from "react"
import { res } from "../res/res"
import InputArray from "./InputArray"


const Card = (props) => {
    return ( 
        <div> 
            <div>
                {Object.keys(props.data).map((e, i) => {
                    return <p key={i}> {e}: {props.data[e]} </p>
                })}
            </div>
            <div className={res.admin.css_classes.DPendingButtons}>
                <InputArray inputs={['Accept', 'Reject']} type='button'/>
            </div>
        </div>
    )

}

class Deliveries extends React.Component {

    constructor() {
        super()
        this.state = {'fetched_deliveries': [
            {'Name': 'Ahmad Humayun', 'Address':'203-C Askari 11', 'Order':'something'},
            {'Name': 'Hassan Mahad', 'Address':'Falcon complex', 'Order':'something different'}
        ]}
    }

    componentDidMount() {
        console.log('mounting')
    }

    render() {
        return (
            <div className={res.admin.css_classes.Deliveries}>
                <div className={res.admin.css_classes.DSubTabs}> 
                    <InputArray inputs={res.admin.pages[this.props.id].inputs.tabs} type='button' />
                </div>
            <div className={res.admin.css_classes.DPendingContainer}>
                {this.state.fetched_deliveries.map((e, i) => <Card key={i} data={e} />)}
            </div>
            </div>
        )
    }
}

export default Deliveries
