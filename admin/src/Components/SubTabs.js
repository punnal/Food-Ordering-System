import React from 'react'
import { res } from "../res/res"
import {
    Link
} from "react-router-dom";

class SubTabs extends React.Component {
    constructor(props) {
        super(props)
        this.page = this.props.page
    }
    render() {
        return (
                <div className={res.admin.css_classes.DSubTabs}> 
                    {
                        Object.keys(this.page.tabs).map((e,i) => { 
                            return (
                                <Link key={i} to={`${this.page.path}${this.page.tabs[e].path}`} type='button' >
                                    <div className={res.admin.css_classes.DSubTabElement}>
                                        {e}
                                    </div>
                                </Link>
                            )})
                    }
                </div>
                )
    }
}

export default SubTabs
