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
    if(array[i] == '+' || array[i] == '-' || array[i] == '*' || array[i] == '/') {
      var operand_1 = stack.pop();
      var operand_2 = stack.pop();
      var operator = array[i];
      var calculated;

      if(operator == '+') {
        calculated = operand_1 + operand_2;
      } else if(operator == '-') {
        calculated = operand_1 - operand_2;
      } else if(operator == '*') {
        calculated = operand_1 * operand_2;
      } else if(operator == '/') {
        calculated = operand_1 / operand_2;
      }
      
      stack.push(calculated);
  } else {
    stack.push(array[i]);
  }

  }
  return stack.peek();
}

function draw() {
  var final_value = postFix(example_array);
  console.log(final_value);
}

draw();