const express = require('express')
const cors = require('cors');
require('dotenv').config();

const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 8080;

//antes de usar post
app.use(express.json());

//Dar acceso a la api solo a entidades conocidas
const whiteList = ['http://127.0.0.1:5501', 'http://127.0.0.1:1200', 'http://localhost:2500'];
const options = {
  origin: (origin, callback) => {
    if(!origin || whiteList.includes(origin)) {
      callback(null, true);
    }else {
      callback(new Error('CORS: Origen no permitido'));
    }
  }
}

app.use(cors(options));

app.get('/', (req, res)=> {
  res.send('Hola, este es mi primer servidor con express')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una segunda ruta');
})


routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

/*
app.get('/users', (req, res) => {
  res.json(users);
});
*/

//QUERY PARAMS
/*
app.get('/users', (req, res) => {
  const {limit, offset} = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  }else {
    res.send('No hay parametros');
  }
})
  */


app.listen(port, () => {
  console.log('El servidor está escuchando en el puerto: ', port);
})

