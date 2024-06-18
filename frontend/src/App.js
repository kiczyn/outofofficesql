import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login'
import Home from './home'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [login, setLogin] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login login={login} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setLogin={setLogin} />} />
          <Route path="/home" element={<Home setLoggedIn={setLoggedIn} setLogin={setLogin} />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App