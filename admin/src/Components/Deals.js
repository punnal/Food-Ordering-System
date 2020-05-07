import React from "react"
import Table from './Table'
import { api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import AddDealPopup from './AddDealPopup'
import DeleteItemPopup from './DeleteItemPopup'
import Parsers from './Parsers'


class Deals extends React.Component {

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
        this.onDealChanged = this.onDealChanged.bind(this)
        this.updateTables = this.updateTables.bind(this)
        this.state = {'tables':[], 'pshow':{
            'add':false,
            'delete':false
        }}

    }

    updateTables() {
        api_pull('/admin/api/menu', menu => {
            this.menu = menu
            api_pull(this.api, d => {
                console.log(d)
                this.setState(old => {
                    return {
                        ...old, 
                        'tables': this.parse_data(d)
                    }
                })
            })
        })
    }
    componentDidMount() {
        this.updateTables()
    }

    parse_data(data) {
        let newdata = {}
        newdata['Deals'] = Object.values(data)
        return newdata
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
        const [table, row] = this.state.staged_delete
        console.log('deleting')
        api_push('/admin/api/deals', Parsers.parseDealsBeforePush(this.state.tables[table][row], 'delete'))
        this.updateTables()
        //remove from state as well
        this.setState(old => {
            let newstate = {...old}
            delete newstate.staged_delete
            return newstate
        })
    }

    onDeletePopupClose(action){
        this.hidePopup('delete')
        if(action === 'confirm')
            this.delete_item(this.state.staged_delete)
    }

    hidePopup(popup){
        this.setState(old => {
            let newstate = {...old}
            newstate.pshow[popup] = false
            return newstate
        })
    }

    onPopupClose(action){
        this.hidePopup('add')
        console.log('action', action)
    }

    onDelete(tableid, rowid) {
        this.showPopup('delete', tableid, rowid)
    }

    onAdd() {
        this.setState(old => {
            let prefill = {
                'name':'',
                'description':'',
                'items': [],
                'photo_url':'',
                'price':''
            }
            return {
                ...old,
                prefill:prefill,
                type:'add'
            }
        })
        this.showPopup('add')
    }

    onRowClick(tableid, rowid){
        this.setState(old => {
            const prefill = old.tables[tableid][rowid]
            return {
                ...old,
                prefill:prefill,
                type:'edit'
            }
        })
        this.showPopup('add')
    }

    onDealChanged(changed, state, type){
        this.hidePopup('add')
        if(!changed)
            return
        api_push('/admin/api/deals', Parsers.parseDealsBeforePush(state, type))
        this.updateTables()
    }

    render() {
        return (
            <div className = 'Menu'>
                {
                    this.state.pshow.add?
                        <AddDealPopup 
                            show = {this.state.pshow.add}
                            onClose = {() => this.hidePopup('add')}
                            onAdd = {this.onDealChanged}
                            prefill = {this.state.prefill}
                            menu = {this.menu}
                            type = {this.state.type}
                        />
                        :
                        null
                }
                <DeleteItemPopup
                    show = {this.state.pshow.delete}
                    onClose = {this.onDeletePopupClose}
                />
                <div className={this.css.OrdersLeftTable}>
                    {
                        Object.keys(this.state.tables).map((table, i) => 
                            <Table 
                                key={i}
                                heading = {'Deals'}
                                headingButton={this.headingButton}
                                onAdd={this.onAdd}
                                rowButton="Delete"
                                cssClassName = "TableLeftButton"
                                onRowClick={this.onRowClick}
                                onHeadingButtonClick={this.onAdd}
                                cols = {['ID', 'Name', 'Items', 'Image', 'Price']}
                                data = {this.state.tables[table]}
                                onRowButtonClick= {this.onDelete}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Deals
