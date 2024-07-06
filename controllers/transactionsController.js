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
    //create a new transaction objedt and increment {id} and data
    const currentTransaction = {id:transactionArr.length + 1, ...req.body }
    //add the new transaction object to the transaction arr
    transactionArr.push(currentTransaction)
    //sent a response with a http code 201 and the newly added transaction
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
    // get the id param from the request url
    const {id} = req.params;
    //find the index of the transactionArr based on .id
    const transactionToUpdateIndex = transactionArr.findIndex(el => el.id === +id)
    //check if the transaction exists
    if (transactionToUpdateIndex !== -1) {
        //update the transaction object in transactionArr with data from req.body
        transactionArr[transactionToUpdateIndex] = req.body
        res.status(200).json(transactionArr[transactionToUpdateIndex])
    } else {
        res.status(404).send({error: `Transaction with ${id} not found!`})
    }

})


module.exports = router;