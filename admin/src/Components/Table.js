import React from "react"
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
                                onClick={() => this.props.onAdd(this.props.heading)}
                            > 
                                {this.props.headingbutton} 
                            </button>
                            :
                            null
                    }
                </div>
                <table className='Table'>
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
                                this.props.data.map((row,i) => {
                                    return (
                                        <tr 
                                            className = {this.css.TableRow} 
                                            key={i}
                                        >
                                            {
                                                this.props.cols.map(
                                                    (e,c) => {
                                                        return (
                                                            <td 
                                                                onClick={() => this.props.onRowClick(this.props.heading, i)}
                                                                key={c}>{row[e]}
                                                            </td>
                                                        )
                                                    }
                                                )
                                            } 
                                                {
                                                    (this.props.rowButton)?
                                                        <td> <button onClick={() => this.props.onRowButtonClick(this.props.heading, i)}> {this.props.rowButton} </button> </td>
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
                        <button onClick={this.props.onFooterButtonClick}> {this.props.footerButton} </button>
                        :
                        null
                }
            </div>
        )
    }
}

export default Table
