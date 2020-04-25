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
        this.tables = {
            'Deals': 
            [
                {'ID':1, 'Name': 'Kamaal Deal', 'Items':[1,2,3,4], 'Image':'images', 'Price':6969}
            ],
            'Mains':
            [
                {'ID':2}
            ]
        }
    }

    componentDidMount() {
    }

    onAdd(tableid) {
    }

    onRowClick(tableid, rowid) {
    }
    onRowDelete(tableid, rowid) {
    }
    onBillRowClick(rowid) {
    }
    onBillRowDelete(rowid){
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
                                    headingButton={table.headingbutton}
                                    rowButton="Delete"
                                    cssClassName = "TableLeftButton"
                                    onRowClick={this.onRowClick}
                                    onAdd={this.onAdd}
                                    cols = {table.cols}
                                    data = {this.tables[table.heading]}
                                    onRowDelete= {this.onRowDelete}
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
                        cols = {['ID', 'Name', 'Price']}
                        data = {[{}]}
                        onRowDelete = {this.onBillRowDelete}
                    />
                </div>
            </div>
        )
    }
}

export default Orders
