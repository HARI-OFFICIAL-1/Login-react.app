const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/login").then(() => console.log("db connect ..."))
    .catch(() => console.log("db error"))

//model create
const logindata = mongoose.model("logindata", { name: String, gmail: { type: String, unique: true }, pass: Number }, "logindata")


app.get('/loginlist', function (req, res) {
    logindata.find().then(function (data) {
        res.send(data)
    })
})


//backend register add
app.post("/register", function (req, res) {
    var { name, gmail, pass } = req.body;

   logindata.findOne({ gmail: gmail }).then(existingUser => {
        if (existingUser) {
            res.json("duplicate");  // 👈 Respond with duplicate status
        } else {
            const newData = new logindata({ name, gmail, pass });
            newData.save()
                .then(() => {
                    console.log("User saved");
                    res.json("success");  // 👈 Confirm success to frontend
                })
                .catch(() => {
                    console.log("Can't save user");
                    res.status(500).json("error");
                });
        }
    })
        .catch(() => console.log("con't save data"))
})

//login
app.post("/login", function (req, res) {
    var { gmail, pass } = req.body
    logindata.findOne({ gmail })
        .then(function (user) {
            if (user)
                if (user.pass === Number(pass)) {
                    res.json("success")
                    console.log('success')
                }
                else {
                    res.json('error')
                    console.log('pass error')
                }
            else {
                res.json("no record")
                console.log('error record')
            }
        })
})

app.listen(5001, function () {
    console.log("server start ...")
})