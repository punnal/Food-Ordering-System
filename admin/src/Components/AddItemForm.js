import React from 'react'
import _ from 'lodash'

class AddItemForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {stagedOption:{}, data:_.cloneDeep(this.props.prefill)}
        this.parseOptions = this.parseOptions.bind(this)
        this.onAddOptionsList = this.onAddOptionsList.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onImageAdd = this.onImageAdd.bind(this)
        this.onDeleteOption = this.onDeleteOption.bind(this)
        this.validate = this.props.OnDataChanged
        this.onPopupClose = this.props.onPopupClose
        this.onDeleteStaged = this.onDeleteStaged.bind(this)
        this.onStagedOptionChange = this.onStagedOptionChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
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
                    data:{
                        ...old.data,
                        'photo_url':dataurl
                    }
                }
            })
        }
        reader.readAsDataURL(file)
    }

    onChange(event, key, parent) {
        let target = event.target
        const {id, name} = target
        this.setState(old => {
            if(!key.includes('option')) {
                let newstate = {
                    ...old,
                    data:{
                        ...old.data,
                        [key]:target.value
                    }
                }
                return newstate
            }
            else {
                if(key === 'options_name') {
                    let new_options_lists = old.data.options_lists.map((e, i) => {
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
                        data: {
                            ...old.data,
                            'options_lists': [...new_options_lists]
                        }
                    }
                }
                else if(key === 'option_list_value'){
                    let newstate = _.cloneDeep(old)
                    const [main, key, option] = name.split('/')
                    newstate.data[main][id][key][option] = target.value
                    return newstate
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
            delete newstate.data.options_lists[i][key][option]
            return this.clense(newstate)
        })
    }
    onAddOptionsList() {
        this.setState(old => {
            return {
                ...old,
                data:{
                    ...old.data,
                'options_lists': [
                    ...old.data.options_lists,
                    {
                        '':
                        {
                        }
                    }
                ]
                }
            }
        })
    }

    onAddOption(i, listName) {
        this.setState(old => {
            let newstate = _.cloneDeep(old)
            newstate.stagedOption[listName] = {
                name: "",
                value: ""
            }
            return newstate
        })
    }

    onDeleteStaged(key){
        this.setState(old => {
            let newstate = _.cloneDeep(old)
            newstate.stagedOption[key] = false
            return newstate
        })
    }

    onStagedOptionChange(event, key){
        const {id, value} = event.target
        this.setState(old => {
            let newstate = _.cloneDeep(old)
            newstate.stagedOption[key][id] = value
            return newstate
        })
    }

    onNewOptionCommit(i, listName) {
        this.setState(old => {
            let newstate = _.cloneDeep(old)
            const {name, value} = old.stagedOption[listName]
            newstate.data.options_lists[i][listName][name] = value
            newstate.stagedOption[listName] = false
            return newstate
        })
    }

    onDescriptionChange(event) {
        const {value} = event.target
        this.setState(old => {
            return {
                ...old,
                data:{
                    ...old.data,
                    description:value
                }
            }
        })
    }

    render() {
        return (
            <div>
                <button onClick={()=>this.onPopupClose('cancel')}> Cancel </button>
                <button onClick={() => this.onPopupClose('done', !_.isEqual(this.state.data, this.props.prefill), this.state.data)}> Done </button>
                <label htmlFor='name'>Name:</label>
                <input 
                    onChange={(e) => this.onChange(e, 'name')} value={this.state.data.name} 
                    id='name' 
                    type='text' 
                    name='item-name' /><br/>

                <label htmlFor='option_lists'>Option Lists</label><br/>
                {
                    this.state.data.options_lists.map((optionList, i) => {
                        let key = Object.keys(optionList)[0]
                        let sorted = Object.keys(optionList[key])
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
                                                <label
                                                    id='option_value' 
                                                    type='text' 
                                                    name={option} 
                                                >
                                                    {option}
                                                </label>
                                                <input 
                                                    onChange={(e) => this.onChange(e, 'option_list_value', option)} 
                                                    value={optionList[key][option]}//{this.parseOptions(Object.values(optionList)[0])} 
                                                    id={i}
                                                    min="0"
                                                    type='number' 
                                                    name={`options_lists/${key}/${option}`}/>
                                                <button onClick={() => this.onDeleteOption(key, i, option)}> - </button>
                                            </div>
                                        )
                                    })
                                }
                                <button onClick={() => this.onAddOption(i, key)}> Add Option </button>
                                {
                                    this.state.stagedOption[key]?
                                        <div>
                                            <input
                                                id='name' 
                                                type='text' 
                                                name={this.state.stagedOption[key].name} 
                                                value={this.state.stagedOption[key].name}
                                                onChange={(event) => this.onStagedOptionChange(event, key)}
                                            />
                                            <input 
                                                id='value'
                                                value={this.state.stagedOption[key].value}//{this.parseOptions(Object.values(optionList)[0])} 
                                                min="0"
                                                type='number' 
                                                onChange={(event) => this.onStagedOptionChange(event, key)}
                                                name={`stagedOption/value/`}/>
                                            <button onClick={() => this.onDeleteStaged(key)}> - </button>
                                            <button onClick={() => this.onNewOptionCommit(i, key)}> commit </button>

                                        </div>
                                        :
                                        null
                                }
                            </div>
                        )
                    })
                }
                <button onClick={this.onAddOptionsList}>+</button>
                <label htmlFor='description'>Description</label>
                <textarea 
                    onChange={this.onDescriptionChange} 
                    value={this.state.data.description} 
                    id='description' 
                    type='text' 
                    name='description' /><br/>

                <img src={this.state.data.photo_url} height="100"/>
                <input type="file" onChange={(event) => this.onImageAdd(event)}/>

                <label htmlFor='price'>Price</label>
                <input 
                    onChange={(e) => this.onChange(e, 'price')} 
                    value={this.state.data.price} 
                    id='price' 
                    type='text' 
                    name='price' /><br/>
            </div>
        )
    }
}

export default AddItemForm
