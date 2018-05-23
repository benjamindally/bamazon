var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var productsArray = [];
var userProduct;
var quantityDesired = 0;

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
});

//this triggers the showItems functions
showItems();

//
function showItems() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) {
      console.log(err);
      return;
    }
    productsArray = results;
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
          userProduct = productsArray[i];
          if (productsArray[i].stock_quantity < answer.quantity) {
            console.log(
              "Insufficient quantity! Please contact customer service."
            );
            connection.end();
            return;
          } else {
            quantityDesired = answer.quantity;
            fulfillOrder();
          }
        }
      }
    });
}

function fulfillOrder() {
  var quantityLeft = userProduct.stock_quantity - quantityDesired;
  var userTotal = userProduct.price * quantityDesired;
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [{ stock_quantity: quantityLeft }, { ID: userProduct.ID }],
    function(err, results) {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  console.log(
    "Thank you for your purchase of " +
      userProduct.product_name +
      ". \nYour total is $" +
      userTotal +
      ". https://paypal.com"
  );
  connection.end();
  //console.log("Good job getting this far! Quantity: " + quantityDesired);
}
