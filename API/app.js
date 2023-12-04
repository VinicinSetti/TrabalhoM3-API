const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaCliente = require('./routes/cliente');
const rotaVeiculo = require('./routes/veiculo');
const rotaFuncionario = require('./routes/funcionarios');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false})); // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).send({});
    }

    next();
});

app.use('/cliente', rotaCliente);
app.use('/veiculo', rotaVeiculo);
app.use('/funcionario', rotaFuncionario)

// Quando não encontra rota, entra aqui
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensage: error.message
        }
    });
})

module.exports = app;