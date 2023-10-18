// CREATING FUNCTIONS FOR THE HISTORY AND OUTPUT ID'S
function getHistory() {
  return document.getElementById("history-value").innerText;
}
function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}
function getOutput() {
  return document.getElementById("output-value").innerText;
}
function printOutput(num) {
  if (num == "") {
    document.getElementById("output-value").innerText = num;
  }
  else {
    document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
  
}

// ADDING COMMAS TO NUMBER FORMAT
function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}

// REMOVING COMMAS FROM NUMBER FORMAT
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g,""));
}

// GETTING THE OPERATORS AND ASSIGNING OPERATION FUNCTION
var operator = document.getElementsByClassName("operator");
  for (var i = 0; i < operator.length; i++){
    operator[i].addEventListener("click", function() {

      //CLEAR OPERATIONS
      if (this.id == "clear") {
        printHistory("");
        printOutput("");
      }

      //BACKSPACE OPERATIONS
      else if (this.id == "backspace") {
        var output = reverseNumberFormat(getOutput()).toString();
        if (output) {
          output = output.substring(0, output.length -1);
          printOutput(output);
        }
      }

      //OTHER OPERATORS FUNCTION
      else {
        var output = getOutput();
        var history = getHistory();
        if (output == "" && history !== "") {
          if (isNaN(history[history.length -1])) {
            history = history.substring(0, history.length -1);
          }
        }
        if (output != "" || history != "") {
          output = output == ""?
          output:reverseNumberFormat(output);
          history = history + output;
          if (this.id == "=") {
            var result = eval(history);
            printOutput(result);
            printHistory("");
          }
          else {
            history = history + this.id;
            printHistory(history);
            printOutput("");
          }
        }
      }
    }
  );
}

// GETTING THE NUMBERS
var number = document.getElementsByClassName("number");
for(var x = 0; x < number.length; x++) {
  number[x].addEventListener("click", function() {
    
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) { //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  })
}

