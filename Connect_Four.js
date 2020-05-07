var playerOne = prompt("Player One, enter your name. You'll be blue.");
var playerOneColor = "rgb(86, 151, 255)";

var playerTwo = prompt("Player Two, enter your name. You'll will be red.");
var playerTwoColor = "rgb(237, 45, 73)";

var table = $('table tr');

function report(row, col){
  // Logging for debugging purpose only
  console.log("Won at row and column: "+row+","+col);
}

function changeColor(row, col, color){
  // Changes the color of the button accodring to the color passed
  return table.eq(row).find('td').eq(col).find('button').css('background-color', color);
}

function returnColor(row, col){
  // Returns the color of the button
  return table.eq(row).find('td').eq(col).find('button').css('background-color');
}

function checkBottom(col){
  // Returns the bottom most gray row number for the given column
  var colorReport = returnColor(5, col);
  for (var row = 5; row >= 0; row--) {
    colorReport = returnColor(row, col);
    if (colorReport === "rgb(128, 128, 128)") { //Check for gray color
      return row;
    }
  }
}

function colorMatchCheck(colorOne, colorTwo, colorThree, colorFour){
  //Checks if the four color passed in the argument are same, excluding the gray color
  return (colorOne === colorTwo && colorOne === colorThree && colorOne === colorFour && colorOne !== 'rgb(128, 128, 128)' && colorOne !== undefined);
}

function horizontalWinCheck(){
  // Checks for four similar color cells horizontally
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++){
      if (colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
        console.log("Horizontal");
        report(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  // Checks for four similar color cells vertically
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++){
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))) {
        console.log("vertical");
        report(row, col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

function diagonalWinCheck(){
  // Checks for four similar color cells diagonally
  for (var col = 0; col < 5; col++){
    for (var row = 0; row < 7; row++) {
      // Positive slope diagonal
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))) {
        console.log("diagonal");
        report(row, col);
        return true;
      }
      // Negative slope diagonal
      else if (colorMatchCheck(returnColor(row, col), returnColor(row-1, col+1), returnColor(row-2, col+2), returnColor(row-3, col+3))) {
        console.log("diagonal");
        report(row, col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

// Start with Player 1
var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

$('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");

$('.board button').on("click",function(){

  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);

  changeColor(bottomAvail, col, currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName+" is the winner! Reload the page to play again.");

    $('h3').fadeTo('3000',0.01);
    $('h3').css('color','white');

    $('h2').fadeTo('3000',0.01);
    $('h2').css('color','white');

    $('.board button').prop('disabled', true);
    $('.board').fadeTo("3000", 0.15);

    var jqObject = {
      display:"block",
      position:"relative",
      top:"-290px"
    };
    $('.overlay').css(jqObject);

  }

  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1) {
    currentName = playerOne;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = playerOneColor;
  }
  else {
    currentName = playerTwo;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = playerTwoColor;
  }
})
