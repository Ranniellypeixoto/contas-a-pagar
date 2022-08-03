const db = require('../db');

module.exports = {

    findAll: () => {

        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM fornecedores', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    findById: (id) => {

        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM fornecedores WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false)
                }
            });
        });
    },


    save: (fornecedores) => {

        const {
           nome,
           cnpj_cpf,
           situacao
        } = fornecedores

        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO fornecedores (nome, cnpj_cpf, situacao) VALUES (?, ?, ?)',
                [nome, cnpj_cpf, situacao],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results.insertid);
                }
            );
        });
    },

    change: (id, nome, cnpj_cpf, situacao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE fornecedores SET nome = ?, cnpj_cpf = ?, situacao = ? WHERE id = ?',
                [ nome, cnpj_cpf, situacao, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    delete: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM fornecedores WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }

};

