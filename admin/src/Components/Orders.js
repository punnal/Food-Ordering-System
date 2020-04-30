import React from "react"
import {api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import Table from './Table'
import { Popup, PopupH, PopupBody, PopupButtons} from './Popup'
import Parsers from './Parsers'

class Orders extends React.Component {

    constructor(props) {
        super(props)
        this.page = res.admin.pages[this.props.id]
        this.billtable = this.page.tables.right
        this.css = res.admin.css_classes
        this.state = {'tables':{}, 'bill':[], 'showpopup':false, 'checked':{}}
        this.onAdd = this.onAdd.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
        this.onBillRowClick = this.onBillRowClick.bind(this)
        this.totalBill = this.totalBill.bind(this)
        this.onGenerateBill = this.onGenerateBill.bind(this)
        this.showPopup = this.showPopup.bind(this)
        this.api = this.page.api
        this.showOptionsPopup = this.showOptionsPopup.bind(this)
        this.createCheckBox = this.createCheckBox.bind(this)
        this.hideOptionsPopup = this.hideOptionsPopup.bind(this)
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

    addToBill(table, row, options){
        let item = this.state.tables[table][row]
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

    onRowClick(table, row) {
        this.showOptionsPopup(table, row)
    }


    initCheckBoxState(table, row) {
        const ol = this.parseOptionsLists(table, row)
        let dic = {}
        Object.keys(ol).forEach(item => {
            dic[item] = {}
            ol[item].forEach(list => {
                dic[item][list.name] = {}
                Object.keys(list.options).forEach(option_name => {
                    dic[item][list.name][option_name] = false
                })
            })
        })
        return dic
    }

    parseOptionsLists(table, rowid) {
        const row = this.state.tables[table][rowid]
        return (table === 'Deals')
                ?
                Parsers.parseDealOptions(row.items)
                : 
                Parsers.parseItemOptions(row.options_lists, row.name)
    }

    showOptionsPopup(table, row) {
        this.setState(old => {
            return {
                ...old,
                showpopup:true,
                options_lists:this.parseOptionsLists(table, row),
                checked:this.initCheckBoxState(table, row)
            }
        })
    }

    hideOptionsPopup() {
        this.setState(old => {
            return {
                ...old,
                showpopup:false
            }
        })
    }

    onBillRowClick(table, row) {
        this.setState(old => {
            let newbill = [...old.bill]
            newbill[row].qty -= 1
            if(newbill[row].qty === 0)
                newbill = newbill.filter( e => e.id !== newbill[row].id)
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

    showPopup(){
        this.setState(old => {return {...old, showpopup:true}})
    }
    onGenerateBill(){
        this.showPopup()
    }

    onChecked(item, listName, option) {
        this.setState(old => {
            let newstate = {...old}
            let ref = newstate.checked[item][listName]
            Object.keys(ref).forEach(e => {
                newstate.checked[item][listName][e] = e===option
            })
            return newstate
        })
    }

    createCheckBox(list, item) {
        return (
            <>
                <h2> {list.name} </h2>
                {
                    Object.keys(list.options).map((option, i) => {
                        return (
                            <div key={i}>
                                <input 
                                    type="radio" 
                                    checked={this.state.checked[item][list.name][option]}
                                    onChange={() => this.onChecked(item, list.name, option)}
                                />
                                <label> {option} </label>
                            </div>
                        )
                    })
                }
            </>

        )
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
                {
                    this.state.showpopup?
                        <Popup
                            show={this.state.showpopup}
                        >
                            <PopupButtons>
                                <button onClick={this.hideOptionsPopup}> Close </button> 
                            </PopupButtons>
                            <PopupBody>
                                {
                                    Object.keys(this.state.options_lists).map((item, i) => {
                                        return (
                                            <div key={i}>
                                                <h1>{item}</h1>
                                                {
                                                    this.state.options_lists[item].map((list, j) => {
                                                        return (
                                                            <div key={`${i}${j}`}> {this.createCheckBox(list, item)} </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )})
                                }
                            </PopupBody>
                        </Popup>
                        :
                        null
                }
            </div>
        )
    }
}
export default Orders
