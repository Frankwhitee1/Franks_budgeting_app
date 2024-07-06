// import the express framework
const express = require("express");

// initialize express router
const router = express.Router();

//import the transaction array from whatever location
const transactionArr = require("../models/transaction");


//get All transactions
router.get("/", (req, res) => {
    res.status(200).send(transactionArr)
});


//get a single Transction
router.get("/:id", (req, res) => {
    // get the id param from the URL
    const {id} = req.params;

    //find the transaction based on the "id"
    const transaction = transactionArr.find(el => el.id === +id)

    //check if the transaction exist
    if (transaction) {
        
        // if found send a http status code 200 (ok) and the transaction obj
        res.status(200).send(transaction)
    } else {

        // if not found send a http code (400) (bad request) with and error message
        res.status(400).json({error: `Transaction with id ${id} Does not exist try again lol ;-) `})
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
    // get the id param from the URL 
    const { id } = req.params;
    
    // Find the index of the transaction to delete
    const transactionIndex = transactionArr.findIndex(item => item.id === +id);

    // Check if the transaction with the given 'id' exists
    if (transactionIndex !== -1) {
        
        // Remove the transaction from the array
        transactionArr.splice(transactionIndex, 1);
       
        // Redirect to the transactions list page
        res.redirect("/transactions"); 
    } else {
       
        //if the transction isnt found send a http status code 404 (not found)
        res.status(404).json({ error: `Transaction with id: ${id} Does not exist try again lol ;-)` });
    }
});


//Update Transaction by ID

router.put("/:id", (req, res) => {
    // get the id param from the request url
    const {id} = req.params;
   
    //find the index of the transactionArr based on .id
    const transactionToUpdateIndex = transactionArr.findIndex(el => el.id === +id)
    
    //check if the transaction exists with "id"
    if (transactionToUpdateIndex !== -1) {
        
        //update the transaction object in transactionArr with data from req.body
        transactionArr[transactionToUpdateIndex] = req.body
        
        //send a response with http code 200 (ok) and update the transction
        res.status(200).json(transactionArr[transactionToUpdateIndex])
    } else {
        
        //if the transction isnt found send a http status code 404 (not found)
        res.status(404).send({error: `Transaction with ${id} Does not exist try again lol ;-)`})
    }

})


module.exports = router;