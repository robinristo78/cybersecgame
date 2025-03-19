import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Poll from './components/Poll'
import Ask from './components/Ask'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <Login />
      </div>
      <div>
        <Poll />
      </div>
      <div>
        <Ask />
      </div>
    </>
  )
}

export default App
