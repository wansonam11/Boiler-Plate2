const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const config = require("./config/key")
const {User} = require("./models/User")

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

const mongoose = require("mongoose")

mongoose.connect(config.mongoURI, 
    err => {
        if(err) throw err;
        console.log("Connected to MongoDB")
    });

app.get('/', (req, res) => res.send("Hello World!"))

app.post("/register", (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err })
        return res.status(200).json({
                success: true
        })
    })
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))

