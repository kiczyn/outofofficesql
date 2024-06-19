const express =require('express')
const sql=require('mysql2')
var cors=require('cors')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

var mysql = require('mysql2');

var db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port:process.env.port,
  database: "outofoffice"
});



db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
var dbUser;
const connectUser=(login,password)=>{
  console.log("connecting user")
   dbUser = mysql.createConnection({
    host: process.env.host,
    user: login,
    password: password,
    port:process.env.port,
    database: "outofoffice"
  });
  dbUser.connect(function(err) {
    if (err) throw err;
    console.log("Connected2!");
  });
}


app.listen(3080)


app.post('/auth',(req,res)=>{
  console.log(req.body)
    const {login,password}=req.body 
    // console.log(login)  
    // console.log(typeof password) 
    db.query('SELECT position, FullName,ID FROM employee WHERE login =? AND pass=?',[login,password],function(err,result){
      
      if (err||result.length<=0){
            return res.status(401).json({status:'err',message:'err'})
        }else{
          let value=JSON.parse(JSON.stringify(result)) 
           console.log(result+"avb")
          // console.log(login)
          // console.log(password)
          connectUser(login,password)
          if(result.length>0){
            console.log(value[0].FullName)
            return res.status(200).json({status:'success',message:'success',position:value[0].position,FullName:value[0].FullName,ID:value[0].ID})}}
    })
})

app.post('/getData',(req,res)=>{
  const {e}=req.body
  console.log(req.body)
  console.log(e)
    dbUser.query('SELECT * FROM ??',[e],function(err,result){
      if (err){
        //console.log("error")
        return res.status(401).json({status:'err',message:'err'})
        
      }else{
        //console.log("succ")
        let value=JSON.parse(JSON.stringify(result))
        //console.log(result)
            return res.status(200).json({status:'success',message:'success',data:value})
      }
    })
})
app.post('/sort',(req,res)=>{
  const {e,mode}=req.body
  console.log(req.body)
  console.log(e)
    dbUser.query('SELECT * FROM ?? ORDER BY ?? DESC',[mode,e],function(err,result){
      if (err){
        console.log(err)
        return res.status(401).json({status:'err',message:'err'})
        
      }else{
        console.log("succ")
        let value=JSON.parse(JSON.stringify(result))
        console.log(result)
            return res.status(200).json({status:'success',message:'success',data:value})
      }
    })
})

app.post('/search',(req,res)=>{
  let searchData=req.body.search
  console.log("dzis")
  console.log(req.body.search)
  dbUser.query('SELECT * FROM employee WHERE '+searchData.target+' LIKE "'+searchData.data+'%"',[searchData.target],function(err,result){
    if (err){
      console.log(err)
      return res.status(401).json({status:'err',message:'err'})
    }else{
      console.log("succccc")
      let value=JSON.parse(JSON.stringify(result))
      console.log(result)
          return res.status(200).json({status:'success',message:'success',data:value})
    }
  })
})

app.post('/newEmployee',(req,res)=>{
  //console.log(req.body)
  console.log("bodu")
  let userData=req.body.employee;
    dbUser.query('INSERT INTO employee ( FullName, Subdivision, Position, Status, PeoplePartner, OutOfOfficeBallance, login, pass) VALUES  (?, ?, ?,?, ?, ?, ?,?); CREATE USER ?@ ? IDENTIFIED BY ?;',
    [userData.FullName,userData.Subdivision,userData.Position,"Active",userData.PeoplePartner,userData.OutOfOfficeBallance,userData.Login,userData.Password,userData.Login,"localhost",userData.Password],function(err,result){
    if (err){
      console.log(err)
      return res.status(401).json({status:'err',message:'err'})
      
    }else{
      console.log("succ")
      
      console.log(result)
          return res.status(200).json({status:'success',message:'success'})
    }
  })
  //return res.status(200)
})

app.post('/newLeave',(req,res)=>{
  console.log(req.body.leave)
  let leaveData=req.body.leave
  dbUser.query('INSERT INTO leaverequest(Employee,AbsenceReason,StartDate,EndDate,Comment,Status) VALUES (?,?,?,?,?,?)',[leaveData.ID, leaveData.AbsenceReason, leaveData.StartDate, leaveData.EndDate, leaveData.comment, leaveData.Status],function(err,result){
    if (err){
      console.log(err)
      return res.status(401).json({status:'err',message:'err'})
      
    }else{
      console.log("succ")
      
      console.log(result)
          return res.status(200).json({status:'success',message:'success'})
    }
  })
  })



