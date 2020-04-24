const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));
const dummydata = 
`
{
"data":
[
            {"orderid": 1, "Name": "Ahmad Humayun", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 2, "Name": "something", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 3, "Name": "Punnal", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 4, "Name": "Ismail", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 5, "Name": "Khan", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 6, "Name": "Baloch", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 7, "Name": "Mahad", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 8, "Name": "Ali", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 9, "Name": "Ayaz", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 10, "Name": "Abdullah", "Address":"203-C Askari 11", "Order":"something", "status":"Pending"},
            {"orderid": 11, "Name": "Hassan Mahad", "Address":"Falcon complex", "Order":"something different", "status":"Pending"}
]
}
`
app.get("/api/*", (req, res) => {

    console.log(req.url)
    res.send(JSON.parse(dummydata))
})
app.get("/*", function(req, res) {
    console.log(req.baseUrl)
    console.log(req.originalUrl)
    console.log(req.route)
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post('/api/*', (req, res) => {
    console.log('POST', req.body)
})


app.listen(9000);
