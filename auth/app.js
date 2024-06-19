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
    console.log(login)  
    console.log(typeof password) 
    db.query('SELECT position FROM employee WHERE login =? AND pass=?',[login,password],function(err,result){
      
      if (err||result.length<=0){
            return res.status(401).json({status:'err',message:'err'})
        }else{
          let value=JSON.parse(JSON.stringify(result)) 
          console.log(result)
          console.log(login)
          console.log(password)
          connectUser(login,password)
          if(result.length>0)
            return res.status(200).json({status:'success',message:'success',position:value[0].position})}
    })
})

app.post('/getData',(req,res)=>{
  const {e}=req.body
  console.log(req.body)
  console.log(e)
    dbUser.query('SELECT * FROM ??',[e],function(err,result){
      if (err){
        console.log("error")
        return res.status(401).json({status:'err',message:'err'})
        
      }else{
        console.log("succ")
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
  console.log(JSON.stringify(userData.FullName))
  console.log(userData)
  console.log(JSON.stringify(userData.FullName),JSON.stringify(userData.Subdivision),JSON.stringify(userData.Position),JSON.stringify(userData.PeoplePartner),JSON.stringify(userData.OutOfOfficeBallance),JSON.stringify(userData.Login),JSON.stringify(userData.Password))
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