const express = require("express");
const hbs = require("hbs");

const app = express();

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

app.use(express.static('public')); //config. directory for static files

hbs.registerPartials(__dirname + "/views/partials"); //config. for partials



//Route for home
app.get("/", (req, res, next) => {
    console.log("we received a request for the HOME page");
    // res.send(`message`);
    // res.sendFile(__dirname + "/views/home.html");
    res.render("home");
});



//Route for contact page
app.get("/contact", (req, res, next) => {
    console.log("we received a request for the CONTACT page")
    // res.sendFile(__dirname + "/views/contact.html");
    res.render("contact");
});



//Margarita
app.get("/pizzas/margarita", (req, res, next) => {

    const data = {
        title: "Pizza Margarita",
        price: 12,
        imageFile: "pizza-margarita.jpg",
        ingredients: ["mozzarella", "tomato sauce", "basilicum"]
    }

    res.render("product", data)
});



//Veggie
app.get("/pizzas/veggie", (req, res, next) => {
    const data = {
        title: "Veggie Pizza",
        price: 15,
        imageFile: "pizza-veggie.jpg"
    }

    res.render("product", data)
});

//Seafood
app.get("/pizzas/seafood", (req, res, next) => {
    const data = {
        title: "Seafood Pizza",
        imageFile: "pizza-seafood.jpg"
    }

    res.render("product", data)
});



app.listen(3000)

