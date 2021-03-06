let express = require('express');
let cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let logger = require('morgan');
let cors = require('cors')
let mongoose = require('mongoose');
let passport = require('passport');


let indexRouter = require('./routes/index');
let shopRouter = require('./routes/shop');
let discussion = require('./routes/discussion');

let app = express();

mongoose.connect("mongodb+srv://root:root@cluster0-eamcp.mongodb.net/pets?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');
app.use( bodyParser.urlencoded({ extended : false }) );


const secureRoute = require('./routes/secureRoutes');

app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);
app.use('/shop', shopRouter);
app.use('/discuss', discussion);

module.exports = app;
