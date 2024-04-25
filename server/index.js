const express = require("express");
var createError = require('http-errors');
require('dotenv').config()
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8080;

var usersRouter = require('./routes/index');
var jobsRouter = require('./routes/jobs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/users', usersRouter);
app.use('/api/jobs', jobsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

