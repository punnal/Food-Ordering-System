import React from "react"
import {api_pull, api_push } from '../api/api'
import { res } from '../res/res'


class Table extends React.Component {

    constructor(props) {
        super(props)
        this.css = res.admin.css_classes
    }

    render() {
        return (
            <div>
                <div 
                    className={this.css.TableHeadingAndButtonDiv}
                >
                    <h2 
                        className={this.css.TableHeading}>{this.props.heading}
                    </h2> 
                    {
                        (this.props.headingButton)?
                            <button 
                                className={this.css.TableAddButton} 
                                onClick={this.props.onAdd}
                            > 
                                {this.props.headingbutton} 
                            </button>
                            :
                            null
                    }
                </div>
                <table>
                    <thead>
                        <tr 
                            className={this.css.TableColumnHeadings}
                        >
                            {
                                this.props.cols.map((col,i) => <th key={i}> {col} </th>) 
                            }
                        </tr>
                    </thead>
                    <tbody 
                        className={this.css.TableBody}
                    >
                        { 
                            this.props.data.map((row,i) => {
                                return (
                                    <tr 
                                        className = {this.css.TableRow} 
                                        key={i}
                                    >
                                        {
                                            this.props.cols.map(
                                                (e,i) => <td key={i}>{row[e]}</td>
                                            )
                                        } 
                                            {
                                                (this.props.rowButton)?
                                                    <td> <button> {this.props.rowButton} </button> </td>
                                                    :
                                                    null
                                            }
                                        </tr>
                                )

                            })}
                        </tbody>
                    </table>
                    {
                        (this.props.footerButton)?
                            <button> {this.props.footerButton} </button>
                            :
                            null
                    }
                </div>
        )
    }
}

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
