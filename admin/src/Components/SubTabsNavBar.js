import React from 'react'
import { res } from "../res/res"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {
    Link
} from "react-router-dom";

class SubTabNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.page = this.props.page
    }

    render() {
        return (
                <div className={res.admin.css_classes.DSubTabs}> 
                    {
                        this.page.tabs.map((e,i) => { 
                            return (
                                <Link 
                                    key={i} 
                                    to={`${e.path}`} >
                                    <button type = "button" className = "btn btn-success" id={res.admin.css_classes.DSubTabElement}>
                                        {e.name}
                                        {e.name !== 'Delivered' ?
                                        <OverlayTrigger 
                                            key = "top"
                                            placement = "top"
                                            overlay = {
                                            <Tooltip id = "tooltip-top">
                                                Number of orders {e.name}.
                                            </Tooltip>
                                            }
                                        > 
                                            <span id = "badge" className="badge badge-light"></span>
                                        </OverlayTrigger>
                                        : null
                                    }
                                    </button>
                                </Link>
                            )})
                    }
                </div>
                )
    }
}

export default SubTabNavBar
