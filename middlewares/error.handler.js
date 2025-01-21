const { ValidationError } = require("sequelize");

function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler');

  res.status(500).json(
    {
      message: err.message,
      stack: err.stack
    });
}
//Esto produce el siguiente error: Cannot set headers after they are sent to the client
function boomErrorHandler(err, req, res, next ) {
  if(err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }else {
    next(err);
  }
}

//creamos otro middleware para capturar errores que vienen desde el ORM

function ormErrorHandler (err, req, res, next) {
  if(err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
