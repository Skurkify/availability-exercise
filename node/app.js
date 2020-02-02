const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const initializeAvailability = require('./routes/availability').initializeAvailability;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/today", (req, res) => {
    res.send({
        today: today()
    });
});

initializeAvailability(app);


function today() {
    return new Date().toLocaleDateString();
}

app.today = today;
module.exports = app;