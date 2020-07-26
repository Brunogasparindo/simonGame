
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// I'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Start
$(document).keypress(function () {
  if (started == false) {
    level = 0;
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

// To check if a button is clicked
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animation(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animation(randomChosenColour);
  playSound(randomChosenColour);
  levelUpdate();
}

function checkAnswer (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000)
    }
  }
  else {
    gameOver();
  }
}

function levelUpdate () {
  level = level + 1;
  $("#level-title").text("Level " + level);
}

function animation(colour) {
  $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound (colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function gameOver () {
  gamePattern = [];
  started = false;
  $("#level-title").text("Game Over, Press Any Key to Restart");
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 500)
}
