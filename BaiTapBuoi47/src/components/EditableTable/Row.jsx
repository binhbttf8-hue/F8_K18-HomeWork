import { useContext } from 'react'
import { Context } from './store.js'
import Cell from './Cell'

const Row = ({ rowIndex }) => {
  const { columns } = useContext(Context)

  return (
    <tr>
      {columns.map((column, index) => (
        <Cell
          key={column.name}
          rowIndex={rowIndex}
          columnIndex={index}
        />
      ))}
    </tr>
  )
}

export default Row
