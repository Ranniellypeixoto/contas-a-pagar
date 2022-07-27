const express = require('express');
const router = express.Router();

const ContaController = require('./controllers/ContaController');

router.get('/contas', ContaController.buscarTodos);
router.get('/conta/:id', ContaController.buscarUm);
router.post('/conta', ContaController.inserir);
router.put('/conta/:id', ContaController.alterar);
router.delete('/conta/:id', ContaController.excluir);

module.exports = router;