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

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    
    // Find the index of the transaction to delete
    const transactionIndex = transactionArr.findIndex(item => item.id === +id);

    if (transactionIndex !== -1) {
        // Remove the transaction from the array
        transactionArr.splice(transactionIndex, 1);
        res.redirect("/transactions"); // Redirect to the transactions list page
    } else {
        res.status(404).json({ error: `Transaction with id: ${id} not found` });
    }
});


//Update Transaction by ID

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const transactionToUpdateIndex = transactionArr.findIndex(el => el.id === +id)

    if (transactionToUpdateIndex !== -1) {
        transactionArr[transactionToUpdateIndex] = req.body
        res.status(200).json(transactionArr[transactionToUpdateIndex])
    } else {
        res.status(404).send({error: `Transaction with ${id} not found!`})
    }

})


module.exports = router;