import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = (props) => {
    const [login, setLogin] = useState(localStorage.getItem('user'))
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [mode, setMode]=useState('')
    const [data,setData]=useState('')
    const [popup,setPopup]=useState(true)
    const onButtonClick=()=>{
        console.log(mode)
        console.log(typeof mode)
        
        fetch('http://localhost:3080/getData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({mode}),
          })
          .then((r) => r.json())
          .then((r) => {
            if ('success'===r.message){
                setData(r.data)
            }else
            console.log(r)
          })
    }
    
    return(
        <div>
        <input className={'inputButton'} type="button" onClick={()=>{setMode('employee');onButtonClick();}} value={'Employees'} />
        <input className={'inputButton'} type="button" onClick={()=>{setMode('leverequest');onButtonClick();}} value={'Leave requests'} />
        <input className={'inputButton'} type="button" onClick={()=>{setMode('project');onButtonClick();}} value={'Projects'} />
       <p>{JSON.stringify(data)}</p>
       <input type='button' onClick={() => setPopup(!popup)} value={'New employee'}/>
       <div hidden={popup}>
            
       </div>
        </div>
    )
}
export default Home