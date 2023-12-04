const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
// const variaveis = require('../frontEnd/script');

//Retorna todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM cliente;',
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

//Insere um produto
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO cliente (nome, cpf_cnpj, email, id_estatus, logradouro, numero, bairro, cidade, estado, pais, telefone) VALUES (?,?,?,?,?,?,?,?,?,?,?);',
            [
                req.body.nome, req.body.cpf_cnpj, req.body.email,
                req.body.id_estatus, req.body.logradouro, req.body.numero,
                req.body.bairro, req.body.cidade, req.body.estado,
                req.body.pais, req.body.telefone
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
                    mensagem: "Produto inserido com sucesso",
                    id_produto: resultado.insertId
                });
            }
        )
    });
});

//Retorna os dados de um produto
router.get('/:id_cliente', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM cliente WHERE id_cliente = ?;',
            [req.params.id_cliente],
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

// Altera um produto
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE cliente
                SET nome = ?,
                    cpf_cnpj = ?,
                    email = ?,
                    id_estatus = ?,
                    logradouro = ?,
                    numero = ?,
                    bairro = ?,
                    cidade = ?,
                    estado = ?,
                    pais = ?,
                    telefone = ?
                WHERE id_cliente = ?;`,
            [
                req.body.nome, req.body.cpf_cnpj, req.body.email,
                req.body.id_estatus, req.body.logradouro, req.body.numero,
                req.body.bairro, req.body.cidade, req.body.estado,
                req.body.pais, req.body.telefone, req.body.id_cliente
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
                    mensagem: "Cliente alterado",
                    id_cliente: resultado.insertId
                });
            }
        )
    });
});


// Deleta um produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM cliente WHERE id_cliente = ?',
            [req.body.id_cliente],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: "Cliente removido com sucesso",
                });
            }
        )
    });
});

module.exports = router;