var inquirer = require("inquirer");
const connection = require("./config/connection");

//****************
console.log(
  "Welcome to Bamazon.  Please peruse our inventory and pick out something you like:"
);
displayAll();

function displayAll(){
	db = {};
	connection.query("SELECT * FROM Products", function(error, results){
		if(error){throw error};
		var inventory = new Table({ head: ["ID", "Product Name", "Department", "Price", "Quantity in stock"]});
		results.forEach(function(value, index, array){

   


	 console.table(results);
    var inventory = new Table({
      head: ["ID", "Product Name", "Department", "Price", "Quantity in stock"]
    });
    results.forEach(function(value, index, array) {
     
      var idNum = value.id;
      var product = value.ProductName;
      var dept = value.DepartmentName;
      var price = value.Price;
      var stock = value.StockQuantity;

      var newLine = {};
      newLine[idNum] = [product, dept, price, stock];
      db[idNum] = value;
      inventory.push(newLine);
    });
    console.log(inventory.toString());
  });
}

//Changes inventory levels
function changeInventory(id, currentQuantity, addOrSubtract) {
  var newQuantity = currentQuantity + addOrSubtract;
  var updateText = "UPDATE Products\
		SET StockQuantity = ?\
		WHERE id = ?";
  connection.query(updateText, [newQuantity, id], function(error, results) {
    if (error) {
      throw error;
    }
  });
}

//Purchases
function purchase() {
  setTimeout(function() {
    purchaseGo();
  }, 3000);
  function purchaseGo() {
    //Prompt
    prompt.start();
    console.log(
      "To purchase a product, enter the ID number of the product, and quantity you would like to purchase."
    );
    prompt.get(["ID", "Quantity"], function(error, results) {
      if (error) {
        throw error;
      }

      var itemID = Number(results.ID);
      var purchaseItem = db[itemID];
      var totalPrice = purchaseItem.Price * results.Quantity;
      var changeQuantity = results.Quantity * -1;

      if (purchaseItem.StockQuantity >= results.Quantity) {
        changeInventory(itemID, purchaseItem.StockQuantity, changeQuantity);

        //Results
        console.log("Your purchase: " + purchaseItem.ProductName);
        console.log("Quantity: " + results.Quantity);
        console.log("Total price: $" + totalPrice);
      } else {
        console.log("Purchase error");
      }
      morePlease();
    });
  }
}

function morePlease() {
  var questions = [
    {
      name: "again",
      message: "Would you like to make another purchase?",
      type: "confirm"
    }
  ];
  inquirer.prompt(questions).then(function(answers) {
    if (answers.again) {
      displayAll();
      purchase();
    } else {
      console.log("Goodbye!");
      return;
    }
  });
}
