import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from './store.js'

const CellInput = () => {
  const { columns, rows, cursor, setCursor, onCellChange } = useContext(Context)

  const { rowIndex, columnIndex, isEditing, initValue } = cursor

  const inputRef = useRef(null)

  const row = rows[rowIndex]
  const column = columns[columnIndex]
  const columnName = column?.name
  const cellValue = columnName ? (row?.[columnName] ?? '') : ''

  const [value, setValue] = useState(cellValue)

  // Sync value when cursor cell changes
  useEffect(() => {
    if (isEditing) {
      // If started by a keypress, use that key; otherwise use the cell's current value
      setValue(initValue !== undefined ? initValue : cellValue)
      // Focus and move cursor to end
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          const len = inputRef.current.value.length
          inputRef.current.setSelectionRange(len, len)
        }
      }, 0)
    } else {
      setValue(cellValue)
    }
  }, [rowIndex, columnIndex, isEditing])

  const moveToNextColumn = () => {
    // Save current value
    if (onCellChange && columnName) {
      onCellChange({ rowIndex, columnIndex, columnName, value })
    }

    const nextColumnIndex = columnIndex + 1
    if (nextColumnIndex >= columns.length) return

    const nextCellEl = document.querySelector(`#cell-${rowIndex}-${nextColumnIndex}`)
    if (!nextCellEl) return

    setCursor({
      top: nextCellEl.offsetTop,
      left: nextCellEl.offsetLeft,
      width: nextCellEl.offsetWidth,
      height: nextCellEl.offsetHeight,
      rowIndex,
      columnIndex: nextColumnIndex,
      isEditing: false,
      initValue: ''
    })

    // Focus the next cell so keyboard events still work
    nextCellEl.focus()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      moveToNextColumn()
    }
    if (e.key === 'Escape') {
      setCursor({ ...cursor, isEditing: false })
    }
  }

  if (!isEditing || rowIndex < 0 || columnIndex < 0) return null

  return (
    <div
      className="cell-input"
      style={{
        top: cursor.top,
        left: cursor.left,
        width: cursor.width,
        height: cursor.height
      }}
    >
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default CellInput
