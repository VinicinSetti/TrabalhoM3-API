const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
// const variaveis = require('../frontEnd/script');

//Retorna todos os funcionarios
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM funcionario;',
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

//Insere um funcionario
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO funcionario (nome, cpf, email, cargo, comissao, id_estatus, logradouro, numero, bairro, cidade, estado, pais, telefone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);',
            [
                req.body.nome, req.body.cpf, req.body.email, req.body.cargo,
                req.body.comissao, req.body.id_estatus, req.body.logradouro, req.body.numero,
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
                    mensagem: "funcionario inserido com sucesso",
                    id_funcionario: resultado.insertId
                });
            }
        )
    });
});

//Retorna os dados de um funcionario
router.get('/:id_funcionario', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM funcionario WHERE id_funcionario = ?;',
            [req.params.id_funcionario],
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

// Altera um funcionario
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE funcionario
                SET nome = ?,
                    cpf = ?,
                    email = ?,
                    cargo = ?,
                    comissao = ?,
                    id_estatus = ?,
                    logradouro = ?,
                    numero = ?,
                    bairro = ?,
                    cidade = ?,
                    estado = ?,
                    pais = ?,
                    telefone = ?
                WHERE id_funcionario = ?;`,
            [
                req.body.nome, req.body.cpf, req.body.email, req.body.cargo, req.body.comissao,
                req.body.id_estatus, req.body.logradouro, req.body.numero,
                req.body.bairro, req.body.cidade, req.body.estado,
                req.body.pais, req.body.telefone, req.body.id_funcionario
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
                    mensagem: "funcionario alterado",
                    id_funcionario: resultado.insertId
                });
            }
        )
    });
});


// Deleta um funcionario
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM funcionario WHERE id_funcionario = ?',
            [req.body.id_funcionario],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: "Funcionario removido com sucesso",
                });
            }
        )
    });
});

module.exports = router;