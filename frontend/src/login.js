import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
 

  const navigate = useNavigate()

  const onButtonClick = () => {
    console.log(typeof login)
    fetch('http://localhost:3080/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })
    .then((r) => r.json())
    .then((r) => {
      if ('success'===r.message){
      localStorage.setItem('user', JSON.stringify({login}))
      localStorage.setItem('role',JSON.stringify(r.position))
      console.log(localStorage.getItem('role'))
      props.setLoggedIn(true)
      props.setLogin(JSON.stringify({login}))
      navigate('/home')

    }else
      navigate('/')

    })
  }

  return (
    <div className={'main'}>
      <div className={'title'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'input'}>
        <input
          value={login}
          placeholder="login"
          onChange={(ev) => setLogin(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'input'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login