import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = (props) => {
    const [login, setLogin] = useState(localStorage.getItem('user'))
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [mode, setMode]=useState('')
    const [data,setData]=useState('')
    const [popup,setPopup]=useState(true)
    const buttonValidation=useRef(false)
    const [employee,setEmployee]=useState({
        FullName:'',
        Subdivision:'',
        Position:'Project Manager',
        PeoplePartner:'',
        OutOfOfficeBallance:'',
        Login:'',
        Password:''
    })
    const onButtonClick=(e)=>{
        
        
        console.log(mode)
        console.log(typeof mode)
        
        fetch('http://localhost:3080/getData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({e}),
          })
          .then((r) => r.json())
          .then((r) => {
            if ('success'===r.message){
                setData(r.data)
            }else
            console.log(r)
          })
        
    }
    const newEmployee=()=>{
        if(employee.FullName&&employee.Subdivision&&employee.PeoplePartner&&employee.OutOfOfficeBallance&&employee.Login&&employee.Password){
            console.log(true)
            fetch('http://localhost:3080/newEmployee', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({employee}),
              })
              .then((r) => r.json())
              .then((r) => {
                if ('success'===r.message){
                    console.log(r.message)
                }else
                console.log(r)
              })
        }
    }


    return(
        <div>
        <input className={'inputButton'} type="button" onClick={()=>{setMode('employee');onButtonClick('employee');console.log("1")}} value={'Employees'} />
        <input className={'inputButton'} type="button" onClick={()=>{setMode('leaverequest');onButtonClick('leaverequest');console.log("2")}} value={'Leave requests'} />
        <input className={'inputButton'} type="button" onClick={()=>{setMode('project');onButtonClick('project');console.log("3")}} value={'Projects'} />
       <p>{JSON.stringify(data)}</p>
       <p>{JSON.stringify(employee)}</p>
       
       <input type='button' onClick={() => setPopup(!popup)} value={'New employee'}/>

       <div hidden={popup}>
            <input 
             value={employee.FullName}
             placeholder="Full Name"
             onChange={(ev) => setEmployee(((previous) => ({...previous, FullName: ev.target.value})))}
             className={'inputBox'}></input>
            <input
            value={employee.Subdivision}
             placeholder="Subdivision"
             onChange={(ev) => setEmployee(((previous) => ({...previous, Subdivision: ev.target.value})))}
             className={'inputBox'}></input>
            <label>Position: 
                <select name="position" onChange={(ev) => setEmployee(((previous) => ({...previous, Position: ev.target.value})))}>
                    <option value="Project Manager">Project Manager</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Employee">Employee</option>
                </select>
            </label>
            
            
            
            <input
            value={employee.PeoplePartner}
            placeholder="People partner"
            onChange={(ev) => setEmployee(((previous) => ({...previous, PeoplePartner: ev.target.value})))}
            className={'inputBox'}></input>
            <input
            value={employee.OutOfOfficeBallance}
            placeholder="Out of office balance"
            onChange={(ev) => setEmployee(((previous) => ({...previous, OutOfOfficeBallance: ev.target.value})))}
            className={'inputBox'}></input>
            <input
            value={employee.Login}
            placeholder="Login"
            onChange={(ev) => setEmployee(((previous) => ({...previous, Login: ev.target.value})))}
            className={'inputBox'}></input>
            <input
            value={employee.Password}
            placeholder="Password"
            onChange={(ev) => setEmployee(((previous) => ({...previous, Password: ev.target.value})))}
            className={'inputBox'}></input>
      
             <input type='button' onClick={newEmployee} value={'Submit'}/>
      </div>
        </div>
    )
}
export default Home