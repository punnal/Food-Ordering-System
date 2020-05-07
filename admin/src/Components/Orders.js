import React from "react"
import {api_pull, api_push } from '../api/api'
import { res } from '../res/res'
import Table from './Table'
import { Popup, PopupH, PopupBody, PopupButtons} from './Popup'
import Parsers from './Parsers'
import _ from 'lodash'

class Orders extends React.Component {

    constructor(props) {
        super(props)
        this.page = res.admin.pages[this.props.id]
        this.options_charges = 0
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
        this.addToBill = this.addToBill.bind(this)
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
        api_pull('/admin/api/deals', deals => {
            api_pull('/admin/api/menu', menu => {
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

    optionsToString(selected) {
        return Object.keys(selected).map((item, i) => {
            return (
                <div key={i}>
                    <h5> {item} </h5>
                    {
                        Object.keys(selected[item]).map((list, j) => {
                            const ref = selected[item][list]
                            const selected_name = Object.keys(ref).filter(e => ref[e].checked)
                            const selected_charge = Object.values(ref).filter(e => e.checked)[0].charge
                            this.options_charges += selected_charge
                            return (
                                <div key={j}>
                                    <h6>{list} : {selected_name} : + {selected_charge}</h6>
                                </div>
                            )
                        })
                    }
                </div>
            )
        })
    }

    onAdd() {
        const options = this.optionsToString(this.state.checked)
        const {table, row} = this.state.staged_add
        this.addToBill(table, row, options, this.options_charges)
        this.hideOptionsPopup()
        this.options_charges = 0
        this.setState(old => {
            let newstate = _.cloneDeep(old)
            delete newstate.options_lists
            return newstate
        })
        //clear up state
    }

    addToBill(table, row, options, charges){
        let item = {...this.state.tables[table][row]}
        this.setState(old => {
            let newbill = [...old.bill]
            let found = false
            newbill.forEach((e, i) => {
                /*
                if(e.id === item.id) {
                    e.qty += 1
                    e.charges += charges
                    e.options = [...e.options, options]
                    found = true
                }
                */
            })
            if(!found){
                item.qty = 1
                item.charges = charges
                newbill = [...newbill, item]
            }
            item.options = [options]
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
                Object.keys(list.options).forEach((option_name, i) => {
                    dic[item][list.name][option_name] = {checked:i? false:true, charge:parseInt(list.options[option_name])}
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
                checkeda:{
                    ..._.cloneDeep(old.checked), 
                    ..._.cloneDeep(this.initCheckBoxState(table, row))
                },
                checked:{...this.initCheckBoxState(table, row)},
                staged_add:{table:table, row:row}
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

    removeOptions(checked, checkeda){
        let ret = _.cloneDeep(checkeda)
        Object.keys(checked).forEach(k => {
            delete ret[k]
        })
        return ret
    }

    onBillRowClick(table, row) {
        this.setState(old => {
            let newbill = [...old.bill]
            newbill[row].qty -= 1
            if(newbill[row].qty === 0)
                newbill = newbill.filter( (e,i) => i !== row)
            let newstate = {
                ...old,
                'bill': [...newbill],
                checkeda:this.removeOptions(old.checked, old.checkeda),
                checked:{},
            }
            return newstate
        })
    }

    totalBill(){
        let total = 0
        this.state.bill.forEach(item => {
            total += item.price*item.qty + item.charges
        })
        return total
    }

    showPopup(){
        this.setState(old => {return {...old, showbill:true}})
    }

    onGenerateBill(){
        this.showPopup()
        let order = {}
        order.user = 'admin'
        order.address = 'nothing'
        order.phone = 'nothing'
        order.status = 1
        order.type = 1
        console.log(this.state.checkeda)
        order['orders'] = Parsers.parseBillForPost(this.state.bill, this.state.checkeda)
        api_push('/admin/api/orders', order)
        this.setState(old => {
            return {
                ...old,
                bill:[]
            }
        })
    }

    onChecked(item, listName, option) {
        this.setState(old => {
            let newstate = {...old}
            let ref = newstate.checked[item][listName]
            Object.keys(ref).forEach(e => {
                newstate.checked[item][listName][e].checked = e===option
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
                                    id = "OrdersRadio" 
                                    type="radio" 
                                    checked={this.state.checked[item][list.name][option].checked}
                                    onChange={() => this.onChecked(item, list.name, option)}
                                />
                                <label> {option} : +{list.options[option]}</label>
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
                        cols = {['ID', 'Name', 'Price', 'Options', 'Charges', 'Qty']}
                        data = {this.state.bill}
                    />
                </div>
                {
                    this.state.showpopup?
                        <Popup
                            show={this.state.showpopup}
                        >
                            <PopupButtons>
                                <button id = "OrdersPopUpClose" type="button" class="btn btn-danger" onClick={this.hideOptionsPopup}> Close </button> 
                                <button id ="OrdersAddToBill" type="button" class="btn btn-success" onClick={this.onAdd}> Add To Bill </button> 
                            </PopupButtons>
                            <PopupBody>
                                {
                                    Object.keys(this.state.options_lists).map((item, i) => {
                                        return (
                                            <div key={i}>
                                                <h1 id = "OrdersPopUpHeading">{item}</h1>
                                                {
                                                    this.state.options_lists[item].map((list, j) => {
                                                        return (
                                                            <div id = "OrdersPopUpItems" key={`${i}${j}`}> {this.createCheckBox(list, item)} </div>
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

                {
                    false?
                        <Popup
                            show={this.state.showbill}
                        >
                            <PopupButtons>

                            </PopupButtons>
                        </Popup>
                    :
                        null
                }
            </div>
        )
    }
}
export default Orders
