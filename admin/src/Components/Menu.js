import React from "react"
import Table from './Table'
import { api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import { Popup, PopupH, PopupBody, PopupButtons } from './Popup'
import AddItemForm from './AddItemForm'

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
            this.setState(old => {
                return {
                    ...old, 
                    'tables': this.parse_data(d)
                }
            })
        })
    }

    showPopup(id) {
        this.setState(old => {
            let newstate = {...old}
            newstate.pshow[id] = true
            return newstate
        })
    }

    validate(state) {
    }

    onPopupClose(id, action){
        this.setState(old => {
            let newstate = {...old}
            newstate.pshow[id] = false
            delete newstate.prefill
            console.log(newstate.prefill)
            return newstate
        })
    }

    onDelete(tableid, rowid) {
        this.showPopup('delete')
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

    onRowClick(tableid, rowid){
        this.setState(old => {
            let prefill = old.tables[tableid][rowid]
            return {
                ...old,
                prefill:prefill
            }
        })
        this.showPopup('add')
    }

    render() {
        return (
            <div className = 'Menu'>

                <Popup 
                    show={this.state.pshow.delete}
                    onDataChanged={this.onDataChanged}
                >
                    <PopupH>Delete Item</PopupH>
                    <PopupBody>Are you sure you want to Delete? </PopupBody>
                    <PopupButtons>
                        <button onClick={()=>this.onPopupClose('delete')}> Close </button>
                    </PopupButtons>
                </Popup>

                <Popup 
                    show={this.state.pshow.add}
                >
                    <PopupH>Add an item</PopupH>
                    <PopupBody>
                        <AddItemForm 
                            onPopupClose={this.onPopupClose}
                            prefill={this.state.prefill}/>
                    </PopupBody>
                </Popup>

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
