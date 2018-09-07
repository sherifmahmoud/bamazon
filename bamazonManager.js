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
//prepare menu choices to use with inquirer
var choices = [
    { name: 'View Products for Sale', value: 'viewProducts' },
    { name: 'View Low Inventory', value: 'lowInventory' },
    { name: 'Add to Inventory', value: 'addInventory' },
    { name: 'Add New Product', value: 'addProduct' }
];
//get the user choice
inquirer
    .prompt([{
        type: 'list',
        name: 'choice',
        message: 'What  would you like to do? ',
        choices: choices
    }
    ])
    .then(function (answer) {
        switch (answer.choice) {
            case 'viewProducts':
                viewProducts();
                break;
            case 'lowInventory':
                viewLowInventory();
                break;
            case 'addInventory':
                addToInventory();
                break;
            case 'addProduct':
                addNewProduct();
                break;
        }
    });

function viewProducts() {
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        var data = [];
        displayItems(results, fields);
        connection.end();
    });
}

function displayItems(results, fields) {
    var data = [];//all the data that we'll send to table pakage to display including cell headers
    //prepare an array of cell headers
    var header = [];
    for (var field of fields) {
        header.push(field.name);

    }
    //push the header to data array
    data.push(header);
    //for each row compose an array then push it to data
    for (var row of results) {
        var dataRow = [];
        for (var i = 0; i < header.length; i++) {
            if (header[i] == 'price') {//add the '$' before the price
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
function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity<5', function (error, results, fields) {
        if (error) throw error;
        var data = [];
        displayItems(results, fields);
        connection.end();
    });
}

function addToInventory() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'item_id',
            message: 'Please enter the id of the item you wish to add to its inventory:'
        },
        {
            type: 'input',
            name: 'qty',
            message: 'Please enter the quantity to add to the inventory:'
        }
        ])
        .then(function (answers) {
            var item;
            var query = connection.query(
                "SELECT * FROM products WHERE ?",
                [
                    { item_id: answers['item_id'] }
                ],
                function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        updateInventory(answers.item_id, res[0].stock_quantity + parseInt(answers.qty));
                    }
                    connection.end();
                });
        });
}

function updateInventory(item_id, qty) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            { stock_quantity: qty },
            { item_id: item_id }
        ],
        function (err, res) {
            if (err) {
                throw err;
            } else {
                console.log('Updated successfully!!!');
            }
        });
}

function addNewProduct() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'prod_name',
            message: 'Product name:'
        },
        {
            type: 'input',
            name: 'dept_name',
            message: 'Department name:'
        },
        {
            type: 'input',
            name: 'price',
            message: 'Price:'
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'Stock Quantity:'
        }
        ])
        .then(function (answers) {
            var item;
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answers['prod_name'],
                    department_name: answers['dept_name'],
                    price: answers['price'],
                    stock_quantity: answers['stock_quantity']
                },
                function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('New Product added successfully!!');
                    }
                    connection.end();
                });
        });
}