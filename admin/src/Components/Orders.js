import React from "react"
import {api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import Table from './Table'

class Orders extends React.Component {

    constructor(props) {
        super(props)
        this.page = res.admin.pages[this.props.id]
        this.billtable = this.page.tables.right
        this.css = res.admin.css_classes
        this.state = {'tables':{}, 'bill':[]}
        this.onAdd = this.onAdd.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
        this.onBillRowClick = this.onBillRowClick.bind(this)
        this.totalBill = this.totalBill.bind(this)
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

    onAdd(tableid) {
    }

    onRowClick(tableid, rowid) {
        console.log('onclick')
        let item = this.state.tables[tableid][rowid]
        this.setState(old => {
            let newbill = [...old.bill]
            let found = false
            newbill.forEach((e, i) => {
                if(e.ID === item.ID) {
                    e.Qty += 1
                    found = true
                }
            })
            if(!found){
                item.Qty = 1
                newbill = [...newbill, item]
            }
            return {
                ...old,
                'bill': [...newbill]
            }
        })
    }

    onBillRowClick(rowid) {
    }

    totalBill(){
        let total = 0
        this.state.bill.forEach(item => {
            total += item.Price*item.Qty
        })
        return total
    }
    render() {
        return (
            <div 
                className={this.css.Orders}>
                <div 
                    className={this.css.OrdersLeftTable}
                >
                    {
                        this.page.tables.left.map((table,i) => {
                            return (
                                <Table 
                                    key={i}
                                    heading = {table.heading}
                                    onRowClick={this.onRowClick}
                                    cssClassName = "TableLeftButton"
                                    cols = {table.cols}
                                    data = {this.state.tables[table.heading]}
                                />
                            )})
                    }
                </div>
                <div 
                    className={this.css.OrdersRightTable}
                >
                    <Table 
                        heading = "Bill"
                        footerButton= "Generate Bill"
                        cssClassName = "TableRightButton"
                        onRowClick={this.onBillRowClick}
                        footerText = {`Total: ${this.totalBill()}`}
                        cols = {['ID', 'Name', 'Price', 'Qty']}
                        data = {this.state.bill}
                    />
                </div>
            </div>
        )
    }
}

export default Orders
