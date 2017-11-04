import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Table from './Table'


class Visualization extends React.Component {
    render() {
        const { data, dataEvent, onAddRow, updateTableName, updateRowProp, updateRowType, onAddTable, onDragTable, refreshRowPositions} = this.props
        return (

        <div className='visualization'>
        <button onClick={onAddTable}> Create table </button>
        <button> Add relations </button>
                {data.tables.map((table, i) =>
                    <Table tables= {data.tables} key={i} tableIndex={i} table={table} onAddRow={onAddRow}  updateTableName={updateTableName}
                    updateRowProp={updateRowProp} updateRowType={updateRowType}
                    onDragTable={onDragTable} dataEvent={dataEvent} refreshRowPositions={refreshRowPositions}/>
                )}
            </div>
        )
    }
}
export default Visualization;