const express = require('express')
const bookController = require('../controllers/bookController')

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:bNo', bookController.getOneBook);
router.post('/', bookController.addBook)
router.put('/:bNo', bookController.editBook)

module.exports = router;