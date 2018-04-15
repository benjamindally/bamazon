var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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

managerFunction();

function managerFunction() {
  console.log("");
  inquirer
    .prompt([
      {
        type: "list",
        name: "functions",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
        ],
      },
    ])
    .then(function(answer) {
      if (answer.functions === "View Products for Sale") {
        viewProducts();
      } else if (answer.functions === "View Low Inventory") {
        lowInventory();
      } else if (answer.functions === "Add to Inventory") {
        addInventory();
      } else {
        addNew();
      }
    });
}

function viewProducts() {
  console.log("View yo shit");
  connection.end();
}
function lowInventory() {
  console.log("View yo low shit");
  connection.end();
}
function addInventory() {
  console.log("Add yo shit");
  connection.end();
}
function addNew() {
  console.log("New shit");
  connection.end();
}
