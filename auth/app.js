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
  port:process.env.port
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});




app.listen(3080)


app.post('/auth',(req,res)=>{
    const {login,password}=req.body
    console.log(login)
    console.log(password)
    db.query('SELECT login FROM outofoffice.employee WHERE login =? AND pass=?',[login,password],function(err,result){
        if (err){
            return res.status(401).json({status:'err',message:'err'})
        }else
           return res.status(200).json({status:'success',message:'success'})
    })
})