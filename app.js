
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const MainRoutes = require('./routes/index')
const config = require('./config')

const Vaccination = require('./models/vacStatus')
const StudentLogin = require('./models/studentLogin')
const Outpass = require('./models/OutPass')
const {Users} = require('./models/User')
const Login = require('./models/login')
const security = require('./models/security')

const {MONGO_URI} = config

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use("/outpass" , MainRoutes)
app.use(express.static(path.join(__dirname, "client/build")))


const PORT = 3001 || process.env.PORT


// Publish a message to the test channel
// channel.publish('greeting', 'hello'); 

app.post('/hello' , (req,res)=>{
    console.log(req.body)
    res.send("dfd")
    
})

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser 
  .then(() => console.log("Connected to database in cluster"))
  .catch((err) => console.log(err));


// Schema 
// HTNO ,STUDENT_NAME DOSE , VAC_NAME , DATE  
// Vaccination.create({
//      HTNO : "1",
//      STUDENT_NAME : "2",
//      DOSE : "2",
//      VAC_NAME : "233",
//      DATE: "23"
// })

//HTNO,STUDENT_NAME, STUDENT_EMAIL,PASSWORD,

// StudentLogin.create({
//     HTNO : "gfg",
//     STUDENT_NAME : "dfd",
//     STUDENT_EMAIL : "dfv",
//     PASSWORD : "fdvf"
// })

// TOKEN ,ASN_DATE , HTNO , STUDENT_NAME ,BLOCK , ROOM , FROM , TO , REASON , APPROVED , USED , BATCH 

// Outpass.create({
//       TOKEN : "VD",
//     ASN_DATE : "dvcv",
//     HTNO : "qwq",
//     STUDENT_NAME : "12",
//     BLOCK : "fdf",
//     ROOM : "ddvd",
//     FROM : "fd",
//     TO :"jh",
//     REASON : "ioi",
//     APPROVED : "gfg",
//     USED : "dv",
//     BATCH : "v"

// })


// EID, NAME, EMAIL, PASSWORD, TYPE;

// Users.create({
//     EID : "Cd",
//     NAME : "Vd",
//     EMAIL :"vf",
//     PASSWORD : "vvc",
//     TYPE : "vvf"
//     })


// Login.create({
//   HTNO: "2e435",
//   STUDENT_NAME: "sfd",
//   STUDENT_EMAIL: "rvg",
//   STUDENT_MOBILE: "4rf4re",
//   FATHER_NAME: "452",
//   PARENTS_MOBILE: "fsdcc",
//   PARENTS_EMAIL: "fcd",
//   PASSWORD: "r4ewr",
//   BATCH: "scxc",
//   RESET_TOKEN: "cc",
// });

// security.create({
//   HTNO: "hello",
//   STUDENT_NAME: "erg",
//   BRANCH: "dg",
//   MOVING: "gdd",
//   REMARKS: "dth",
//   DATE: new Date(),
//   BATCH: "sghb",
// });



app.listen(PORT , ()=>{
    console.log("Connected to server")
})