var num1 = Math.floor(Math.random() * 6) + 1; //player 1
var dice1 = "images/dice" + num1 + ".png";
var num2 = Math.floor(Math.random() * 6) + 1;
var dice2 = "images/dice" + num2 + ".png";
document.querySelectorAll("img")[0].setAttribute("src", dice1);
document.querySelectorAll("img")[1].setAttribute("src", dice2);
if (num1 > num2) {
  document.querySelector("h1").innerHTML = "🚩Player 1 Wins!";
} else if (num1 < num2) {
  document.querySelector("h1").innerHTML = "Player 2 Wins!🚩";
} else {
  document.querySelector("h1").innerHTML = "Draw!";
}
