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
    //get the user input
    // inquirer
    //     .prompt([{ type: 'input', name: 'item_id', message: 'ID of the product you would like to buy: ' },
    //     { type: 'input', name: 'quantity', message: 'how many units would you like to buy: ' }
    //     ])
    //     .then(function (answers) {
    //         var item_id = parseInt(answers.item_id);
    //         var quantity = parseInt(answers.quantity);
    //         purchaseItem(item_id, quantity);
    //         // connection.end();
    //     });
});
connection.end();


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
            dataRow.push(row[header[i]]);
        }
        data.push(dataRow);
    }

    var output = table(data);
    console.log(output);
}

// function purchaseItem(item_id, quantity){
//     var query = connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [
//           {
//             quantity: 100
//           },
//           {
//             flavor: "Rocky Road"
//           }
//         ],
//         function(err, res) {
//           console.log(res.affectedRows + " products updated!\n");
//           // Call deleteProduct AFTER the UPDATE completes
//           deleteProduct();
//         }
//       );
// }