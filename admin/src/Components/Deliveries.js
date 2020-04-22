import React from "react"
import { res } from "../res/res"
import SubTabs from "./SubTabs"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class Deliveries extends React.Component {

    constructor(props) {
        super(props)
        this.page = res.admin.pages[this.props.id]
    }



    render() {
        return (
            <Router>
            <div className={res.admin.css_classes.Deliveries}>
                <SubTabs page={this.page}/>
                <div className={res.admin.css_classes.DeliveriesSubTabClicked}>
                {
                    Object.keys(this.page.tabs).map((e, i) => {
                        return (
                            <Switch key={i}>
                                <Route exact path={`${this.page.path}${this.page.tabs[e].path}`} component={() => React.createElement(this.page.tabs[e].component, {'page':this.page})} />
                            </Switch>
                        )})
                }
                </div>
            </div>
        </ Router>
        )
    }
}

export default Deliveries
