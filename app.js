var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// import routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/verifyToken");
const indexRouter = require('./routes/index');
const assignmentRouter = require('./routes/assignmentRouter');
const studentRouter = require('./routes/studentRouter'); 
const Assignments = require('./models/teacherAssignment'); 
const Uploads = require('./models/studentAssignment'); 
const postinganRouter = require('./routes/postinganRouter');
const editRouter = require('./routes/editRouter');
const komentarRouter = require('./routes/komentarRouter'); 
const kelasRouter = require('./routes/kelasRouter'); 

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Berhasil terhubung ke Database")
);

app.use(express.json()); 
app.use('/', indexRouter);
app.use("/user", authRoutes);
app.use("/edit", verifyToken, editRouter);
app.use("/dashboard", verifyToken, dashboardRoutes);
app.use('/class', verifyToken, kelasRouter);
app.use('/post', verifyToken, postinganRouter);
app.use('/assignments', verifyToken, assignmentRouter);
app.use('/uploads', verifyToken, studentRouter);
app.use('/comment', verifyToken, komentarRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
