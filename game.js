
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0

$(document).keypress(function(){
    if(level === 0) {
        nextSequence()
    } 
})


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    playSound(randomChosenColor)
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    $("h1").text("Level " + level++)
    userClickedPattern = []
    
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success")
        if (gamePattern.length === userClickedPattern.length) {
                setTimeout(function(){
                   nextSequence()
            }, 1000);
        } 
    } 
    else {
        gameOver()
    }
}

// CLICK DETECTOR
$("button").on("click", function(event) {
    var userChosenColour = event.delegateTarget.id;
    userClickedPattern.push(userChosenColour)
    playSound(event.delegateTarget.id)
    animatePress(event.delegateTarget.id)
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name) {
    var audio = new Audio('sounds/' + name + ".mp3")
    audio.play()    
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed")
    setTimeout(function(){
        $("." + currentColor).removeClass('pressed');
}, 100);
}

function gameOver() {
    var a = new Audio("sounds/wrong.mp3")
    a.play()
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass('game-over');
    }, 200);
    $("h1").text("Game Over")
    startOver()
}

function startOver() {
    level = 0;
    gamePattern = [];
}

