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
                <button id="AddItemFormDone" type="button" class="btn btn-success" onClick={() => this.onPopupClose('done', !_.isEqual(this.state.data, this.props.prefill), this.state.data)}> Done </button>
                <button id="AddItemFormCancel" type="button" class="btn btn-danger" onClick={()=>this.onPopupClose('cancel')}> Cancel </button>
                <br/>
                <div className = "form-group">
                    <div id="AddItemFormPrepend" class="input-group-prepend">
                        <span class="input-group-text">Name:</span>
                        <input type = "text" className = "form-control" id = "name" name='item-name' onChange={(e) => this.onChange(e, 'name')} value={this.state.data.name}/>
                    </div>
                </div>
                <br/>
                <label id="AddItemFormOptionList" htmlFor='option_lists'>Option Lists</label><br/>
                {
                    (this.state.data.options_lists)?
                    this.state.data.options_lists.map((optionList, i) => {
                        let key = Object.keys(optionList)[0]
                        let sorted = Object.keys(optionList[key])
                        return (
                            
                            <div key={i}>
                                <div id="AddItemFormPrepend" class="input-group-prepend">
                                    <span class="input-group-text">{key}</span>
                                    <input className = "form-control"
                                        value={key}
                                        id='options_name' 
                                        type='text' 
                                        onChange={(e) => this.onChange(e, 'options_name')} 
                                        name={key} />
                                </div>
                                {
                                    sorted.map((option, b) => {
                                        return (
                                            <div key={b}>
                                                <div id="AddItemFormOptions" class="input-group-prepend">
                                                    <span class="input-group-text">{option}</span>
                                                    <input className = "form-control"
                                                        onChange={(e) => this.onChange(e, 'option_list_value', option)} 
                                                        value={optionList[key][option]}//{this.parseOptions(Object.values(optionList)[0])} 
                                                        id={i}
                                                        min="0"
                                                        type='number' 
                                                        name={`options_lists/${key}/${option}`}/>
                                                    <button id="AddItemFormMinus" type="button" class="btn btn-danger" onClick={() => this.onDeleteOption(key, i, option)}> - </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    this.state.stagedOption[key]?
                                        <div id="AddItemFormAddOptionClicked">
                                            <div id="AddItemFormOptions" class="input-group-prepend">
                                                <span class="input-group-text">Name</span>
                                                <input className = "form-control"
                                                    id='name' 
                                                    type='text' 
                                                    name={this.state.stagedOption[key].name} 
                                                    value={this.state.stagedOption[key].name}
                                                    onChange={(event) => this.onStagedOptionChange(event, key)}
                                                />
                                            </div>
                                            <div id="AddItemFormOptions" class="input-group-prepend">
                                                <span class="input-group-text">Value</span>
                                                <input className = "form-control"
                                                    id='value'
                                                    value={this.state.stagedOption[key].value}//{this.parseOptions(Object.values(optionList)[0])} 
                                                    min="0"
                                                    type='number' 
                                                    onChange={(event) => this.onStagedOptionChange(event, key)}
                                                    name={`stagedOption/value/`}/>
                                                <button type="button" class="btn btn-danger" onClick={() => this.onDeleteStaged(key)}> - </button>
                                                <button type="button" class="btn btn-success" onClick={() => this.onNewOptionCommit(i, key)}> commit </button>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                                <button id="AddItemFormAddOption" type="button" class="btn btn-success" onClick={() => this.onAddOption(i, key)}> Add Option </button>
                                <button id="AddItemFormPlus" class="btn btn-success" onClick={this.onAddOptionsList}>+</button>
                            </div>
                        )
                    })
                        :
                        null
                }
                <div id="AddItemFormOptions" class="input-group-prepend">
                    <span class="input-group-text">Description</span>
                    <textarea className = "form-control"
                        onChange={this.onDescriptionChange} 
                        value={this.state.data.description} 
                        id='description' 
                        type='text' 
                        name='description' /><br/>
                </div>

                <img id="AddItemFormImage" src={this.state.data.photo_url} height="100"/>
                <input id="AddItemFormImageButton" class="form-control" type="file" onChange={(event) => this.onImageAdd(event)}/>

                <div id="AddItemFormOptions" class="input-group-prepend">
                    <span class="input-group-text">Price</span>
                    <input class="form-control"
                        onChange={(e) => this.onChange(e, 'price')} 
                        value={this.state.data.price} 
                        id='price' 
                        type='text' 
                        name='price' /><br/>
                </div>
            </div>
        )
    }
}

export default AddItemForm
