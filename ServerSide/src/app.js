const express = require('express');
const cors = require('cors');

require("../src/database/connection")

const signIn = require('./routers/signin')
const task = require ('./routers/task')

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(signIn)
app.use(task)

app.get("/",async(req,res)=>{
    res.send("Hell0 from HelperHub")
})

app.listen(port,()=>{
    console.log(`Connection is live at port ${port}`)
})