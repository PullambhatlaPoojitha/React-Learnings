const express = require('express');
const mysql = require('mysql');
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "ev_stations",

});
app = express();
var cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
// db.connect((err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("connected.");
//     }
// });

app.get("/", (req, res) => {
    console.log("your server has been started..");
})
app.post("/insert", (req, res) => {
    const EV_ID = req.body.EV_ID;
    const EV_NAME = req.body.EV_NAME;
    const EV_PLACE = req.body.EV_PLACE;
    const insert = "insert into evstat_india (EV_ID, EV_NAME, EV_PLACE) values(?, ?, ?)";
    db.query(insert, [EV_ID, EV_NAME, EV_PLACE], (err, data) => {
        console.log(err);
    })
})
app.post("/delete/:EV_ID",(req,res)=>{
    const EV_ID=req.params.EV_ID;
    const del="delete from evstat_india where evstat_india.EV_ID=?";
    db.query(del,[EV_ID],(err,data)=>{
        console.log(err);
    })
})
app.post("/update",(req,res)=>{
    // const EV_ID = req.body.EV_ID;
    // const EV_NAME = req.body.EV_NAME;
    // const EV_PLACE = req.body.EV_PLACE;
    const{EV_PLACE,EV_NAME}=req.body
    console.log(EV_PLACE);
    console.log(EV_NAME);
    const update="update evstat_india set EV_PLACE = ? where EV_NAME = ?";
    db.query(update,[EV_PLACE,EV_NAME],(err,data)=>{
        console.log(err);
    })
})
app.get("/rep", (req, res) => {
    console.log("Please Wait! we are fetching your data...");
    db.query("select * from evstat_india", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            res.send(data);
        }
    });
});
app.listen(3000, () => {
    console.log("ushh! your server is listening...");
})