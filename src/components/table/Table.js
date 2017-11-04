import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import css from '../../css/Table.css'
import Draggable, { DraggableCore } from 'react-draggable';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.propertyRowRefs = [];
    }

    componentDidMount() {
        this.refreshRowPositions()
    }

    refreshRowPositions = () => {
        this.props.refreshRowPositions(this.props.tableIndex, this.propertyRowRefs.map(ref => ref.getBoundingClientRect()))
    }

    onDragTable = (e, dataEvent) => {
        this.props.onDragTable(this.props.tableIndex, e, dataEvent)
        this.props.refreshRowPositions(this.props.tableIndex, this.propertyRowRefs.map(ref => ref.getBoundingClientRect()))
    }

    render() {
        const { tables, table, dataEvent, tableIndex, onAddRow, rowIndex, updateTableName, updateRowProp, updateRowType } = this.props
        console.log('table', table)
        console.log('x', table.attributes[0].x, 'y', table.attributes[0].y)
        console.log('rowIndex', rowIndex)

        return (
            <Draggable enableUserSelectHack={false} onDrag={(e,dataEvent) => this.onDragTable(e, dataEvent)}>

            <div>
            <svg>
            <foreignObject x="0" y="0" width="300" height="300">
                <table className="table">
                    <tbody>
                        <tr>
                            <th colSpan={2}>
                                <input className="tableName" type="text" value={table.name} placeholder="Table Name" onChange={(e) => updateTableName(tableIndex, e.target.value)} />
                            </th>
                        </tr>
                        {table.attributes.map(({ field, type, x, y }, i) =>
                            <tr key={i} ref={(e) => { this.propertyRowRefs[i] = e }}>
                                <td><input type="text" placeholder="Property" value={field} onChange={(e) => updateRowProp(tableIndex, i, e.target.value)} /></td>
                                <td><input type="text" placeholder="Type" value={type} onChange={(e) => updateRowType(tableIndex, i, e.target.value)} /></td>
                                {<td width="100px"><p> {table.tablePositionX}, {table.tablePositionY} </p></td>}
                                {/*<td width="100px"><p> {Math.floor(x)}, {Math.floor(y)} </p></td>*/}
                            </tr>
                        )}
                        <tr>
                            <td colSpan={2}><button className="addRow" onClick={() => onAddRow(tableIndex)}> Add new field </button> </td>
                        </tr>
                    </tbody>
                </table>
                </foreignObject>
                <line x1={table.attributes[0].x} y1={table.attributes[0].y} x2={tables[1].tablePositionX} y2={tables[1].tablePositionY} style={{"stroke":"rgb(255,0,0)", "stroke-width":2}} />
            </svg>
            </div>
            </Draggable>
        )
    }
}
export default Table;