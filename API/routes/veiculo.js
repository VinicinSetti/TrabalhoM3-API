const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
// const variaveis = require('../frontEnd/script');

//Retorna todos os veiculos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM veiculo;',
            (error, resultado, field) => {
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                return res.status(200).send({response: resultado})
            }
        )
    });
});

//Insere um veiculo
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO veiculo (chassi, cor, marca, modelo, quantidade, valor) VALUES (?,?,?,?,?,?);',
            [
                req.body.chassi, req.body.cor, req.body.marca, req.body.modelo,
                req.body.quantidade, req.body.valor
            ],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: "veiculo inserido com sucesso",
                    id_veiculo: resultado.insertId
                });
            }
        )
    });
});

//Retorna os dados de um veiculo
router.get('/:id_veiculo', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM veiculo WHERE id_veiculo = ?;',
            [req.params.id_veiculo],
            (error, resultado, field) => {
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                return res.status(200).send({response: resultado})
            }
        )
    });
});

// Altera um veiculo
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE veiculo
                SET chassi = ?,
                cor = ?,
                marca = ?,
                modelo = ?,
                quantidade = ?,
                valor = ?
                WHERE id_veiculo = ?;`,
            [
                req.body.chassi, req.body.cor, req.body.marca, req.body.modelo, req.body.quantidade,
                req.body.valor, req.body.id_veiculo
            ],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: "veiculo alterado",
                    id_veiculo: resultado.insertId
                });
            }
        )
    });
});


// Deleta um veiculo
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM veiculo WHERE id_veiculo = ?',
            [req.body.id_veiculo],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: "veiculo removido com sucesso",
                });
            }
        )
    });
});

module.exports = router;