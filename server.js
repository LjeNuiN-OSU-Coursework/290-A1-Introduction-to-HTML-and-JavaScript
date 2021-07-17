'use strict';

// NOTE: Don't change the port number
const PORT = 3000;

// The variable stocks has the same value as the variable stocks in the file `stocks.js`
const stocks = require('./stocks.js').stocks;

const express = require("express");
const app = express();

app.use(express.static('public'));


app.use(express.urlencoded({
    extended: true
}));

// Add your code here
app.get('/stock_order', (req, res) => {
    console.log(req.query);
    let stock_name;
    let stock_price;
    let stock_amount;
    let total_cost;


    for(const stock of stocks){
        if(stock.symbol === req.query.stock_symbol){
            stock_name = stock.company
            stock_price = stock.price
            stock_amount = req.query.quantity
            total_cost = stock_price * stock_amount

        };

    };
    res.send('You placed an order to buy '+ stock_amount +' stock of '
    + stock_name +'.' + ' The price of one stock is ' +'$' +
    stock_price + ' and the total price for this order is '+'$'+
    total_cost)
});

// Function to search for the highest or lowest stock from stocks.js
function findStockByPrice(highOrLow){
    let selectedChoice = undefined
    for (const stock of stocks){
        if (selectedChoice === undefined){
            selectedChoice = stock;
        
    }else if(highOrLow === 'high'){
        if(stock.price > selectedChoice.price){
            selectedChoice = stock
        }
        // updates lower priced stock instead
    } else{
        if (stock.price < selectedChoice.price){
            selectedChoice = stock
        }
    }
}
    return selectedChoice;
}
app.post('/stock_lookup', (req, res) => {
    const choice = req.body.highOrLow
    const stock = findStockByPrice(choice)
    //prints user selection to console
    console.log(req.body);
    //removed code that also works
    //res.send(`${JSON.stringify(findStockByPrice(choice))}`)
    res.send(stock)
})
// End added code

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});