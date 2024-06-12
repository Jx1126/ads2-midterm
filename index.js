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
  rl.question("[ PostFix++ Calculator ]\nPlease Enter a PostFix++ Expression. For Example: 3 4 5 + *\nYour Input: ", (input_array) => {
      // Split the input into an array when a space is detected
      input_array = input_array.split(" ");
      console.log("Steps breakdown: ");
      // Show the output of the PostFix function in the console using the user input
      console.log("Final Output:", postFix(input_array), "\n");
      // Run the main function again to allow for more user input
      main();
    }
  );
}

main();

// Create an array to store variables and their values
const variables = [];

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
        element.toUpperCase();
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
            variables[y] = variables[x];
            console.log("Variable [", y.toUpperCase(),"] has been set to ", variables[x] + ".");
          } else {
            // Set the value of the variable to the number as a float
            variables[y] = parseFloat(x);
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
    return variables[element];
  } else {
    // Convert the element to a float if it is a number and return it
    return parseFloat(element);
  }
}
