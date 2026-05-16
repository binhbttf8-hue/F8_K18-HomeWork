import './App.css'
import EditableTable from './components/EditableTable'
import { useState } from 'react'

const columns = [
  { name: 'product', width: '50%' },
  { name: 'quantity', width: '10%' },
  { name: 'price', width: '15%' },
  { name: 'amount', width: '15%' },
  { name: 'comment', width: '10%' },
]

const initialRows = [
  { id: 1, product: 'Laptop Dell XPS 15', quantity: 5, price: 25000000, amount: 125000000, comment: 'New arrival' },
  { id: 2, product: 'Keyboard Logitech MX', quantity: 10, price: 1500000, amount: 15000000, comment: 'In stock' },
  { id: 3, product: 'Mouse Razer DeathAdder', quantity: 8, price: 900000, amount: 7200000, comment: '' },
  { id: 4, product: 'Monitor LG UltraWide', quantity: 3, price: 12000000, amount: 36000000, comment: 'Limited' },
  { id: 5, product: 'Webcam Logitech C920', quantity: 15, price: 2000000, amount: 30000000, comment: '' },
]

function App() {
  const [rows, setRows] = useState(initialRows)

  const onCellChange = ({ rowIndex, columnName, value }) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === rowIndex ? { ...row, [columnName]: value } : row
      )
    )
  }

  return (
    <div className="app-container">
      <h1 className="app-title">📊 Google Sheet Clone</h1>
      <p className="app-desc">
        Click to select a cell • Double-click or press any key to edit • Press <kbd>Enter</kbd> to confirm and move right • <kbd>Esc</kbd> to cancel
      </p>
      <div className="table-wrapper">
        <EditableTable columns={columns} rows={rows} onCellChange={onCellChange} />
      </div>
    </div>
  )
}

export default App
