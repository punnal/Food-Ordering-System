import React from "react"
import Table from './Table'
import { api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import { Popup, PopupH, PopupBody, PopupButtons } from './Popup'
import AddItemPopup from './AddItemPopup'
import DeleteItemPopup from './DeleteItemPopup'

class Menu extends React.Component {

    constructor(props){
        super(props)
        this.css = res.admin.css_classes
        this.headingButton = 'Add'
        this.api = res.admin.pages[this.props.id].api
        this.tables = res.admin.pages[this.props.id].tables
        this.showPopup = this.showPopup.bind(this)
        this.onPopupClose = this.onPopupClose.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
        this.parse_data = this.parse_data.bind(this)
        this.hidePopup = this.hidePopup.bind(this)
        this.onDeletePopupClose = this.onDeletePopupClose.bind(this)
        this.state = {'tables':{}, 'pshow':{
            'add':false,
            'delete':false
        }}

    }

    parse_data(data) {
        Object.keys(data).forEach(e => {
            data[e] = Object.values(data[e])
        })

        return data
    }

    componentDidMount() {
        api_pull(this.api, d => {
            console.log(d)
            this.setState(old => {
                return {
                    ...old, 
                    'tables': this.parse_data(d)
                }
            })
        })
    }

    showPopup(id, table, row) {
        this.setState(old => {
            let newstate = {...old}
            newstate.pshow[id] = true
            if(id==='delete')
                newstate.staged_delete = [table, row]
            return newstate
        })
    }

    validate(state) {
    }

    delete_item(){
        //api call to delete item from database
        //remove staged_delete and row from state
    }

    onDeletePopupClose(action){
        console.log(action)
        this.hidePopup('delete')
        this.setState(old => {
            if(action === 'confirm')
                this.delete_item(old.staged_delete)
        })
    }

    hidePopup(popup){
        this.setState(old => {
            let newstate = {...old}
            newstate.pshow[popup] = false
            return newstate
        })
    }

    onPopupClose(action, changed, state){
        console.log(changed, state)
        this.hidePopup('add')
    }

    onDelete(table, row) {
        this.showPopup('delete', table, row)
    }

    onAdd(tableid) {
        this.setState(old => {
            let prefill = {
            'name':'',
            'description':'',
            'options_lists':[{'':{'':''}}],
            'photo_url':'',
            'price':''
        }
            return {
                ...old,
                prefill:prefill
            }
        })
        this.showPopup('add')
    }

    onRowClick(table, row){
        this.setState(old => {
            let prefill = old.tables[table][row]
            return {
                ...old,
                staged_change:[table, row],
                prefill:prefill
            }
        })
        this.showPopup('add')
    }

    render() {
        return (
            <div className = 'Menu'>
                <AddItemPopup 
                    show = {this.state.pshow.add}
                    onClose = {this.onPopupClose}
                    prefill = {this.state.prefill}
                />
                <DeleteItemPopup
                    show = {this.state.pshow.delete}
                    onClose = {this.onDeletePopupClose}
                />

                <div className={this.css.OrdersLeftTable}>
                    {
                        this.tables.map((table, i) => 
                            <Table 
                                key={i}
                                heading = {table.heading}
                                headingButton={this.headingButton}
                                onAdd={this.onAdd}
                                rowButton="Delete"
                                cssClassName = "TableLeftButton"
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
