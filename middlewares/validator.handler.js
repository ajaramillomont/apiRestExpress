const boom = require('@hapi/boom');
function validatorHandler(schema, property) {
  return (req, res, next) => {
    //capturamos dinamicamente lo que lo que se envia en la petición: Puede ser params, body, query
    const data = req[property];
    //desestructuramos para obtener error
    const { error } = schema.validate(data);
    if(error) {
      //utilizamos bad request para saber si la información que nos envia es correcta
      //para que los middleware de tipo error lo procesen lo decimos con next y le envíamos el error
      next(boom.badRequest(error));
    }
    next();
  }
};

module.exports = validatorHandler;
