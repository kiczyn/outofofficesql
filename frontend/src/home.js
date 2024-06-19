import React, { useRef, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'


const Home = (props) => {
    const [login, setLogin] = useState(localStorage.getItem('user'))
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [mode, setMode]=useState('')
    const [data,setData]=useState('')
    const [popup,setPopup]=useState(true)
    const [search,setSearch]=useState({data:'',target:'FullName'})
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
        console.log(typeof e)
        console.log(e)
        
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
              let tempStr=[];
              
              for(let x=0;x<r.data.length;x++){
                tempStr[x]=(Object.values(r.data[x]))
                
              }
              
                setData(Object.values(tempStr))
                
                
                
            }else
            console.log(r)
          })
            
    }

    const orderBy=(e)=>{
      console.log(e)
      console.log(typeof e)
      fetch('http://localhost:3080/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({e}),
      })
      .then((r) => r.json())
      .then((r) => {
        if ('success'===r.message){
          let tempStr=[];
          
          for(let x=0;x<r.data.length;x++){
            tempStr[x]=(Object.values(r.data[x]))
            
          }
          
            setData(Object.values(tempStr))
            
            
            
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
    const newSearch=()=>{
      if(search.data){
        console.log(true)
        fetch('http://localhost:3080/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({search}),
          })
          .then((r) => r.json())
          .then((r) => {
            if ('success'===r.message){
              let tempStr=[];
              
              for(let x=0;x<r.data.length;x++){
                tempStr[x]=(Object.values(r.data[x]))
                
              }
              
                setData(Object.values(tempStr))
                
                
                
            }else
            console.log(r)
    
          })}}
        

    return(
        <div>
        <input className={'inputButton'} type="button" onClick={()=>{setMode('employee');onButtonClick('employee');console.log("1")}} value={'Employees'} />
        <input className={'inputButton'} type="button" onClick={()=>{setMode('leaverequest');onButtonClick('leaverequest');console.log("2")}} value={'Leave requests'} />
        <input className={'inputButton'} type="button" onClick={()=>{setMode('project');onButtonClick('project');console.log("3")}} value={'Projects'} />
       
      <table border="1">
      
  <tr>
    <th>id<button onClick={()=>{orderBy('ID')}}>↑</button></th>
    <th>Full name<button onClick={()=>{orderBy('FullName')}}>↑</button></th>
    <th>Subdivision<button onClick={()=>{orderBy('Subdivision')}}>↑</button></th>
    <th>Position<button onClick={()=>{orderBy('Position')}}>↑</button></th>
    <th>Status<button onClick={()=>{orderBy('Status')}}>↑</button></th>
    <th>PeoplePartner<button onClick={()=>{orderBy('PeoplePartner')}}>↑</button></th>
    <th> OutOfOfficeBallance<button onClick={()=>{orderBy('OutOfOfficeBallance')}}>↑</button></th>
    <th>Photo</th>
    <th>login<button onClick={()=>{orderBy('login')}}>↑</button></th>
    <th>password<button onClick={()=>{orderBy('pass')}}>↑</button></th>
    
  </tr>
  
  
  <tbody >{data?Object.values(data).map(e=><tr>{Object.values(e).map(x=><td>{x}</td>)}</tr>):(<td>d</td>)}</tbody>
  </table>


       <p hidden={employee.ID?false:true}>{JSON.stringify(employee)}</p>
       
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
      <div>
      <label>Search: 
                <select name="search" onChange={(ev) => setSearch(((previous) => ({...previous,target: ev.target.value})))}>
                    <option value="FullName">FullName</option>
                    <option value="Subdivision">Subdivision</option>
                    <option value="Position">Position</option>
                    <option value="Status">Status</option>
                    <option value="PeoplePartner">PeoplePartner</option>
                    <option value="OutOfOfficeBallance">OutOfOfficeBallance</option>                
                    <option value="login">login</option>
                    <option value="pass">pass</option>                  
                    
                </select>
            </label>
            <input
            hidden={(search.target==="Status"||search.target==="Position")?true:false}
            value={search.data}            
            onChange={(ev) => setSearch(((previous) => ({...previous, data: ev.target.value})))}
            className={'inputBox'}></input>
            <select hidden={(search.target==="Position")?false:true} value={search.data}            
            onChange={(ev) => setSearch(((previous) => ({...previous, data: ev.target.value})))}>
                   <option value="Project Manager">Project Manager</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Employee">Employee</option>
                  </select>
            <select hidden={(search.target==="Status")?false:true} value={search.data}            
            onChange={(ev) => setSearch(((previous) => ({...previous, data: ev.target.value})))}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
            </select>

        <input type='button' onClick={newSearch} value={'⌕'}/>
      </div>
      
        </div>
    )
}
export default Home