var mysql = require('mysql');
var cTable = require('console.table');
var inquirer = require('inquirer');
var con = mysql.createConnection({
    host: "localhost",
    //   local port
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Royall14",
    
    database: "bamazon"
});
// this is connecting to the server
con.connect(function (err, res) {
    if (err) throw err;
    

});
// This section of code runs the data from the DB 
con.query('SELECT * FROM products', function (err, res) {
    if (err) {
        // what should it console.log if it throws an error
        console.log('error in query: ' + err.stack);
    };
    // this stores ALL the response from the database into the inventory valarible 
    var inventory = res;
    // This is creating new lines seperated by ----------------------
    console.log('\n---------------------------------------------------------------------\n')
    console.table(inventory);
    // console.log(inventory);
    
    runQ();
    function runQ() {
        // The start of the Inquirer NPM
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which item would you like to purchase? ',
                name: 'idBuy',
                // the function lets you choose what item to buy
                choices: function(){
                    return inventory.map(function(item){
                        return "" + item.id + " " + item.product_name + ' at ' +  "$" + item.price + ' dollars'
                        //return item.id + '|' + item.product_name + '|' + item.department_name + '|' + item.price + '|' + item.stock_quanity; 
                    });                    
                }
            }
        ]).then(function (item){
            var itemId = parseInt(item.idBuy.slice(0, 1))
            // console.log(itemId, 'this is item id');
            // console.log(item);
             inquirer.prompt([{
                     type: 'input',
                     message: 'How many ' + item.idBuy + 's would you like to buy? There is ' + getChosenItemQty(item) + ' in stock',
                     name: 'amountBuy'
                 }]).then(function (amount) {
                     console.log('\n__________________________________________________________')
                    // console.log(amount.amountBuy);
                    //if the ammount the user chose is less then the amount we have in stock
                    // console.log(inventory[itemId -1].stock_quanity);
                    if (parseInt(amount.amountBuy) > inventory[itemId-1].stock_quanity) {
                        //show nice msg saying we do not have enough of that item
                        console.log("We apologize for the inconvience but we dont have enough stock to fulfil your order");
                        console.log('\n___________________________________________________')
                        runAgain()
                        function runAgain(){
                        inquirer.prompt([{
                            type: 'confirm',
                            message: 'We only have have ' + inventory[itemId-1].stock_quanity + ' in stock. Would you like to change your order?',
                            name: 'answer',
                        }]).then(function(guess){
                            console.log(guess)
                            if (guess.answer === true){
                                runQ();
                            }else if (guess.answer === false){
                                console.log('We hope to see you again soon')
                                
                            }})}con.end()}
                    else{
                        //subtract the stock wantity from the amount they wanted to buy
                        var newStockQty = (inventory[itemId - 1].stock_quanity - (parseInt(amount.amountBuy)));
                        //we then need to go update our database to reflect that change
                        console.log('There are now ' + newStockQty + ' available in stock. ');
                        //else process the transaction
                        con.query('UPDATE products SET stock_quanity = ? WHERE id = ?', [newStockQty, itemId], function (err, updatedData) {
                         var total = (inventory[itemId - 1].price * (parseInt(amount.amountBuy)));
                        
                         console.log('Your total cost comes to ' + total + ' dollars!');
                    

                            con.end();
                        })

                    }
             })
             console.log(inventory[itemId - 1].price )

            //get the chosen item that the user selected
            function getChosenItemQty(item){
                //get the item id out of the string
                var stock_quanity = 0;
                var id = parseInt(item.idBuy.slice(0, 1))
                for(var i = 0; i < inventory.length; i++){
                    //get the items object
                    if(inventory[i].id == id){
                        stock_quanity = inventory[i].stock_quanity;
                    }
                }
                return stock_quanity;
            }
        });
    };
});
