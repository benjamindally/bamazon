DROP IF EXISTS bamazonDB

CREATE DATABASE bamazonDB

USE bamazonDB

CREATE TABLE products(
    ID INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT(5),
    stock_quantity INT(10)
)