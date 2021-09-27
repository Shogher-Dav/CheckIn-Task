const express = require('express');
const connectionDB = require('./config/db')
const dotenv = require('dotenv');
const cors = require('cors');


const app = express();

//load env variables
dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10) || 9100;

//connect to db
connectionDB();

// body parser
app.use(express.json());

//Enable cors 
app.use(cors());

// Routes 
app.use('/api', require('./routes/check-in'))


//Set app port from PORT variable
app.listen(PORT, () => {
    console.log(`Listen port ${PORT}`);
})