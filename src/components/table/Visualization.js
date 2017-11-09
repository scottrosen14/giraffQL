import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Table from './Table'

import css from '../../css/Table.css'
import colors from './colors'
import { PathLine } from 'react-svg-pathline'

class Visualization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: null,
            end: null
        }
    }

    handleMouseDown = (mouseEvent) => {
        this.setState({
            start: {
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            }
        });
    }

    handleMouseMove = (mouseEvent) => {
        if (this.state.start !== null) {
            this.setState({
                end: {
                    x: mouseEvent.clientX,
                    y: mouseEvent.clientY
                }
            });
        }
    }

    handleMouseUp = (mouseEvent) => {
        if (this.state.start !== null) {
            this.setState({ start: null, end: null })
        }
        this.props.onTableMouseUp(null)
    }

    render() {
        const { start, end } = this.state
        const { clickedRow, data, dataEvent, onAddRow, updateTableName, updateRowProp, updateRowType, onAddTable, deleteTable, deleteAllTables, deleteRow, onDragTable, refreshTablePositions, onTableMouseUp, onRowMouseDown, value } = this.props

        let svg = <svg className="relations" >
                        {start !== null && end !== null && clickedRow &&
                            <PathLine
                                points={[start, end]}
                                stroke="red"
                                strokeWidth="10"
                                fill="none"
                                r={10} />
                        }

                    {
                        data.tables.map((table, i) => {
                        {/* edits here*/}
                            if (table !== null) {
                                return table.attributes.map((attr, ai) => {
                                {/*more edits*/}
                                    const relatedTable = data.tables.find(t => {
                                        if (t) {
                                          return t.id === attr.relatedToTableId
                                        } else {
                                          return '';
                                        }
                                    })

                                    if (relatedTable) {
                                        return (
                                            <PathLine
                                                key={`${i}-${ai}`}
                                                points={[
                                                    { ...attr },
                                                    { x: relatedTable.tablePositionX, y: relatedTable.tablePositionY }
                                                ]}
                                                stroke="red"
                                                strokeWidth="3"
                                                fill="none"
                                                r={10} />
                                        )
                                    }
                                })
                            } else {
                                return '';
                            }

                        })
                    }
                    </svg>

        let tablesArr = data.tables.map((table, i) => {
            if (table) {
                let tableComp = (
                <Table style={{"background-color": colors[i]}} key={table.id} data={data} value={value} tables={data.tables} draggable={!clickedRow} tableIndex={i} table={table} onAddRow={onAddRow} updateTableName={updateTableName}
                    updateRowProp={updateRowProp} updateRowType={updateRowType} deleteTable={deleteTable} deleteRow={deleteRow}
                    onDragTable={onDragTable} dataEvent={dataEvent} refreshTablePositions={refreshTablePositions} onTableMouseUp={onTableMouseUp} onRowMouseDown={onRowMouseDown} />
                )
                return tableComp;
            } else {
                let pixel = (
                  <table class="tableInvisible">
                    <tr><th><input class="inputInv" type="text"/></th></tr>
                    <tbody>
                    <tr>
                      <td><input class="inputInv" type="text"/></td>
                      <td><input class="inputInv" type="text"/></td>
                    </tr>
                    </tbody>
                  </table>
                )
                return pixel;
            }
        })

    // const tablesArr = [];
    // for (let i = 0; i < data.tables.length; i++) {
    //   if (data.tables[i] !== null) {
    //     let table = (
    //         <Table style={{"background-color": colors[i]}} key={table.id} data={data} value={value} tables={data.tables} draggable={!clickedRow} tableIndex={i} table={table} onAddRow={onAddRow} updateTableName={updateTableName}
    //                             updateRowProp={updateRowProp} updateRowType={updateRowType} deleteTable={deleteTable} deleteRow={deleteRow}
    //                             onDragTable={onDragTable} dataEvent={dataEvent} refreshTablePositions={refreshTablePositions} onTableMouseUp={onTableMouseUp} onRowMouseDown={onRowMouseDown} />
    //     )

    //     tablesArr.push(table)
    //   } else {
        // let pixel = (
        //   <table class="tableInvisible">
        //     <tr><th><input class="inputInv" type="text"/></th></tr>
        //     <tbody>
        //     <tr>
        //       <td><input class="inputInv" type="text"/></td>
        //       <td><input class="inputInv" type="text"/></td>
        //     </tr>
        //     </tbody>
        //   </table>
        // )
    //     tablesArr.push(pixel)
    //   }
    // }
        return (
            <div className='visualization' onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove}>
                <div className='toolbar'>
                    <button onClick={onAddTable}> Create table </button>
                    <button> Add relations </button>
                    <button onClick={deleteAllTables}> Delete All </button>
                </div>
                <div className="tablesWrapper">
                    {svg}
                    <div className="tablesWrapper">
                    {tablesArr}
                    </div>
                </div>
            </div>
        )
    }
}
export default Visualization;