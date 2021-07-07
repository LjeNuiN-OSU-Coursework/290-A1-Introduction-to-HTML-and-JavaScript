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
    res.send('You place an order to buy '+ stock_amount +' of '
    + stock_name +'.' + ' The price of one stock is ' +
    stock_price + ' and the total price for this order is '+
    total_cost)
});

app.get('/stock_lookup', (req, res) => {
    console.log(req.query);
})


// End added code
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});