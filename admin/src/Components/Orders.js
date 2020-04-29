import React from "react"
import {api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import Table from './Table'
import { Popup, PopupH, PopupBody, PopupButtons} from './Popup'

class Orders extends React.Component {

    constructor(props) {
        super(props)
        this.page = res.admin.pages[this.props.id]
        this.billtable = this.page.tables.right
        this.css = res.admin.css_classes
        this.state = {'tables':{}, 'bill':[], 'showpopup':false}
        this.onAdd = this.onAdd.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
        this.onBillRowClick = this.onBillRowClick.bind(this)
        this.totalBill = this.totalBill.bind(this)
        this.onGenerateBill = this.onGenerateBill.bind(this)
        this.onPopupClose = this.onPopupClose.bind(this)
        this.showPopup = this.showPopup.bind(this)
        this.api = this.page.api
    }

    parse_deals(data) {
        let newdata = {}
        newdata['Deals'] = Object.values(data)
        return newdata
    }

    parse_menu(data) {
        Object.keys(data).forEach(e => {
            data[e] = Object.values(data[e])
        })

        return data
    }

    componentDidMount() {
        api_pull('/api/deals', deals => {
            api_pull('/api/menu', menu => {
                this.setState(old => {
                    return {
                        ...old, 
                        'tables': {
                            ...this.parse_deals(deals),
                            ...this.parse_menu(menu)
                        }
                    }
                })
            })
        })
    }

    onAdd(tableid) {
    }

    onRowClick(tableid, rowid) {
        console.log('onclick')
        let item = this.state.tables[tableid][rowid]
        this.setState(old => {
            let newbill = [...old.bill]
            let found = false
            newbill.forEach((e, i) => {
                if(e.id === item.id) {
                    e.qty += 1
                    found = true
                }
            })
            if(!found){
                item.qty = 1
                newbill = [...newbill, item]
            }
            return {
                ...old,
                'bill': [...newbill]
            }
        })
    }

    onBillRowClick(table, rowid) {
        console.log(rowid)
        this.setState(old => {
            let newbill = [...old.bill]
            newbill[rowid].qty -= 1
            if(newbill[rowid].qty === 0)
                newbill = newbill.filter( e => e.id !== newbill[rowid].id)
            let newstate = {
                ...old,
                'bill': [...newbill]
            }
            return newstate
        })
    }

    totalBill(){
        let total = 0
        this.state.bill.forEach(item => {
            total += item.price*item.qty
        })
        return total
    }

    onPopupClose() {
        this.setState(old => {return {...old, showpopup:false}})
    }

    showPopup(){
        this.setState(old => {return {...old, showpopup:true}})
    }
    onGenerateBill(){
        this.showPopup()
    }
    render() {
        return (
            <div 
                className={this.css.Orders}>
                <div 
                    className={this.css.OrdersLeftTable}
                >
                    {
                        Object.keys(this.state.tables).map((table,i) => {
                            console.log(table)
                            return (
                                <Table 
                                    key={i}
                                    heading = {table}
                                    onRowClick={this.onRowClick}
                                    cssClassName = "TableLeftButton"
                                    cols = {this.page.tables[table].cols}
                                    data = {this.state.tables[table]}
                                />
                            )})
                    }
                </div>
                <div 
                    className={this.css.OrdersRightTable}
                >
                    <Table 
                        heading = "Bill"
                        footerText = {`Total: ${this.totalBill()}`}
                        footerButton= "Generate Bill"
                        onFooterButtonClick={this.onGenerateBill}
                        cssClassName = "TableRightButton"
                        onRowClick={this.onBillRowClick}
                        cols = {['ID', 'Name', 'Price', 'Qty']}
                        data = {this.state.bill}
                    />
                </div>
                <Popup
                    show={this.state.showpopup}
                >
                    <PopupButtons>
                        <button onClick={this.onPopupClose}> Close </button> 
                    </PopupButtons>
                </Popup>
            </div>
        )
    }
}

export default Orders
