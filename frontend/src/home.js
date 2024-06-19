import React, { useRef, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'


const Home = (props) => {
  const [login, setLogin] = useState(localStorage.getItem('user'))
  
  const [role, setRole] = useState(localStorage.getItem('role'))
  const [mode, setMode] = useState('')
  const [leave, setLeave] = useState({Employee:'', AbsenceReason: 'sickLeave', StartDate: '', EndDate: '', comment: '' ,Status:'New'})
  const [project, setProject] = useState('')
  const [data, setData] = useState('')
  const [popup, setPopup] = useState(true)
  const [empName, setEmpName] = useState(localStorage.getItem('name'))
  const [empID,setEmpId]=useState(localStorage.getItem('ID'))
  const [search, setSearch] = useState({ data: '', target: 'FullName' })
  const [employee, setEmployee] = useState({
    FullName: '',
    Subdivision: '',
    Position: 'Project Manager',
    PeoplePartner: '',
    OutOfOfficeBallance: '',
    Login: '',
    Password: ''
  })
  const onButtonClick = (e) => {
    console.log(typeof empName)
    setPopup(true)
    console.log(typeof e)
    console.log(e)

    console.log(mode)
    console.log(typeof mode)

    fetch('http://localhost:3080/getData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ e }),
    })
      .then((r) => r.json())
      .then((r) => {

        if ('success' === r.message) {
          let tempStr = [];

          for (let x = 0; x < r.data.length; x++) {
            tempStr[x] = (Object.values(r.data[x]))

          }
          setData(Object.values(tempStr))
        }
        else
          console.log(r)
      })

  }

  const orderBy = (e) => {
    console.log(e)
    console.log(typeof e)
    fetch('http://localhost:3080/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ e ,mode}),
    })
      .then((r) => r.json())
      .then((r) => {
        if ('success' === r.message) {
          let tempStr = [];

          for (let x = 0; x < r.data.length; x++) {
            tempStr[x] = (Object.values(r.data[x]))

          }

          setData(Object.values(tempStr))



        } else
          console.log(r)

      })
  }

  const newEmployee = () => {
    if ((employee.FullName && employee.Subdivision && employee.PeoplePartner && employee.OutOfOfficeBallance && employee.Login && employee.Password)) {
      console.log(true)
      fetch('http://localhost:3080/newLeave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee }),
      })
        .then((r) => r.json())
        .then((r) => {
          if ('success' === r.message) {
            console.log(r.message)
          } else
            console.log(r)
        })
    }
  }
  const newSearch = () => {
    if (search.data) {
      console.log(true)
      console.log(JSON.stringify({ search, mode }))
      fetch('http://localhost:3080/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search, mode }),
      })
        .then((r) => r.json())
        .then((r) => {
          if ('success' === r.message) {
            switch (mode) {
              case "employee": {
                let tempStr = [];
                for (let x = 0; x < r.data.length; x++) {
                  tempStr[x] = (Object.values(r.data[x]))
                }
                setData(Object.values(tempStr))
                break;
              }
              case "project": {
                console.log(r.data)
                setEmpName(r.data[0].FullName)
                break;
              }



            }

          } else
            console.log(r)

        })
    }
  }
  const newLeave = () => {
    console.log(leave)
    if ((leave.AbsenceReason&&leave.EndDate&&leave.StartDate)) {
      console.log(true)
      fetch('http://localhost:3080/newLeave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leave }),
      })
        .then((r) => r.json())
        .then((r) => {
          if ('success' === r.message) {
            console.log(r.message)
          } else
            console.log(r)
        })
    }
  }


  return (
    <div>
      <input className={'inputButton'} type="button" onClick={() => { setMode('employee'); onButtonClick('employee'); setSearch({ data: '', target: 'FullName' }) }} value={'Employees'} />
      <input className={'inputButton'} type="button" onClick={() => { setMode('leaverequest'); onButtonClick('leaverequest'); setSearch({ data: '', target: '' }) }} value={'Leave requests'} />
      <input className={'inputButton'} type="button" onClick={() => { setMode('project'); onButtonClick('project'); setSearch({ data: '', target: '' }) }} value={'Projects'} />
      <p hidden={mode === "employee" ? false : true}>
        <table border="1">

          <tr>
            <th>id<button onClick={() => { orderBy('ID') }}>↑</button></th>
            <th>Full name<button onClick={() => { orderBy('FullName') }}>↑</button></th>
            <th>Subdivision<button onClick={() => { orderBy('Subdivision') }}>↑</button></th>
            <th>Position<button onClick={() => { orderBy('Position') }}>↑</button></th>
            <th>Status<button onClick={() => { orderBy('Status') }}>↑</button></th>
            <th>PeoplePartner<button onClick={() => { orderBy('PeoplePartner') }}>↑</button></th>
            <th> OutOfOfficeBallance<button onClick={() => { orderBy('OutOfOfficeBallance') }}>↑</button></th>
            <th>Photo</th>
            <th>login<button onClick={() => { orderBy('login') }}>↑</button></th>
            <th>password<button onClick={() => { orderBy('pass') }}>↑</button></th>

          </tr>


          <tbody >{data ? Object.values(data).map(e => <tr>{Object.values(e).map(x => <td>{x}</td>)}</tr>) : (<td>d</td>)}</tbody>
        </table>





        <div>
          <label>Search:
            <select name="search" onChange={(ev) => setSearch(((previous) => ({ ...previous, target: ev.target.value })))}>
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
            hidden={(search.target === "Status" || search.target === "Position") ? true : false}
            value={search.data}
            onChange={(ev) => setSearch(((previous) => ({ ...previous, data: ev.target.value })))}
            className={'inputBox'}></input>
          <select hidden={(search.target === "Position") ? false : true} value={search.data}
            onChange={(ev) => setSearch(((previous) => ({ ...previous, data: ev.target.value })))}>
            <option value="Project Manager">Project Manager</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Administrator">Administrator</option>
            <option value="Employee">Employee</option>
          </select>
          <select hidden={(search.target === "Status") ? false : true} value={search.data}
            onChange={(ev) => setSearch(((previous) => ({ ...previous, data: ev.target.value })))}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <input type='button' onClick={newSearch} value={'⌕'} />
        </div>
        <input type='button' onClick={() => setPopup(!popup)} value={'New employee'} />

        <div hidden={popup && mode === "employee"}>
          <input
            value={employee.FullName}
            placeholder="Full Name"
            onChange={(ev) => setEmployee(((previous) => ({ ...previous, FullName: ev.target.value })))}
            className={'inputBox'}></input>
          <input
            value={employee.Subdivision}
            placeholder="Subdivision"
            onChange={(ev) => setEmployee(((previous) => ({ ...previous, Subdivision: ev.target.value })))}
            className={'inputBox'}></input>
          <label>Position:
            <select name="position" onChange={(ev) => setEmployee(((previous) => ({ ...previous, Position: ev.target.value })))}>
              <option value="Project Manager">Project Manager</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Administrator">Administrator</option>
              <option value="Employee">Employee</option>
            </select>
          </label>
          <input
            value={employee.PeoplePartner}
            placeholder="People partner"
            onChange={(ev) => setEmployee(((previous) => ({ ...previous, PeoplePartner: ev.target.value })))}
            className={'inputBox'}></input>
          <input
            value={employee.OutOfOfficeBallance}
            placeholder="Out of office balance"
            onChange={(ev) => setEmployee(((previous) => ({ ...previous, OutOfOfficeBallance: ev.target.value })))}
            className={'inputBox'}></input>
          <input
            value={employee.Login}
            placeholder="Login"
            onChange={(ev) => setEmployee(((previous) => ({ ...previous, Login: ev.target.value })))}
            className={'inputBox'}></input>
          <input
            value={employee.Password}
            placeholder="Password"
            onChange={(ev) => setEmployee(((previous) => ({ ...previous, Password: ev.target.value })))}
            className={'inputBox'}></input>

          <input type='button' onClick={newEmployee} value={'Submit'} />
        </div>
      </p>
      <p hidden={mode === "leaverequest" ? false : true}>
        <table border="1">
          <th>ID<button onClick={() => { orderBy('ID') }}>↑</button></th>
          <th>Employee<button onClick={() => { orderBy('Employee') }}>↑</button></th>
          <th>Absence_Reason<button onClick={() => { orderBy('AbsenceReason') }}>↑</button></th>
          <th>Start_Date<button onClick={() => { orderBy('StartDate') }}>↑</button></th>
          <th>EndDate<button onClick={() => { orderBy('EndDate') }}>↑</button></th>
          <th>Comment<button onClick={() => { orderBy('Comment') }}>↑</button></th>
          <th>Status<button onClick={() => { orderBy('Status') }}>↑</button></th>
          <tbody >{data ? Object.values(data).map(e => <tr>{Object.values(e).map(x => <td>{x}</td>)}</tr>) : (<td>d</td>)}</tbody>
        </table>



        <input type='button' onClick={() => { setPopup(!popup)}}    value={'New leave request'} />

        <div hidden={popup && mode === "leaverequest"}>
          <label >{empName}</label>
          <div>
            <select id="absenceReason" name="absenceReason" onChange={(ev) => setLeave(((previous) => ({ ...previous, AbsenceReason: ev.target.value, ID:parseInt(localStorage.getItem('ID')) })))}>
              <option value="sickLeave">Sick Leave</option>
              <option value="vacation">Vacation</option>
              <option value="personalLeave">Personal Leave</option>
              <option value="bereavement">Bereavement</option>
              <option value="juryDuty">Jury Duty</option>
              <option value="maternityLeave">Maternity Leave</option>
              <option value="paternityLeave">Paternity Leave</option>
              <option value="unpaidLeave">Unpaid Leave</option>
              <option value="training">Training</option>
            </select>
          </div>
          <div>
            <label>Start</label>
            <input type='date' value={leave.StartDate}

              onChange={(ev) => setLeave(((previous) => ({ ...previous, StartDate: ev.target.value })))}></input>
          </div>
          <div>
            <label>End</label>
            <input type='date' value={leave.EndDate}
              onChange={(ev) => setLeave(((previous) => ({ ...previous, EndDate: ev.target.value })))} ></input>
          </div>
          <label>Comment:</label>
          <div>
            <textarea name="Comment" cols="40" rows="5" value={leave.comment}

              onChange={(ev) => setLeave(((previous) => ({ ...previous, comment: ev.target.value })))}></textarea>
            <input type='button' onClick={newLeave} value={'Submit'} />

          </div>
        </div>






      </p>

      <p hidden={mode === "project" ? false : true}>
        <table border="1">
          <th>ID<button onClick={() => { orderBy('ID') }}>↑</button></th>
          <th>ProjectType<button onClick={() => { orderBy('ProjectType') }}>↑</button></th>
          <th>StartDate<button onClick={() => { orderBy('StartDate') }}>↑</button></th>
          <th>EndDate<button onClick={() => { orderBy('EndDate') }}>↑</button></th>
          <th>ProjectManager<button onClick={() => { orderBy('ProjectManager') }}>↑</button></th>
          <th>Comment<button onClick={() => { orderBy('Comment') }}>↑</button></th>
          <th>Status<button onClick={() => { orderBy('Status') }}>↑</button></th>


        </table>
        <input type='button' onClick={() => { setPopup(!popup) }} value={'New leave request'} />
        <div hidden={popup && mode === "leaverequest"}>
          <label >{JSON.parse(empName)}</label>


        </div>




      </p>





    </div>
  )
}
export default Home