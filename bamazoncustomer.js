var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var productsArray = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB",
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
});

showItems();

function showItems() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) {
      console.log(err);
      return;
    }
    productsArray = results;
    console.log(results);
    var table = results;
    console.log("");
    console.table(table);
    purchaseItem();
  });
}

function purchaseItem() {
  inquirer
    .prompt([
      {
        name: "id",
        message:
          "What do you want to bbbuy? Please enter the ID of the product you want.",
      },
      {
        name: "quantity",
        message: "How many would you like to burchase?",
      },
    ])
    .then(function(answer) {
      var userSelect = answer.id;
      for (var i = 0; i < productsArray.length; i++) {
        if (productsArray[i].ID == userSelect) {
          console.log(productsArray[i]);
          if (productsArray[i].stock_quantity < answer.quantity) {
            console.log("Insufficient quantity!");
            connection.end();
            return;
          } else {
            fulfillOrder();
          }
        }
      }
    });
}

function fulfillOrder() {
  console.log("Good job getting this far!");
}
connection.end();
