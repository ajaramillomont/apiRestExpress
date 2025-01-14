const express = require('express')
require('dotenv').config();

const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 4000;

//antes de usar post
app.use(express.json());

app.get('/', (req, res)=> {
  res.send('Hola, este es mi primer servidor con express')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una segunda ruta');
})


routerApi(app);

app.use(logErrors);
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

