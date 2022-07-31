const express = require('express');
const router = express.Router();

const ContaController = require('./controllers/ContaController');

router.get('/contas', ContaController.listar);
router.get('/contas/:id', ContaController.visualizar);
router.post('/contas', ContaController.cadastrar);
router.put('/contas/:id', ContaController.alterar);
router.delete('/contas/:id', ContaController.excluir);

module.exports = router;