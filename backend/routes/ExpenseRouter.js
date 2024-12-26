const express = require('express');
const { getAllTransactions, addTransaction, deleteTransaction }= require('../controllers/ExpenseController');
const router = express.Router();

//fetch all the expenses of user based on user_id
router.get('/', getAllTransactions);
//add all the expenses of user based on user_id
router.post('/', addTransaction);
//delete all the expenses of user based on user_id
router.delete('/:expenseId', deleteTransaction);

module.exports = router;