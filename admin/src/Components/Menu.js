import React from "react"
import Table from './Table'
import { api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import { Popup, PopupH, PopupBody, PopupButtons } from './Popup'

class Menu extends React.Component {

    constructor(props){
        super(props)
        this.css = res.admin.css_classes
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
        })
    }

    onPopupClose(id){
        this.setState(old => {
            let newstate = {...old}
            newstate.pshow[id].show = false
        })
    }

    onDelete(tableid, rowid) {
        this.showPopup('delete')
        console.log(`Deleting ${rowid} from ${tableid}`)
    }

    onAdd(tableid) {
        this.showPopup('add')
    }

    onRowClick(tableid, rowid){
        this.showPopup('add')
        console.log(`row ${rowid} click of table ${tableid}`)
    }

    render() {
        return (
            <div className = 'Menu'>
                <Popup 
                    show={this.state.pshow.delete}
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
                    <PopupBody> Name, Image, something something</PopupBody>
                    <PopupButtons>
                        <button onClick={()=>this.onPopupClose('add')}> Close </button>
                    </PopupButtons>
                </Popup>
                <div className={this.css.OrdersLeftTable}>
                    {
                        this.tables.map((table, i) => 
                            <Table 
                                key={i}
                                heading = {table.heading}
                                headingButton={table.headingbutton}
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
