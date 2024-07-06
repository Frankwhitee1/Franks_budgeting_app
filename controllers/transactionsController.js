const express = require("express");
const router = express.Router();
const transactionArr = require("../models/transaction");


//get All transactions
router.get("/", (req, res) => {
    res.status(200).send(transactionArr)
});


//get a single Transction
router.get("/:id", (req, res) => {
    const {id} = req.params;
    const transaction = transactionArr.find(el => el.id === +id)
    if (transaction) {
        res.status(200).send(transaction)
    } else {
        res.status(400).json({error: `Transaction with id ${id} not Found`})
    }
})

// create new transaction

router.post('/', (req, res) => {
    const currentTransaction = {id:transactionArr.length + 1, ...req.body }
    transactionArr.push(currentTransaction)
    
    res.status(201).send(transactionArr[transactionArr.length-1])
})

// delete tranzaction by specified ID


module.exports = router;