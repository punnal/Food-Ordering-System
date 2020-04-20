import React from "react"
import { res } from "../res/res"
import InputArray from "./InputArray"


class Deliveries extends React.Component {

    render() {
        return (
            <div className={res.admin.css_classes.Deliveries}>
                <div className={res.admin.css_classes.DSubTabs}> 
                    <InputArray inputs={['Pending', 'In Progress', 'Completed', 'Delivery History']} />
                </div>
                <div className={res.admin.css_classes.DPendingContainer}>
                </div>
            </div>
        )
    }
}

export default Deliveries
