import React from 'react'

class AddDealForm extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.prefill
        this.parseOptions = this.parseOptions.bind(this)
        this.onAddOptionsList = this.onAddOptionsList.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onImageAdd = this.onImageAdd.bind(this)
        this.onDeleteOption = this.onDeleteOption.bind(this)
        this.validate = this.props.OnDataChanged
        this.onPopupClose = this.props.onPopupClose
    }

    parseOptions(options) {
        let keys = Object.keys(options)
        let text = ''
        keys.forEach((e, i) =>{
            text += `${e}:${options[e]};`
        })
        return text
    }

    onImageAdd(event) {
        let file = event.target.files[0]
        var reader = new FileReader()
        let dataurl = ''
        reader.onload = () => {
            dataurl = reader.result
            console.log(dataurl)
            this.setState(old => {
                return {
                    ...old,
                    'photo_url':dataurl
                }
            })
        }
        reader.readAsDataURL(file)
    }

    onChange(event, key, parent) {
        let target = event.target
        this.setState(old => {
            if(!key.includes('option')) {
                let newstate = {
                    ...old,
                    [key]:target.value
                }
                return newstate
            }
            else {
                if(key === 'options_name') {
                    let new_options_lists = old.options_lists.map((e, i) => {
                        let option_name = Object.keys(e)[0]
                        if(option_name === target.name) {
                            return {
                                [target.value]:{
                                    ...e[option_name]
                                }
                            }
                        }
                        return e
                    })
                    return {
                        ...old,
                        'options_lists': [...new_options_lists]
                    }
                }
                else if(key === 'option_list_value'){
                    let new_option_value = old.options_lists.map((e, i) => {
                        let option_name = Object.keys(e)[0]
                        console.log(`${option_name} = ${parent}`)
                        if(option_name === parent) {
                            let options = {
                                [option_name]:{
                                    ...e[option_name],
                                }
                            }
                            let price = options[option_name][target.name]
                            delete options[option_name][target.name]
                            options[option_name][target.value] = price
                            return options
                        }
                        return e
                    })
                    return {
                        ...old,
                        'options_lists': [...new_option_value]
                    }
                }
            }
        })

    }

    clense(state){
        return state
    }

    validate() {
        //perform validation
    }

    onDeleteOption(key, i, option) {
        console.log(key, i, option)
        this.setState(old => {
            let newstate = {...old}
            delete newstate.options_lists[i][key][option]
            return this.clense(newstate)
        })
    }
    onAddOptionsList() {
        this.setState(old => {
            return {
                ...old,
                'options_lists': [
                    ...old.options_lists,
                    {
                        '':
                        {
                            '':''
                        }
                    }
                ]
            }
        })
    }

    render() {
        return (
            <div>
                <label htmlFor='name'>Name:</label>
                <input class="form-control"
                    onChange={(e) => this.onChange(e, 'name')} value={this.state.name} 
                    id='name' 
                    type='text' 
                    name='item-name' /><br/>

                <label htmlFor='option_lists'>Option Lists</label><br/>
                {
                    this.state.options_lists.map((optionList, i) => {
                        let key = Object.keys(optionList)[0]
                        let sorted = Object.keys(optionList[key]).sort()
                        return (
                            <div key={i}>
                                <input 
                                    value={key}
                                    id='options_name' 
                                    type='text' 
                                    onChange={(e) => this.onChange(e, 'options_name')} 
                                    name={key} />
                                {
                                    sorted.map((option, b) => {
                                        return (
                                            <div key={b}>
                                            <input 
                                                onChange={(e) => this.onChange(e, 'option_list_value', key)} 
                                                value={option}//{this.parseOptions(Object.values(optionList)[0])} 
                                                id='option_value' 
                                                type='text' 
                                                name={option} />
                                            <input 
                                                onChange={(e) => this.onChange(e, 'option_list_value', option)} 
                                                value={optionList[key][option]}//{this.parseOptions(Object.values(optionList)[0])} 
                                                id='option_price' 
                                                type='text' 
                                                name={optionList[key][option]}/>
                                            <button type="button" class="btn btn-danger" onClick={() => this.onDeleteOption(key, i, option)}> - </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <button type="button" class="btn btn-success" onClick={this.onAddOptionsList}>+</button>
                <label htmlFor='description'>Description</label>
                <input 
                    onChange={(e) => this.onChange(e, 'price')} 
                    value={this.state.description} 
                    id='description' 
                    type='text' 
                    name='description' /><br/>

                <img src={this.state.photo_url} height="100"/>
                <input type="file" onChange={(event) => this.onImageAdd(event)}/>

                <label htmlFor='price'>Price</label>
                <input 
                    onChange={(e) => this.onChange(e, 'price')} 
                    value={this.state.price} 
                    id='price' 
                    type='text' 
                    name='price' /><br/>
                <button type="button" class="btn btn-danger" onClick={()=>this.onPopupClose('add', 'cancel')}> Cancel </button>
                <button type="button" class="btn btn-success" onClick={this.validate}> Done </button>
            </div>
        )
    }
}

export default AddDealForm
