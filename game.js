buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
level = -1;


flash = function() {
  randomNumber = Math.floor(Math.random() * 3);
  randomChosenColour = buttonColours[randomNumber];
  return randomChosenColour;
};
gameOver = function() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
  gamePattern = [];
  userClickedPattern = [];
  level = -1;
  console.log("game over");
  $("h1").text("Game Over please press any key to Restart!");
};

isGameOver = function() {
  for (i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] == userClickedPattern[i]) {
      // its ok
      console.log("its ok");
    } else {
      // fucked up game over
      console.log("fucked up game over");
      gameOver();
      return true;
    }
  }

  if (userClickedPattern.length == gamePattern.length) {
    level = level + 1;
    $("h1").text("level " + level);
    r = flash();
    $("#" + r).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    new Audio("sounds/" + r + ".mp3").play();
    gamePattern.push(r);
    userClickedPattern = [];
    console.log("new flash "+gamePattern+"####"+userClickedPattern);
  }
};

start = function() {
  if(isGameOver()){
      start();
  }
};

$(document).ready(function() {
  $(document).keypress(function() {
    start();
  });
});
$(document).ready(function(){
  $("#red, #blue, #green, #yellow").on({
    mouseenter: function(event) {
      $("#"+event.target.id).css("opacity", "50%");
    },
    mouseleave: function(event) {
      $("#"+event.target.id).css("opacity", "100%");
    },
    click: function(event) {
      $("#"+event.target.id).fadeOut(5).fadeIn(5);
      new Audio("sounds/" + event.target.id + ".mp3").play();
      console.log("pushed "+event.target.id+" to userClickedPattern");
      userClickedPattern.push(event.target.id);
      isGameOver();
    }
  });
});
