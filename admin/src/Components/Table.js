import React from "react"
import { res } from '../res/res'


const parseItems = (items) => {
    if(!items) return null
    return (
        <div>
            {
                items.map((item, i) => {
                    return <li key = {i}> {item.quantity} {item.name} </li>
                })
            }
        </div>
    )
}

const TableHeading = (props) => {
    return (
        <div 
            className={props.style}
        >
            <h2 
                className={props.headingStyle}
            >
                {props.heading}
            </h2> 
            {
                (props.headingButton)?
                    <button type = "button" class = "btn btn-dark" 
                        id={props.buttonStyle} 
                        onClick={() => props.onAdd? props.onAdd(props.heading): null}
                    > 
                        {props.headingButton} 
                    </button>
                    :
                    null
            }
        </div>
    )
}

class Table extends React.Component {

    constructor(props) {
        super(props)
        this.css = res.admin.css_classes
    }

    render() {
        return (
            <div>
                <TableHeading
                    style= {this.css.TableHeadingAndButtonDiv}
                    heading = {this.props.heading}
                    headingStyle = {this.css.TableHeading}
                    headingButton = {this.props.headingButton}
                    buttonStyle = {this.css.TableAddButton}
                    onAdd = {this.props.onAdd}
                />
                <table className='table table-dark table-stripped table-hover'>
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
                            (this.props.data)?
                                this.props.data.map((row, row_index) => {
                                    return (
                                        <tr 
                                            className = {this.css.TableRow} 
                                            key={row_index}
                                        >
                                            {
                                                this.props.cols.map(
                                                    (colname,col_index) => {
                                                        return (
                                                            <td 
                                                                onClick={() =>this.props.onRowClick? this.props.onRowClick(this.props.heading, row_index): null}
                                                                key={col_index}>
                                                                {
                                                                    (colname.toLowerCase() === 'items')?
                                                                    parseItems(row['items'])
                                                                    :
                                                                    (colname.toLowerCase() !== 'image')?
                                                                    row[colname.toLowerCase()]
                                                                    :
                                                                        <img 
                                                                            width = {this.props.img_w? this.props.img_w:this.props.img_h? null : 30} 
                                                                            height = {this.props.img_h}
                                                                            alt="" 
                                                                            src={row['photo_url']}
                                                                        />
                                                                }
                                                            </td>
                                                        )
                                                    }
                                                )
                                            } 
                                                {
                                                    (this.props.rowButton)?
                                                        <td> 
                                                            <img 
                                                                onClick={() =>this.props.onRowButtonClick? this.props.onRowButtonClick(this.props.heading, row_index):null}
                                                                alt =""
                                                                className = {this.props.cssClassName} 
                                                                src = {require('../img/delete.png')} 
                                                                width = '30' 
                                                                height = '30'
                                                            />
                                                        </td>
                                                        :
                                                        null
                                                }
                                            </tr>
                                    )

                                })
                                :
                                null
                        }
                    </tbody>
                </table>
                {
                    (this.props.footerButton)?
                        <div>
                            <p> {this.props.footerText} </p>
                            <button type="button" class= "btn btn-success" id = {this.props.cssClassName} onClick={this.props.onFooterButtonClick? this.props.onFooterButtonClick : null}> {this.props.footerButton} </button>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

export default Table
