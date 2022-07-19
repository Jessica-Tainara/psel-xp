module.exports = (err, _req, res, _next) =>{
  console.log(err.message)
  res.status(err.status || 500).json(
    { message: err.status? err.message : 'Erro inesperado. Por favor, tente mais tarde' },
)};