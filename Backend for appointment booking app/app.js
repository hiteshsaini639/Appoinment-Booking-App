const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const appointmentRoutes = require("./routes/appointment");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(appointmentRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Table Created");
    app.listen(4000);
  })
  .catch((err) => console.log(err));
