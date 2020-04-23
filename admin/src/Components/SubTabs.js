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
                        this.page.tabs.map((e,i) => { 
                            return (
                                <Link 
                                    key={i} 
                                    to={`${this.page.path}${e.path}`} >

                                    <div className={res.admin.css_classes.DSubTabElement}>
                                        {e.name}
                                    </div>
                                </Link>
                            )})
                    }
                </div>
                )
    }
}

export default SubTabs
