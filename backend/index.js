const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
 
require('dotenv').config();

require('./Models/db'); 

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(bodyParse.json());
app.use(cors());

app.use('/auth', AuthRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

