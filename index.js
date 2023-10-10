const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);
const { flash } = require('express-flash-message');
var csrf = require('csurf')

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const createRoutes = require("./routes/create");
const searchRoutes = require("./routes/search");
const profileRoutes = require("./routes/profile");

const req = require("express/lib/request");
const MONGODB_URI =  process.env.DATABASE || "mongodb://localhost:27017/college";


const store = new MongoDBStore({uri: MONGODB_URI, collection: 'sessions'})

let csrfProtection = csrf();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));

//middleware for flash messages
app.use(flash({sessionKeyName: 'flashMessage'}));
app.use(csrfProtection);

app.use((req,res,next)=>{
    res.locals.isLoggedIn = req.session.isLoggedIn;
    if(req.session.user){
        res.locals.username =req.session.user.username;
        res.locals.admin=req.session.user.admin;
    }
    else{
        res.locals.username =null;
        res.locals.admin=null;
    }
    res.locals.csrfToken=req.csrfToken();
    next();
})

app.use(authRoutes);
app.use(createRoutes);
app.use(postRoutes);
app.use(searchRoutes);
app.use(profileRoutes);
app.get("/", (req, res) => { // const isLoggedIn = req.get('Cookie').split(";")[1].trim().split("=")[1] == 'True';
    res.render("home.ejs");
});

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, function(){
    console.log('Server running on port '+ port);
});


mongoose.connect(MONGODB_URI, () => {
    console.log("connected to database");
})
