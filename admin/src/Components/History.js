import React from "react"
import { api_pull} from '../api/api'
import { res } from '../res/res'
import _ from 'lodash'
import Card from './Card'
import {MAP_C2T} from '../res/CodeMappings'
import Dropdown from 'react-bootstrap/Dropdown'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </div>
));

const parseData = data => {
    return Object.values(data)
}

class History extends React.Component {

    constructor(props) {
        super(props)
        this.page = res.admin.pages[this.props.id]
        this.api = this.page.api
        this.state = {
            'data': [],
            'fdata':[],
            'show':false,
            'filters':{
                'time':{
                    '3600':false,
                    '86400':false,
                    '2592000':true

                },
                'type':{
                    'local':false,
                    'all':true,
                    'delivery':false
                },
                'order':{
                    'o2n':false,
                    'n2o':true
                }

            }
        }

        this.onFilterChange = this.onFilterChange.bind(this)
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    componentDidMount() {
        api_pull(this.api, d => {
            let data = parseData(d)
            this.setState( old => { 
                return {
                    ...old, 
                    'data':data,
                    'fdata': this.applyFilters(data, this.state.filters)
                }
            })})
    }

    checkBoxChange(filters, name, id){
        Object.keys(filters[name]).forEach(key=> {
            filters[name][key] = key === id
        })
    }

    onFilterChange(event){
        const {id, name} = event.target
        this.setState(old => {
            let newState = {..._.cloneDeep(old)}
            this.checkBoxChange(newState.filters, name, id)
            newState.fdata = this.applyFilters(newState.data, newState.filters)
            return newState
        })
    }

    select(filter){
        return Object.keys(filter).filter(e => filter[e])[0]
    }
    
    sortByTime(data, asc){
        return data.sort((a,b)=> asc? a.time>b.time: a.time<b.time)
    }

    filterType(data, type){
        return data.filter(e => (type === 'all')? true: MAP_C2T[e.type].toLowerCase() === type.toLowerCase())
    }

    filterTime(data, time){
        return data.filter(e => e.time > (Date.now() - time*1000))
    }

    applyFilters(data, filters){
        let filtered = this.sortByTime(data, filters.order.o2n)
        filtered = this.filterType(filtered, this.select(filters.type))
        filtered = this.filterTime(filtered, parseInt(this.select(filters.time)))
        return filtered
    }

    handleMouseEnter() {
        this.setState(old => {
            return {
                ...old,
                show: true
            }
        })
    }

    handleMouseLeave() {
        this.setState(old => {
            return {
                ...old,
                show: false
            }
        })
    }

    render() {
        return (
            <div className = "History">
                
                    <Dropdown className = "DropDown">
                        <Dropdown.Toggle as={CustomToggle} id ="dropdown-custom-components">
                            <div><i class="fas fa-filter fa-2x"></i></div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu id = "HistoryDropDownMenu">
                            <Dropdown.Item as='button' className = "HistoryDropDownItem">
                                <input className="HistoryDropDownCheckBox" type='checkbox' onChange={this.onFilterChange} name='order' id='n2o' checked={this.state.filters.order.n2o}/>
                                <label>New to old</label>
                            </Dropdown.Item>
                            <Dropdown.Item as='button' className = "HistoryDropDownItem">
                                <input className="HistoryDropDownCheckBox" type='checkbox' onChange={this.onFilterChange} name='order' id='o2n' checked={this.state.filters.order.o2n}/>
                                <label>Old to new</label>
                            </Dropdown.Item>
                            <Dropdown.Item as='button' className = "HistoryDropDownItem">
                                <input className="HistoryDropDownCheckBox" type='checkbox' onChange={this.onFilterChange} name='type' id='local' checked={this.state.filters.type.local}/>
                                <label>Local only</label>
                            </Dropdown.Item>
                            <Dropdown.Item as='button' className = "HistoryDropDownItem">
                                <input className="HistoryDropDownCheckBox" type='checkbox' onChange={this.onFilterChange} name='type' id='delivery' checked={this.state.filters.type.delivery}/>
                                <label>Delivery only</label>
                            </Dropdown.Item>
                            <Dropdown.Item as='button' className = "HistoryDropDownItem">
                                <input className="HistoryDropDownCheckBox" type='checkbox' onChange={this.onFilterChange} name='type' id='all' checked={this.state.filters.type.all}/>
                                <label>All</label>
                            </Dropdown.Item>
                            <Dropdown.Item as='button' className = "HistoryDropDownItem">
                                <input className="HistoryDropDownCheckBox" type='checkbox' onChange={this.onFilterChange} name='time' id='3600' checked={this.state.filters.time['3600']}/>
                                <label>Last 1 hour</label>
                            </Dropdown.Item>
                            <Dropdown.Item as='button' className = "HistoryDropDownItem">
                                <input className="HistoryDropDownCheckBox" type='checkbox' onChange={this.onFilterChange} name='time' id='86400' checked={this.state.filters.time['86400']}/>
                                <label>Last 1 day</label>
                            </Dropdown.Item>
                            <Dropdown.Item as='button' className = "HistoryDropDownItem">
                                <input className="HistoryDropDownCheckBox" type='checkbox' onChange={this.onFilterChange} name='time' id="2592000" checked={this.state.filters.time['2592000']}/>
                                <label>Last 1 month</label>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                {
                    (this.state.fdata)?
                    this.state.fdata.map((e, i) =>{
                        return (
                            <Card 
                                key={i} 
                                id = {i}
                                inputType='button'
                                data={e} 
                                />
                        )})
                        :
                        null
                }
            </div>
        )
    }
}

export default History


// true?
// <div 
//     className = "DropDownMenu" 
//     onMouseLeave = {this.handleMouseLeave}>

//     <label>New to old</label>
//     <input type='checkbox' onChange={this.onFilterChange} name='order' id='n2o' checked={this.state.filters.order.n2o}/>
//     <br/>
//     <label>Old to new</label>
//     <input type='checkbox' onChange={this.onFilterChange} name='order' id='o2n' checked={this.state.filters.order.o2n}/>
//     <br/>

//     <label>Local only</label>
//     <input type='checkbox' onChange={this.onFilterChange} name='type' id='local' checked={this.state.filters.type.local}/>
//     <br/>
//     <label>Delivery only</label>
//     <input type='checkbox' onChange={this.onFilterChange} name='type' id='delivery' checked={this.state.filters.type.delivery}/>
//     <br/>
//     <label>All</label>
//     <input type='checkbox' onChange={this.onFilterChange} name='type' id='all' checked={this.state.filters.type.all}/>
//     <br/>

//     <label>Last 1 hour</label>
//     <input type='checkbox' onChange={this.onFilterChange} name='time' id='3600' checked={this.state.filters.time['3600']}/>
//     <br/>
//     <label>Last 1 day</label>
//     <input type='checkbox' onChange={this.onFilterChange} name='time' id='86400' checked={this.state.filters.time['86400']}/>
//     <br/>
//     <label>Last 1 month</label>
//     <input type='checkbox' onChange={this.onFilterChange} name='time' id="2592000" checked={this.state.filters.time['2592000']}/>
//     <br/>
// </div>
// :
// null
// }
