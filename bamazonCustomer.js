var mysql = require('mysql');
const { table } = require('table');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect();

connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    var data = [];
    displayItems(results, fields);
    executeUserChoice(results);

});


function displayItems(results, fields) {
    var data = [];//all the data that we'll send to table pakage to display including cell headers
    //prepare an array of cell headers
    var header = [];
    for (var field of fields) {
        if (field.name != 'stock_quantity') {
            header.push(field.name);
        }

    }
    //push the header to data array
    data.push(header);
    //for each row compose an array then push it to data
    for (var row of results) {
        var dataRow = [];
        for (var i = 0; i < header.length; i++) {
            if (header[i] == 'price') {
                dataRow.push('$' + row[header[i]]);
            } else {
                dataRow.push(row[header[i]]);
            }

        }
        data.push(dataRow);
    }

    var output = table(data);
    console.log(output);
}

function executeUserChoice(results) {
    //prepare the list of product choices to have the user choose from using inquirer
    var choices = [];
    for (var row of results) {
        var choice = {
            name: row['product_name'],
            value: row //include the whole product record as the value of the choice to use later on
        }
        choices.push(choice);
    }
    //get the user input
    inquirer
        .prompt([{
            type: 'list',
            name: 'item',
            message: 'What  product you would like to buy? ',
            choices: choices
        },
        { type: 'input', name: 'quantity', message: 'how many units would you like to buy: ' }
        ])
        .then(function (answers) {
            var item = answers.item;
            var quantity = parseInt(answers.quantity);

            if (item['stock_quantity'] > quantity) {
                //if there's enough stock then execute the order
                purchaseItem(item, quantity);
            } else {
                console.log("Sorry!! We don't have enough stock to fulfill your order!!");
            }
            //whether the order executed or not, close the connection to exit the program gracefully!!
            connection.end();
        });
}

function purchaseItem(item, quantity) {

    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: item['stock_quantity'] - quantity
            },
            {
                item_id: item['item_id']
            }
        ],
        function (err, res) {
            if (err) {
                throw err;
            } else {
                //if the update is successful, congratulate the userand show them the total cost
                console.log(`Congratulations!! Your Order went through. Your Total cost is $${quantity * item['price']}`);
            }
        }
    );
}