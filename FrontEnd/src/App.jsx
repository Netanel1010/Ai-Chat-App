import { useState } from 'react'
import './App.css'
import Chat from './components/Chat.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1> AI Chat App </h1>
      <Chat/>
    </>
  )
}

export default App
