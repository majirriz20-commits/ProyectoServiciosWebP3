const express = require("express");
const mongoose = require('mongoose');
const routerApi = require('./routers/rutas');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//middlewareas
const {logErrors, errorHandler} = require('./middlewareas/errorHandler');
//Swagger
const setupSwagger = require("./swagger");
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

setupSwagger(app);


app.get("/", (req, res)=>{
  res.send("Hola desde el server de express");
});

//Rutas API
routerApi(app);

//middlewareas
app.use(logErrors);
app.use(errorHandler);


app.listen(port, () =>{
  console.log("My port is working on: " + port);
});

//Conexion a Mongo
mongoose.connect(
    'mongodb+srv://majirriz20_db_user:l4C8zaHiThycXUxl@closter311.fyaiacn.mongodb.net/?retryWrites=true&w=majority&appName=closter311')
    .then(() => console.log('Conexion a MongoDB exitos'))
    .catch(err => console.error('No se puede conectar a MongoDB', err))




