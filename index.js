class Stack {
  constructor() {
    this.stack = [];
  }

  push(element) {
    this.stack.push(element);
  }

  pop(element) {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  size() {
    return this.stack.length;
  }

  isEmpty() {
    if (this.stack.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}

class HashTable {
  constructor(size) {
    this.size = size;
    this.hash_table = new Array(size).fill(null).map(() => []);
  }

  hash(key){
    return key.toUpperCase().charCodeAt(0) - 65;
  }

  set(key, value){
    const index = this.hash(key);
    const bucket = this.hash_table[index];

    for(var i = 0; i < bucket.length; i++) {
      if(bucket[i][0] == key) {
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);
  }

  get(key){
    const index = this.hash(key);
    const bucket = this.hash_table[index];

    for(var i = 0; i < bucket.length; i++) {
      if(bucket[i][0] == key) {
        return bucket[i][1];
      }
    }
    return undefined;
  }

  delete(key){
      const index = this.hash(key);
      const bucket = this.hash_table[index];

      for(var i = 0; i < bucket.length; i++) {
        if(bucket[i][0] == key) {
          bucket.splice(i, 1);
          return true;
        }
      }
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
  rl.question("--------------\n[ PostFix++ Calculator ]\n--------------\nList of commands:\n1. Enter a PostFix++ Expression. For Example: 3 4 5 + *\n2. 'search <variable>' - Search for the value of a variable.\n3. 'set <variable> <value>' - Set a value to a variable.\n4. 'delete <variable>' - Remove a variable and its value\n--------------\nYour Input: ", (input_array) => {
      // Split the input into an array when a space is detected
      input_array = input_array.split(" ");

      if(!checkInput(input_array)){
        console.log("Steps breakdown: ");
        // Show the output of the PostFix function in the console using the user input
        console.log("Final Output:", postFix(input_array), "\n");;
        } else {
          checkInput(input_array);
        }
        
      // Run the main function again to allow for more user input
      main();
    }
  );
}

main();

// Create an array to store variables and their values
const variables = [];

const hashTable = new HashTable(26);

function checkInput(input) {
  if (input.length >= 3 && input[0].toUpperCase() === "SET") {
    // Set command: set a 2
    const variable = input[1].toUpperCase();
    const value = input.slice(2).join(" "); // Join all elements from index 2 onwards as the value

    hashTable.set(variable, parseFloat(value));
    console.log(`Variable [${variable}] has been set to ${value}.`);
    return true;
  } else if (input.length === 2 && input[0].toUpperCase() === "SEARCH") {
    // Search command: search a
    const variable = input[1].toUpperCase();
    const value = hashTable.get(variable);
    if (value !== undefined) {
      console.log(`Searching for variable: ${variable}`);
      console.log(`Value: ${value}`);
      return true; // Return true after logging the search result
    } else {
      console.log(`Variable ${variable} not found.`);
      return false; // Return false if variable is not found
    }
  } else if (input.length === 2 && input[0].toUpperCase() === "DELETE") {
    // Delete command: delete a
    const variable = input[1].toUpperCase();
    const deleted = hashTable.delete(variable);
    if (deleted) {
      console.log(`Deleting variable: ${variable}`);
      return true; // Return true after deleting the variable
    } else {
      if(!deleted){
        console.log(`Variable ${variable} not found.`);
      }
      return false; // Return false if variable is not found
    }
  } else {
    console.log("Invalid command. Please use the following commands: set <variable> <value>, search <variable>, delete <variable>");
    return false; // Return false for invalid commands
  }
}

function postFix(array) {
  // Create a new stack
  var stack = new Stack();

  for (var i = 0; i < array.length; i++) {
    // Get the element at the current index
    let element = array[i];
    let x, y;

    // Check if the element is a number
    if (!isNaN(element)) {
      // Push the element to the stack if it is a number
      stack.push(element);
    }
      // Check if the element is an alphabet
      else if (element.match(/[a-zA-Z]/)) {
        // Convert the alphabet variable to uppercase
        element = element.toUpperCase();
        // Push the alphabet variable to the stack
        stack.push(element);
    } else {
      // Check if the element is an operator
      switch (element) {
        // If the element is +
        case "+":
          // Pop two element from the stack
          x = stack.pop();
          y = stack.pop();

          // Check if the element is a variable
          x = getVarValue(x);
          y = getVarValue(y);

          console.log(x, '+' , y, '=', x + y);

          // Perform addition and push the result to the stack
          stack.push(x + y);
          // Break out of the switch statement
          break;

        // If the element is -
        case "-":
          // Pop two element from the stack
          x = stack.pop();
          y = stack.pop();

          // Check if the element is a variable
          x = getVarValue(x);
          y = getVarValue(y);

          console.log(x, '-' , y, '=', x - y);

          // Perform subtraction and push the result to the stack
          stack.push(x - y);
          // Break out of the switch statement
          break;

        // If the element is *
        case "*":
          // Pop two element from the stack
          x = stack.pop();
          y = stack.pop();

          // Check if the element is a variable
          x = getVarValue(x);
          y = getVarValue(y);

          console.log(x, '*' , y, '=', x * y);
          // Perform multiplication and push the result to the stack
          stack.push(x * y);
          // Break out of the switch statement
          break;

        // If the element is /
        case "/":
          // Pop two element from the stack
          x = stack.pop();
          y = stack.pop();

          // Check if the element is a variable
          x = getVarValue(x);
          y = getVarValue(y);

          console.log(x, '/' , y, '=', x / y);

          // Perform division and push the result to the stack
          stack.push(x / y);
          break;

        // If the element is %
        case "%":
          // Pop two element from the stack
          x = stack.pop();
          y = stack.pop();

          // Check if the element is a variable
          x = getVarValue(x);
          y = getVarValue(y);

          console.log(x, '%' , y, '=', x % y);

          // Perform division and push the result to the stack
          stack.push(x % y);
          break;

        // If the element is ^
        case "^":
          // Pop two element from the stack
          x = stack.pop();
          y = stack.pop();

          // Check if the element is a variable
          x = getVarValue(x);
          y = getVarValue(y);

          console.log(x, '^' , y, '=', x ** y);

          // Perform division and push the result to the stack
          stack.push(x ** y);
          break;

        // If the element is =
        case "=":
          // Pop two element from the stack
          x = stack.pop();
          y = stack.pop();

          // Check if the element is a variable
          if (isNaN(x)) {
            // Set the value of the variable to the value of the other variable
            // variables[y] = variables[x];
            // console.log("Variable [", y.toUpperCase(),"] has been set to ", variables[x] + ".");
            hashTable.set(y, hashTable.get(x));
            console.log("Variable [", y.toUpperCase(),"] has been set to ", hashTable.get(x) + ".");
          } else {
            // Set the value of the variable to the number as a float
            // variables[y] = parseFloat(x);
            // console.log("Variable [", y.toUpperCase(),"] has been set to ", x + ".");
            hashTable.set(y, parseFloat(x));
            console.log("Variable [", y.toUpperCase(),"] has been set to ", x + ".");
          }
          break;

        // If the element is not a operator mentioned above
        default:
          // Log an error message to the console
          console.log('The operator: [', element, '] is invalid and will be ignored. Please only use the following operators: +, -, *, /, %, ^, =');
          // Break out of the switch statement
          break;
      }
    }
  }
  // Return the top element of the stack
  return stack.peek();
}

// A function to check if the element is a variable or a number
function getVarValue(element) {
  // Check if the element is a number
  if (isNaN(element)) {
    // Return the value of the variable if it is a variable
    // return variables[element];
    return hashTable.get(element);
  } else {
    // Convert the element to a float if it is a number and return it
    return parseFloat(element);
  }
}