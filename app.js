const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const Pizza = require("./models/Pizza.model");

const app = express();

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

app.use(express.static('public')); //config. directory for static files
app.use(bodyParser.urlencoded({ extended: true })); //config. body-parser

hbs.registerPartials(__dirname + "/views/partials"); //config. for partials



mongoose
  .connect('mongodb://127.0.0.1/pizzaForEach')
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => console.error('Error connecting to mongo', err));





//Homepage
app.get("/", (req, res, next) => {
    console.log("we received a request for the HOME page");
    // res.send(`message`);
    // res.sendFile(__dirname + "/views/home.html");
    res.render("home");
});



//GET /contact
app.get("/contact", (req, res, next) => {
    console.log("we received a request for the CONTACT page")
    // res.sendFile(__dirname + "/views/contact.html");
    res.render("contact");
});


//GET /pizzas
app.get("/pizzas", (req, res, next) => {

    let maxPrice = req.query.maxPrice;
    // conts {maxPrice} = req.query;

    maxPrice = Number(maxPrice); //convert to a number

    let filter = {};
    if(maxPrice){
        filter = { price: { $lte: maxPrice } };
    }

    Pizza.find(filter)
        .then( (responseFromMongoose) => {
            
            const data = {
                pizzasArr: responseFromMongoose
            };

            res.render("product-list", data);
        })
        .catch( (error) => {
            console.log("error getting list of pizzas from DB...", error);
        });
});


//GET /pizzas/create-your-own
app.get("/pizzas/create-your-own", (req, res, next) => {
    res.send("display page to create your own pizza")
});


//GET /pizzas/xxx
app.get("/pizzas/:pizzaName", (req, res, next) => {
    console.log(req.params);

    const pizzaName = req.params.pizzaName;
    // const {pizzaName} = req.params; //object destructuring    

    Pizza.findOne({title: pizzaName})
        .then( (pizzaFromDB) => {
            if(pizzaFromDB === null){
                res.send("sorry chef, your pizza doesnt exist");
            } else {
                res.render("product", pizzaFromDB);
            }
        })
        .catch( (error) => {
            console.log("error getting data from DB...", error);
        });

});


//POST /login
app.post("/login", (req, res, next) => {
    
    // const {email, pw} = req.body;
    const email = req.body.email;
    const pw = req.body.pw;

    if(pw === "1234"){
        res.send("all good, you're logged in my friend!");
    } else {
        res.send(`Hello ${email} we've received your request to login but we don't like your password.`);
    }

});


app.listen(3000)

