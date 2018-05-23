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

//connect to the database
connection.connect(function(err) {
  if (err) throw err;
});

//run the manager function
managerFunction();

function managerFunction() {
  console.log("");
  //use inquirer to get info from the user
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
    //depending on what is selected, trigger the appropriate function
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
  //show all the items in the database
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) {
      console.log(err);
      return;
    }
    var table = results;
    console.log("");
    //use the cTable package to improve the diplay of the table
    console.table(table);
  });
  connection.end();
}
function lowInventory() {
  //only show inventory that is lower than 5 items
  connection.query("SELECT * FROM products WHERE stock_quantity<5", function(
    err,
    results
  ) {
    if (err) {
      console.log(err);
      return;
    }
    var table = results;
    //use cTable
    console.table(results);
  });
  connection.end();
}
function addInventory() {
  //show all the items in the database
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) {
      console.log(err);
      return;
    }
    //place the items in an array
    var productsArray = [];
    for (var i = 0; i < results.length; i++) {
      productsArray.push(results[i].product_name);
    }

    //ask the user to select which product they wnat to update
    inquirer
      .prompt([
        {
          type: "list",
          name: "inventory_update",
          message: "Select a product to update.",
          choices: productsArray,
        },
      ])
      .then(function(answer) {
        //store the items that the user wants updated into a variable
        var whatUpdated = answer.inventory_update;
        //find the item they want in the database
        for (var i = 0; i < results.length; i++) {
          if (whatUpdated === results[i].product_name) {
            var currentInventory = results[i].stock_quantity;
            //set the item's id as a variable
            var id = results[i].ID;
          }
        }
        inquirer
          .prompt([
            {
              //find out how many the user wants to add to the inventory
              name: "addInventory",
              message:
                "There are currently " +
                currentInventory +
                " " +
                whatUpdated +
                ". How many would you like to add?",
            },
          ])
          .then(function(answer2) {
            //set the ammount they want added as a variable
            var addHowMuch =
              parseInt(answer2.addInventory) + parseInt(currentInventory);
            //update the database where the id's match to reflect the new inventory amount
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [{ stock_quantity: addHowMuch }, { ID: id }],
              function(err, results) {
                if (err) {
                  console.log(err);
                  return;
                }
              }
            );
            console.log("Your inventory has been updated.");
            connection.end();
          });
      });
  });
}

//this function will add a new item to the database
function addNew() {
  //this will get the name of the product they want to add
  inquirer
    .prompt([
      {
        name: "new_item",
        message: "What is the name of the product you would like to add?",
      },
      {
        //this will find out what department they want the product to go into
        name: "new_item_department",
        type: "list",
        message: "What department will this product be in?",
        choices: [
          "Sports and Recreation",
          "Food and Beverage",
          "Movies",
          "Health",
          "Outdoors",
          "Clothing",
        ],
      },
      {
        //this will find out how much the user wants to charge
        name: "new_item_price",
        message: "What is the price of the new item?",
      },
      {
        //this will find out how many they want to add
        name: "new_item_quantity",
        message: "What is the quantity of stock available?",
      },
    ])
    .then(function(answer) {
      //this will put the information from the user input into the database
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.new_item,
          department_name: answer.new_item_department,
          price: answer.new_item_price,
          stock_quantity: answer.new_item_quantity,
        },
        function(err) {
          if (err) throw err;
          console.log("Your item was added.");
        }
      );
      connection.end();
    });
}
