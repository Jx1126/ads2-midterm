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
    return this.stack.length === 0;
  }

};

var example_array = [3, 4, 5, '+', '*'];

var stack = new Stack();

function postFix(array) {

  for(var i = 0; i < array.length; i++) {

    let element = array[i];
    var x, y;

    switch(element) {
      case '+':
        x = stack.pop();
        y = stack.pop();

        stack.push(x + y);
        break;

      case '-':
        x = stack.pop();
        y = stack.pop();

        stack.push(x - y);
        break;

      case '*':
        x = stack.pop();
        y = stack.pop();

        stack.push(x * y);
        break;

      case '/':
        x = stack.pop();
        y = stack.pop();

        stack.push(x / y);
        break;

      default:
        stack.push(element);
        break;
    }

  }
  return stack.peek();
}

function main() {
  var final_value = postFix(example_array);
  console.log(final_value);
}

main();