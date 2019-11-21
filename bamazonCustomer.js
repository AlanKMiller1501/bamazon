

var mysql = require("mysql");
var prompt = require("prompt");
var Table = require("cli-table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	user: "root", 
	password: "Darby501!",
	host: "localhost",
	port: 3306,
	database: "Bamazon"
})


var db;


function displayAll(){
	db = {};
	connection.query("SELECT * FROM Products", function(error, results){
		if(error){throw error};
		var inventory = new Table({ head: ["ID", "Product Name", "Department", "Price", "Quantity in stock"]});
		results.forEach(function(value, index, array){
			//Store each item
			var idNum = value.id;
			var product = value.ProductName;
			var dept = value.DepartmentName;
			var price = value.Price;
			var stock = value.StockQuantity;

					//cli-table
					var newLine = {};
					newLine[idNum] = [product, dept, price, stock];
					db[idNum] = value;
					inventory.push(newLine);
				})
				console.log(inventory.toString());
			})
		}
		
		//Changes inventory levels
function changeInventory(id, currentQuantity, addOrSubtract){
	var newQuantity = currentQuantity + addOrSubtract;
	var updateText = "UPDATE Products\
		SET StockQuantity = ?\
		WHERE id = ?";
	connection.query(updateText, [newQuantity, id], function(error, results){
		if(error){throw error};
	})
}
