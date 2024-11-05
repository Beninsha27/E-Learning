const express = require('express')
const bodyParser = require('body-parser')
const cors=require('cors')
const db=require('./DBConnection')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(`${__dirname}/upload`));

app.use(cors())
const route=require('./routes') 
app.use('/e-learning',route)

app.listen(4000, () => {
    console.log("Server Started")  
})
