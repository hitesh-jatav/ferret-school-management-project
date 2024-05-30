require('dotenv').config()
require('./configs/db.config');

const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan')


app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', require('./routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
