const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useCreateIndex: true
    })
    .then(() => {console.log(`DB connection successful`)})
    .catch((err) => {console.log(err)})

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(static_path))
app.use(bodyParser.json());

// const Register = require("./models/registers")
const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})

