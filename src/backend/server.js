const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// configures env vars in .env files
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware - allows us to parse json
// server receives and sends JSON
app.use(cors());
app.use(express.json());

//received from mongodb atlas dashboard
const uri = process.env.URI;

//mongoose starts the connection
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Adds routes for express to use
//Example route: http://localhost:5000/example/get
const exampleRouter = require('./routes/example');
app.use('/example', exampleRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});