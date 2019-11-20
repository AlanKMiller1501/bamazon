/* Database structure & cli-table reference
Products (ProductName, DepartmentName, Price, StockQuantity)
var inventory = new Table({ head: ["ID", "Product Name", "Department", "Price", "Quantity in stock"] });
*/

var mysql = require("mysql");
var prompt = require("prompt");
var Table = require("cli-table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	user: "root", 
	password: "",
	host: "localhost",
	port: 3306,
	database: "Bamazon"
})
