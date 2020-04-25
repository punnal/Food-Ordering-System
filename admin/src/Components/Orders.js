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
        this.state = {'tables':{}, 'bill':{}}
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

    }

    onBillRowClick(rowid) {
    }

    onBillRowDelete(rowid){
    }

    totalBill(){
        return 100
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
                        data = {[{}]}
                    />
                </div>
            </div>
        )
    }
}

export default Orders
