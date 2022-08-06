const db = require('../db');

module.exports = {

    findAll: () => {

        return new Promise((aceito, rejeitado) => {
            db.query(`
            select 
                contas.*, 
                fornecedores.nome AS fornecedorNome
            from 
                contas
            join fornecedores on fornecedores.id = contas.fornecedorId;`, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    findById: (id) => {

        return new Promise((aceito, rejeitado) => {
            db.query(`
            select 
                contas.*, 
                fornecedores.nome AS fornecedorNome
            from 
                contas
            join fornecedores on fornecedores.id = contas.fornecedorId
            where contas.id = ?
            `, [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false)
                }
            });
        });
    },


    save: (conta) => {

        const {
            descricao,
            dataCompetencia,
            dataVencimento,
            valor,
            fornecedorId
        } = conta

        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO contas (descricao, dataCompetencia, dataVencimento, valor, fornecedorId) VALUES (?, ?, ?, ?,?)',
                [descricao, dataCompetencia, dataVencimento, valor, fornecedorId],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results.insertid);
                }
            );
        });
    },

    update: (id, conta) => {
        const {
            descricao,
            dataCompetencia,
            dataVencimento,
            valor,
            dataPagamento,
            valorPago,
            fornecedorId
        } = conta

        return new Promise((aceito, rejeitado) => {
            db.query(`UPDATE contas 
                    SET descricao = ?, 
                    dataCompetencia = ?, 
                    dataVencimento = ?, 
                    valor = ?, 
                    dataPagamento = ?, 
                    valorPago = ?, 
                    fornecedorId = ? 
                WHERE id = ?`,
                [
                    descricao,
                    dataCompetencia,
                    dataVencimento,
                    valor,
                    dataPagamento,
                    valorPago,
                    fornecedorId,
                    id
                ],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    delete: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM contas WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }

};
