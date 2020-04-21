import React from "react"
import { res } from "../res/res"
import InputArray from "./InputArray"


const Card = () => {
    return <div> Card Placeholder </div>
}

class Deliveries extends React.Component {

    render() {
        return (
            <div className={res.admin.css_classes.Deliveries}>
                <div className={res.admin.css_classes.DSubTabs}> 
                    <InputArray inputs={res.admin.pages[this.props.id].inputs.tabs} type='button' />
                </div>
                <div className={res.admin.css_classes.DPendingContainer}>
                    <Card />
                </div>
                <div>
                    <InputArray inputs={['accept', 'reject']} type='button'/>
                </div>
            </div>
        )
    }
}

export default Deliveries
