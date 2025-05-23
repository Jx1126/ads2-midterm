class Stack {
  // Create a stack with an empty array
  constructor() {
    this.stack = [];
  }

  // A method to push an element to the stack using unshift to add it to the front of the array
  push(element) {
    this.stack.unshift(element);
  }

  // A method to pop an element from the stack using shift to remove the first element of the array
  pop() {
    return this.stack.shift();
  }

  // A method to get the top element of the stack
  peek() {
    return this.stack[0];
  }

  // A method to check if the stack is empty
  isEmpty() {
    if (this.stack.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  // A method to print the stack  
  print() {
    return this.stack;
  }
}

class HashTable {
  constructor(size) {
    this.size = size;
    // Create a hash table with a size of 26 for the 26 alphabets and fill it with empty arrays
    this.hash_table = [];
    for (let i = 0; i < size; i++) {
      this.hash_table[i] = [];
    }
  }

  // Hash function to get the index of the key
  // ASCII value of A is 65, so we -65 to get the index of A starting from 0
  hash(key){
    return key.toUpperCase().charCodeAt(0) - 65;
  }

  // A function to set the value of the key in the hash table
  insert(key, value){
    // Get the index of the key
    const index = this.hash(key);
    // Get the bucket of the index
    const bucket = this.hash_table[index];

    // Loop through the bucket 
    for(var i = 0; i < bucket.length; i++) {
      // If a matching key is the same as the input key
      if(bucket[i][0] == key) {
        // Set the value to the input value
        bucket[i][1] = value;
        return;
      }
    }
    // Push the key and value to the bucket
    bucket.push([key, value]);
  }

  // A function to get the value of the key in the hash table
  search(key){
    // Get the index of the key
    const index = this.hash(key);
    // Get the bucket of the index
    const bucket = this.hash_table[index];

    // Loop through the bucket
    for(var i = 0; i < bucket.length; i++) {
      // If a matching key is the same as the input key
      if(bucket[i][0] == key) {
        // Return the value of the key
        return bucket[i][1];
      }
    }
    // Return undefined if the key is not in the hash table
    return undefined;
  }

  // A function to delete the key in the hash table
  remove(key){
    // Get the index of the key
    const index = this.hash(key);
    // Get the bucket of the index
    const bucket = this.hash_table[index];

    // Loop through the bucket
    for(var i = 0; i < bucket.length; i++) {
      // If a matching key is the same as the input key
      if(bucket[i][0] == key) {
        // Remove the key and value from the bucket
        bucket.splice(i, 1);
        // Return true if the key is removed
        return true;
      }
    }
    // Return false if the key is not found
    return false;
  }
}

// Requiring Readline Module to retrieve user input
// https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Main function to run the program
function main() {
  // Prompt for user input
  rl.question("--------------\n[ Algorithm and Data Structure II ]\n--------------\nPlease enter one of the following: \n1 - PostFix++ Calculator\n2 - Search for the value of a variable.\n3 - Insert value to a variable.\n4 - Remove a variable and its value.\n5 - Show all variables and their value\nReturn - Return to main menu\n--------------\nYour Input: ", (input) => {

    // Convert the user input to uppercase if it is a string
    input = input.toUpperCase();
    input = input.trim();

    // Check the user input and run the respective function
    switch (input){
      case "1":
        postFixCalc();
        break;
      
      case "2":
        searchVar();
        break;

      case "3":
        insertVar();
        break;

      case "4":
        removeVar();
        break;

      case "5":
        showAllVar();
        break;

      // If the user input is RETURN
      case "RETURN":
        console.log(">> You are already in the main menu.\n");
        break;

      // If the user input is not in the list
      default:
        console.log(">> Error: Invalid input. Please enter a valid input.\n");
        break;
    }   
      // Run the main function again to allow for more user input
      main();  
  });
}

// Run the main function to start
main();

// Creating a new hash table with a size of 26 for the 26 alphabets
const hashTable = new HashTable(26);

function postFixCalc() {

  rl.question("\n--------------\n[ PostFix++ Calculator ]\n--------------\nPlease Enter a PostFix++ Expression.\nFormat: <operand> <operator>\nExample: 3 4 5 + *\nSupported operations: +, -, *, /, %, ^, =, SIN, COS, TAN, SQRT, CEIL, FLOOR, ABS, ROUND, LOG.\nReturn - Return to main menu\n\nYour Input: ", (input_array) => {

    // Convert the user input to an array when there is a space
    input_array = input_array.split(" ");
    console.log("Steps breakdown: ");
    // Show the output of the PostFix function in the console using the user input
    console.log("Final Output:", postFix(input_array));
    
    // Run the postFixCalc function again to allow for more user input
    postFixCalc();
  });
}

// A function to search for the value of a variable
function searchVar() {

  rl.question("\n--------------\n[ Search for the value of a variable. ]\n--------------\nPlease enter a variable name (A - Z).\nFormat: <variable>\nExample: a\nReturn - Return to main menu\n\nYour Input: ", (input) => {

    // Return to the main menu if the user input is "RETURN"
    returnToMain(input);

    input = input.split(" ");

    if(input[0].match(/[a-zA-Z]/)) {
      // Convert the first element of the user input array into uppercase
      const variable = input[0].toUpperCase().charAt(0);
      // Get the value of the variable from the hash table
      const value = hashTable.search(variable);

      // Log the value of the variable to the console if it is found
      if (value !== undefined) {
        console.log(">> Variable '" + variable + "' =", value + ".");
      } else {
        console.log(">> Variable '" + variable + "' not found.");
      }
    } else {
      console.log(">> Error: Invalid input. Please enter a valid variable name (A - Z).");
    }

    // Run the searchVar function again to allow for more user input
    searchVar();
  });
}

// A function to set a value to a variable
function insertVar() {
  rl.question("\n--------------\n[ Insert value to a variable. ]\n--------------\nPlease enter a variable name (A - Z) and the value.\nFormat: <variable> <value>\nExample: a 5\nReturn - Return to main menu\n\nYour Input: ", (input) => {

    // Return to the main menu if the user input is "RETURN"
    returnToMain(input);

    // Convert the user input to an array when there is a space
    input = input.split(" ");

    if (input[0].match(/^[a-zA-Z]$/) && !isNaN(input[1])) {

      // Convert the first element of the user input array into uppercase as it is a variable
      const variable = input[0].toUpperCase().charAt(0);
      // Get the value of the variable from the user input array
      const value = parseFloat(input[1]);

      // Set the value of the variable to the value
      hashTable.insert(variable, value);
      console.log(">> Variable '" + variable + "' has been set to", value);
    } else if (!(input[0].match(/^[a-zA-Z]$/))) {
      console.log(">> Error: Invalid input. Please enter a valid variable name (A - Z).");
    } else if (isNaN(input[1])) {
      console.log(">> Error: Invalid input. Please enter a valid float value.");
    }

    // Run the insertVar function again to allow for more user input
    insertVar();
  });
}

// A function to remove a variable and its value
function removeVar() {
  rl.question("\n--------------\n[ Remove a variable and its value. ]\n--------------\nPlease enter a variable name (A - Z).\nFormat: <variable>\nExample: a\nReturn - Return to main menu\n\nYour Input: ", (input) => {

    // Return to the main menu if the user input is "RETURN"
    returnToMain(input);

    input = input.split(" ");

    if(input[0].match(/[a-zA-Z]/)) {
      // Convert the first element of the user input array into uppercase as it is a variable
      const variable = input[0].toUpperCase().charAt(0);
      // Remove the variable from the hash table
      const remove = hashTable.remove(variable);

      // Return a message to the console if the variable is removed or not found
      if (remove) {
        console.log(">> Variable: '" + variable, "' has been removed.");
      } else {
        console.log(">> Variable '" + variable + "'not found.");
      }
    } else {
      console.log(">> Error: Invalid input. Please enter a valid variable name (A - Z).");
    }
    // Run the removeVar function again to allow for more user input
    removeVar();
  });
}

// A function to show all variables and their values
function showAllVar() {
  // Check if the hash table is empty
  let isEmpty = true;
  // Loop through the hash table to check if all the buckets are empty
  for (var i = 0; i < hashTable.hash_table.length; i++) {
    // If the length of the bucket is more than 0
    if (hashTable.hash_table[i].length > 0) {
      // Set isEmpty to false
      isEmpty = false;
      // Break out of the loop when a non-empty bucket is found
      break;
    }
  }

  // Log a message if the hash table is empty
  if (isEmpty) {
    console.log(">> There are currently no set variables.\n");
  } else {
    // Loop through the hash table to display all the variables and their values
    for (var i = 0; i < hashTable.hash_table.length; i++) {
      for (var j = 0; j < hashTable.hash_table[i].length; j++) {
        // Skip the 'RETURN' variable
        if (hashTable.hash_table[i][j][0] != "RETURN") {
          // Log the variable and its value to the console
          console.log(">> Variable '" + hashTable.hash_table[i][j][0] + "' = ", hashTable.hash_table[i][j][1]);
        }
      }
    }
    console.log("\n");
  }
}

// A function to return users back to the main menu when they type "RETURN"
function returnToMain(input) {
  // Convert the user input to uppercase
  input = input.toUpperCase();
  // Check if the user input is "RETURN"
  if(input == "RETURN") {
    console.log(">> Returning to main menu.");
    // Run the main function to call the main menu
    main();
  }
}

// A function to calculate the PostFix expression
function postFix(array) {
  // Create a new stack
  var stack = new Stack();

  for (var i = 0; i < array.length; i++) {
    // Get the element at the current index
    let element = array[i];
    let x, y;

    // Check if the element is a number
    if (!isNaN(element) && element !== "") {
      // Push the element to the stack if it is a number
      stack.push(parseFloat(element));
    
    // Check if the element is an alphabet
    } else if (element.match(/^[a-zA-Z]$/)) {
        // Convert the alphabet variable to uppercase
        element = element.toUpperCase();

        // Push the alphabet variable to the stack
        stack.push(element);
    } else {
      // Convert the element to uppercase
      element = element.toUpperCase();

      // Check if the element is an operator
      switch (element) {
        case "":
          break;

        // If the element is one of these operators +, -, *, /, %, ^
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
        case "^":
          // Log an error if there are not enough operands for the operator
          if (stack.print().length < 2) {
            console.log(">> Error: Not enough operands for the operator '" + element + "'");
            break;
          }

          // Pop top 2 operand from the top of the stack
          x = stack.pop();
          y = stack.pop();

          // Get the value if it is a variable
          x = getVarValue(x);
          y = getVarValue(y);

          // Perform operation based on the operator
          switch (element) {
            // Perform addition if the operator is +
            case "+":
              result = x + y;
              break;

            // Perform subtraction if the operator is -
            case "-":
              result = x - y;
              break;

            // Perform multiplication if the operator is *
            case "*":
              result = x * y;
              break;

            // Perform division if the operator is /
            case "/":
              if(y == 0) {
                console.log("\n>> Error: Cannot divide by 0.\n");
                return;
              } 
              result = x / y;
              break;

            // Perform modulo if the operator is %
            case "%":
              result = x % y;
              break;

            // Perform exponentiation if the operator is ^
            case "^":
              result = x ** y;
              break;
          }

          // Log the result
          console.log(x, element, y, "=", result);
          // Push the result back to the stack
          stack.push(result);
          break;

        // Unary operators: SIN, COS, TAN
        case "SIN":
        case "COS":
        case "TAN":
        case "SQRT":
        case "CEIL":
        case "FLOOR":
        case "ABS":
        case "ROUND":
        case "LOG":
          // Log an error if there are not enough operands for the operator
          if (stack.print().length < 1) {
            console.log(">> Error: Not enough operands for the operator '" + element + "'");
            break;
          }

          // Pop operand from the stack
          x = stack.pop();

          // Get the value if it is a variable
          x = getVarValue(x);

          switch (element) {
            // Perform sine if the operator is SIN
            case "SIN":
              result = Math.sin(x);
              console.log("sin(" + x + "radians) =", result);
              break;

            // Perform cosine if the operator is COS
            case "COS":
              result = Math.cos(x);
              console.log("cos(" + x + "radians) =", result);
              break;

            // Perform tangent if the operator is TAN
            case "TAN":
              result = Math.tan(x);
              console.log("tan(" + x + "radians) =", result);
              break;

            // Perform square root if the operator is SQRT
            case "SQRT":
              result = Math.sqrt(x);
              console.log("sqrt(" + x + ") =", result);
              break;

            // Return ceiling if the operator is CEIL
            case "CEIL":
              result = Math.ceil(x);
              console.log("ceil(" + x + ") =", result);
              break;

            // Return floor if the operator is FLOOR
            case "FLOOR":
              result = Math.floor(x);
              console.log("floor(" + x + ") =", result);
              break;

            // Return absolute value if the operator is ABS
            case "ABS":
              result = Math.abs(x);
              console.log("abs(" + x + ") =", result);
              break;
            
            // Return rounded value if the operator is ROUND
            case "ROUND":
              result = Math.round(x);
              console.log("round(" + x + ") =", result);
              break;

            case "LOG":
              result = Math.log(x);
              console.log("ln(" + x + ") =", result);
              break;
          }

          // Push the result back to the stack
          stack.push(result);
          break;

        // If the element is =
        case "=":
          // Pop two element from the stack
          x = stack.pop();
          y = stack.pop();

          if(!isNaN(x) && !isNaN(y)) {
            console.log(">> Error: Cannot assign value to a number. Please assign a value to a variable.");
            break;
          }

          // Check if the element is a variable
          if (isNaN(x)) {
            // Set the value of the variable to the value of the other variable
            hashTable.insert(y, hashTable.search(x));
            console.log(">> Variable [", y.toUpperCase(),"] has been set to", hashTable.search(x) + ".");
          } else {
            // Set the value of the variable to the number as a float
            hashTable.insert(y, parseFloat(x));
            console.log(">> Variable [", y.toUpperCase(),"] has been set to", x + ".");
          }
          break;

        case "RETURN":
          main();
          break;

        // If the element is not a operator mentioned above
        default:
          // Log an error message to the console
          console.log(">> Error: The input '" + element + "' is invalid and will be ignored. Please only use the following operators: +, -, *, /, %, ^, =, SIN, COS, TAN, SQRT, CEIL, FLOOR, ABS, ROUND, LOG.");
          // Break out of the switch statement
          break;
      }
    }
  }
  // Return the top element of the stack
  return stack.print();
}

// A function to check if the element is a variable or a number
function getVarValue(element) {
  // Check if the element is a number
  if (isNaN(element)) {
    // Return the value of the variable if it is a variable
    // return variables[element];
    return hashTable.search(element);
  } else {
    // Convert the element to a float if it is a number and return it
    return parseFloat(element);
  }
}