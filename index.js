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
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//Swagger
setupSwagger(app);

app.get("/", (req, res)=>{
  res.send("Hola desde el server de express");
});

//Rutas API
routerApi(app);

//middlewareas
app.use(logErrors);
app.use(errorHandler);
app.use(errorHandler);

app.listen(port, () =>{
  console.log("My port is working on: " + port);
});

//Conexion a Mongo
mongoose.connect(
    '')
    .then(() => console.log('Conexion a MongoDB exitos'))
    .catch(err => console.error('No se puede conectar a MongoDB', err))

app.listen(3000);
