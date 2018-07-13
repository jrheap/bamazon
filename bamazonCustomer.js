var mysql = require('mysql');
const cTable = require('console.table');
var inquirer = require('inquirer');
var con= mysql.createConnection({
    host: "localhost",
    //   local port
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Royall14",
    database: "bamazon"
});

con.connect(function (err, res) {
    if (err) throw err;
    

});

con.query('SELECT * FROM products', function (err, res) {
    if (err) {
        console.log('error in query: ' + err.stack);
    };
    inventory = res;
    console.log('\n---------------------------------------------------------------------\n')
    console.table(inventory);
    
    runQ();
    function runQ() {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which item would you like to purchase? ',
                name: 'idBuy',
                choices: function(){
                    return inventory.map(function(item){
                        return "" + item.id + " " + item.product_name + ' ' +  "$" + item.price
                        //return item.id + '|' + item.product_name + '|' + item.department_name + '|' + item.price + '|' + item.stock_quanity; 
                    });
                    
                }
            },
            {
                type: 'input',
                message: 'How many ' + inventory.item.product_name + 's would you like to buy? ',
                name:'amountBuy',
                choices: function () {
                    return inventory.map(function(item){
                        return item.product_name
                    })
                  }
            }
        ]).then(function (choice){
            console.log("This is running", parseInt(choice.idBuy) )
            
            con.end();
        });
    };
});


