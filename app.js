const express = require("express");

const app = express();

app.use(express.static('public'));


// app.get(path, code);


//Route for home
app.get("/", (req, res, next) => {
    console.log("we received a request for the HOME page");
    // res.send(`message`);
    res.sendFile(__dirname + "/views/home.html");
});

//Route for contact page
app.get("/contact", (req, res, next) => {
    console.log("we received a request for the CONTACT page")
    res.sendFile(__dirname + "/views/contact.html");
});



app.listen(3000)

