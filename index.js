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
    if(this.stack.length == 0) {
      return true;
    } else {
      return false;
    }
  }

};

// https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const variables = [];

function main() {

  rl.question('[ PostFix++ Calculator ]\nPlease Enter a PostFix++ Expression. For Example: 3 4 5 + *\nYour Input: ', (input_array) => {
    input_array = input_array.split(' ');
    console.log('Output: ', postFix(input_array));
    rl.close();
  });
}

main();

function postFix(array) {

  var stack = new Stack();

  for(var i = 0; i < array.length; i++) {

    let element = array[i];
    var x, y;

    switch(element) {
      case '+':
        x = stack.pop();
        y = stack.pop();

        stack.push(x + y);
        console.log(stack);
        console.log('Peek: ', stack.peek());
        console.log(' ');
        break;

      case '-':
        x = stack.pop();
        y = stack.pop();

        stack.push(x - y);
        console.log(stack);
        console.log('Peek: ', stack.peek());
        console.log(' ');
        break;

      case '*':
        x = stack.pop();
        y = stack.pop();

        stack.push(x * y);
        console.log(stack);
        console.log('Peek: ', stack.peek());
        console.log(' ');
        break;

      case '/':
        x = stack.pop();
        y = stack.pop();

        stack.push(x / y);
        console.log(stack);
        console.log('Peek: ', stack.peek());
        console.log(' ');

        break;

      case '=':
        x = stack.pop();
        y = stack.pop();

        if(isNaN(x)) {
          variables[x] = variables[y];
        } else {
          variables[y] = x;
        }
        break;

      default:

        console.log(stack);
        console.log('Peek: ', stack.peek());
        console.log(' ');
        stack.push(Number(element));
        // if(!isNaN(element)) {
        //   stack.push(element);
        // } else if(element.match(/[a-zA-Z]/)) {
        //   element.toUppercase();
        //   stack.push(element);
        // }
        break;
    }

  }
  return stack.peek();
}