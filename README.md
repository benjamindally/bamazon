# bamazon

Welcome to bamazon, the CLI App for interacting with databases.

For a quick tutorial, check out the video on how to use the app here: https://youtu.be/coc_LMBTago

Features Overview:
There are two entry points into the app: bamazoncustomer.js and bamazonmanager.js. Both of the entry points utilize the Command Line Interface (CLI) and rely on node.js to run.

Part I: bamazoncustomer.js
Use bamazoncusotmer.js to quickly view all relevant information stored in the bamazon database. After entering 'node bamazoncustomer.js' into the CLI, a table is displayed with the ID, product name, department name, price, and quantity of each item in the bamazon database.

The system will then prompt you and ask which product you would like to purchase. In order to purchase a product, enter the ID for the product you wish to purchase.

Next, a prompt will display asking how many of the product you would like to purchase. Make sure that you take note of how many items there are for sale so as not to enter a number greater than the quantity available.

The CLI will then display the amount that you need to pay for your purchase and exit you from the system.

Part II: bamazonmanager.js
Within the bamazonmanager.js, there are four options from which you can select: View Products for Sale, View Low Inventory, Add to Inventory, and Add New Product.

Use the arrow keys to move up and down. The small arrow next to the menu item indicates which is selected. After finding the desired command, press "Enter" or "Return."

View Products for Sale will display a table with with the ID, product name, department name, price, and quantity of each item in the bamazon database.

View Low Inventory will allow managers to see which products have fewer than 5 left in stock so they may order more.

Add to Inventory brings up a menu with all the items in the database. Select which item you would like to add more inventory to and then enter the inventory. The menu ensures that the product name and/or id is not entered incorrectly.

Add New Product allows managers to enter a new product into the database. They should carefully enter the product name, select a department that it will be in, enter the price, and enter the stock inventory.

When finished with any of the four options, the system will automatically log the managers out to ensure that they do not mistakenly enter information.
