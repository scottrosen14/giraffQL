import React, { Component } from 'react';
import { render } from 'react-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FormControl, Button } from 'react-bootstrap';
// COMPONENTS
import App from '../App'
import colors from './colors';


class Table extends React.Component {
    constructor(props) {
        super(props)
        // references for DOM position elements
        this.propertyRowRefs = [];
        this.tableRef = null;
    }

    // when page is loaded call refreshTablePositions()
    componentDidMount() {
        this.refreshTableRefs()
    }

    componentDidUpdate(oldProps) {
        if (this.props.table.attributes.length !== oldProps.table.attributes.length) {
            this.refreshTableRefs()
        }
    }

    // sends the current position of tables and rows and sends that to the parent
    refreshTableRefs = () => {
        this.props.refreshTableRefs(
            this.props.tableIndex,
            this.tableRef,
            this.propertyRowRefs.filter((el) => { return el !== null })
        )
    }

    // function to check is input string contains number
    startsWithNumber = (text) => {
        return /^[0-9]/.test(text);
    }

    // added comment in table which is starting with number


    render() {
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        const { style, data, tables, dataEvent, table, tableIndex, onAddRow, rowIndex, updateTableName, updateRowProp, updateRowType, handleRowClick, deleteTable, deleteRow, onTableMouseUp, onRowMouseDown, value, onDragTable } = this.props


        let options = [
            { value: 'String', label: 'String' },
            { value: 'Int', label: 'Int' },
            { value: 'Float', label: 'Float' },
            { value: 'Boolean', label: 'Boolean' },
            { value: 'ID', label: 'ID' }
        ]

        for (let i = 0; i < data.tables.length; i++) {
            let container = {};
            if (data.tables[i]) {
                container.value = data.tables[i].name
                container.label = data.tables[i].name
                options.push(container)
            }
        }

        const className = this.startsWithNumber(table.name) ? 'table redTable' : 'table'

        return (

            <Draggable bounds="parent" handle=".drag-handle" defaultPosition={{x: 0, y: table.defaultPosition}}
                enableUserSelectHack={false} onDrag={(e, dataEvent) => onDragTable(tableIndex)}>
                <div>
                    <table className={className} ref={(e) => { this.tableRef = e }} onMouseUp={(e) => onTableMouseUp(tableIndex)}>
                        <tbody>
                        {this.startsWithNumber(table.name) ?
                        <tr>
                        <th colSpan={2} style={style}>
                            <FormControl className="tableName" type="text" value={table.name} placeholder="Table Name" onChange={(e) => updateTableName(tableIndex, e.target.value)} />
                            <div className='deletetablebutton' onClick={() => deleteTable(tableIndex)}>x</div>
                            <div className='drag-handle'><img className='img' src="https://i.pinimg.com/236x/05/c3/22/05c32290526fb5c507329afd43a58fbc--jungle-animals-farm-animals.jpg" /></div>
                            <p className='alert'> Table name can not start with number </p>
                            </th>
                        </tr>
                        :
                            <tr>
                                <th colSpan={2} style={style}>
                                     <FormControl className="tableName" type="text" value={table.name} placeholder="Table Name" onChange={(e) => updateTableName(tableIndex, e.target.value)} />
                                    <div className='deletetablebutton' onClick={() => deleteTable(tableIndex)}>x</div>
                                    <div className='drag-handle'><img className='img' src="https://i.pinimg.com/236x/05/c3/22/05c32290526fb5c507329afd43a58fbc--jungle-animals-farm-animals.jpg" /></div>
                                    </th>
                            </tr>
                        }
                            {table.attributes.map(({ field, type, x, y, relatedToTableId }, i) => {
                                return (
                                    <tr key={i} ref={(e) => { this.propertyRowRefs[i] = e }} onMouseDown={(e) => onRowMouseDown(tableIndex, i)}>
                                        <td><FormControl className='propertyinput' type="text" placeholder="Property" value={field} onChange={(e) => updateRowProp(tableIndex, i, e.target.value)} /></td>
                                        <td className='typetd'>
                                            <div className='deleterowbutton' onClick={() => deleteRow(tableIndex, i)}>x</div>
                                            <div>
                                                <Select className='dropdown'
                                                    onChange={(value) => updateRowType(tableIndex, i, value)}
                                                    options={options}
                                                    simpleValue
                                                    autosize={true}
                                                    value={tables[tableIndex].attributes[i].type}
                                                    clearable={false}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td className='addRowWrap' colSpan={2}><Button className="addRow" onClick={() => onAddRow(tableIndex)}> ADD FIELD </Button> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Draggable>

        )
    }
}
export default Table;