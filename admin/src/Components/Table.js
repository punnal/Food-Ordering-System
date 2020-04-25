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
                <table className = 'Table'>
                    <tr className={this.css.TableColumnHeadings}>
                            {
                                this.props.cols.map((col,i) => <th key={i}> {col} </th>) 
                            }
                    </tr>
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
                                                    <td> <a href = '#'> <img src = {require('../img/delete.png')} width = '30' height = '30'  className = {this.props.cssClassName}/> </a> </td>
                                                    :
                                                    null
                                            }
                                        </tr>
                                )

                            })}
                    </table>
                    {
                        (this.props.footerButton)?
                            <button className = {this.props.cssClassName}> {this.props.footerButton} </button>
                            :
                            null
                    }
                </div>
        )
    }
}
export default Table