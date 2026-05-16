import { useContext, useRef } from 'react'
import { Context } from './store.js'

const Cell = ({ rowIndex, columnIndex }) => {
  const { columns, rows, cursor, setCursor } = useContext(Context)
  const keyBufferRef = useRef('')

  const row = rows[rowIndex]
  const column = columns[columnIndex]
  const columnName = column.name
  const cell = row[columnName]

  const isSelected =
    cursor.rowIndex === rowIndex && cursor.columnIndex === columnIndex

  const onClick = () => {
    const cellEl = document.querySelector(`#cell-${rowIndex}-${columnIndex}`)
    setCursor({
      top: cellEl.offsetTop,
      left: cellEl.offsetLeft,
      width: cellEl.offsetWidth,
      height: cellEl.offsetHeight,
      rowIndex,
      columnIndex,
      isEditing: false,
      initValue: ''
    })
  }

  const onDoubleClick = () => {
    const cellEl = document.querySelector(`#cell-${rowIndex}-${columnIndex}`)
    setCursor({
      top: cellEl.offsetTop,
      left: cellEl.offsetLeft,
      width: cellEl.offsetWidth,
      height: cellEl.offsetHeight,
      rowIndex,
      columnIndex,
      isEditing: true,
      initValue: row[columnName] ?? ''
    })
  }

  // When a cell is selected (but NOT editing), pressing any printable key starts editing
  const onKeyDown = (e) => {
    if (!isSelected || cursor.isEditing) return
    // Ignore modifier-only keys, Arrows, Tab, Escape, F-keys, etc.
    if (e.key.length > 1) return
    const cellEl = document.querySelector(`#cell-${rowIndex}-${columnIndex}`)
    setCursor({
      top: cellEl.offsetTop,
      left: cellEl.offsetLeft,
      width: cellEl.offsetWidth,
      height: cellEl.offsetHeight,
      rowIndex,
      columnIndex,
      isEditing: true,
      initValue: e.key  // pre-fill the input with the pressed key
    })
    e.preventDefault()
  }

  return (
    <td
      id={`cell-${rowIndex}-${columnIndex}`}
      tabIndex={0}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      className={isSelected && !cursor.isEditing ? 'cell-selected' : ''}
    >
      {cell}
    </td>
  )
}

export default Cell
