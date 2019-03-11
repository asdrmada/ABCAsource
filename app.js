// NPM Packages and set up
const express   = require("express"),
  app           = express(),
  bodyParser    = require("body-parser"),
  mongoose      = require("mongoose"),
  passport      = require("passport"),
  flash         = require('connect-flash'),
  methodOveride = require('method-override'),
  bcrypt        = require("bcrypt-nodejs"),
  faker         = require("faker"),
  session       = require('express-session'),
  seedDB        = require("./seeds"),
  Blog          = require("./models/blog"),
  Comment       = require("./models/comments");

  require('./config/passport')(passport);

const blogRoutes = require("./routes/blogs"),
      commentRoutes = require("./routes/comments"),
      authRoutes = require("./routes/auth");

console.log(process.env.DATABASEURL);

//Mongoose/Mongo set-up
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected!!'))
  .catch(err => console.log(err));
// mongoose.connect("mongodb+srv:asdrmada:hqZien1tEGh6gxVV@cluster0-r9fic.gcp.mongodb.net/alexs_jojo_blog?retryWrites=true;", { useNewUrlParser: true });
// 'mongodb://localhost:27017/alexs_jojo_blog'

mongoose.set('useCreateIndex', true);

//app set-up 
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(methodOveride('_method'));
app.set("view engine", "ejs");


// Express session
app.use(session({
  cookie:{
    secure: true,
    maxAge:60000
       },
  secret: 'dio_brando',
  resave: true,
  saveUninitalised: true
}));
// Passport/Authorization set up
app.use(passport.initialize());
app.use(passport.session());

// faker/DB seed
// seedDB();

// Flash config
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;

  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.error       = req.flash('error');
  res.locals.success     = req.flash('success');
  next();
});

// Routing set up
app.use("/", blogRoutes);
app.use("/blog/:id/comments", commentRoutes);
app.use("/", authRoutes);


app.listen(process.env.PORT || 3001, process.env.IP, () => {
  console.log("The server.....it's alive!!!");
});