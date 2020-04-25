import React from "react"
import Table from './Table'
import { api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import Popup from './Popup'

class Menu extends React.Component {

    constructor(props){
        super(props)
        this.state = {showpopup:false, tables:{}}
        this.tables = res.admin.pages[this.props.id].tables
        this.popup = {}
        this.showPopup = this.showPopup.bind(this)
        this.onPopupClose = this.onPopupClose.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onRowClick = this.onRowClick.bind(this)

    }

    componentDidMount() {
        api_pull('/api/tables', d => {
            this.setState(old => {
                return {
                    ...old, 
                    'tables': d
                }
            })
        })
    }

    showPopup() {
        this.setState(old => {
            return {
                ...old,
                showpopup:true
            }
        })
    }

    onPopupClose(){
    }

    onDelete(tableid, rowid) {
        this.showPopup()
        console.log(`Deleting ${rowid} from ${tableid}`)
    }

    onAdd(tableid) {
        this.showPopup()
    }

    onRowClick(tableid, rowid){
        console.log(`row ${rowid} click of table ${tableid}`)
    }

    render() {
        return (
            <div>
                <Popup 
                    show={this.state.showpopup}
                    buttons={this.popup.buttons}
                    onClose={this.onPopupClose}
                />
                <div>
                    {
                        this.tables.map((table, i) => 
                            <Table 
                                key={i}
                                heading = {table.heading}
                                headingButton={table.headingbutton}
                                rowButton="Delete"
                                onRowClick={this.onRowClick}
                                onHeadingButtonClick={this.onAdd}
                                cols = {table.cols}
                                data = {this.state.tables[table.heading]}
                                onRowButtonClick= {this.onDelete}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Menu
