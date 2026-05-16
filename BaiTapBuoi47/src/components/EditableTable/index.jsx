import './style.sass'
import { Context } from './store.js'
import Row from './Row'
import CellInput from './CellInput'
import { useState } from 'react'

const EditableTable = ({ columns, rows, onCellChange }) => {
  const [cursor, setCursor] = useState({
    top: -1,
    left: -1,
    width: 0,
    height: 0,
    rowIndex: -1,
    columnIndex: -1,
    isEditing: false,
    initValue: ''
  })

  const provider = {
    columns,
    rows,
    cursor,
    setCursor,
    onCellChange
  }

  return (
    <div style={{ position: 'relative' }}>
      <Context value={provider}>
        <table className="editable-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name} style={{ width: column.width }}>
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <Row key={index} rowIndex={index} />
            ))}
          </tbody>
        </table>
        <CellInput />
      </Context>
    </div>
  )
}

export default EditableTable
