var buttonColor = ["red","green","blue","yellow"];
var gamePattern =[];
var userClickedPattern = [];
var lvl=0;
var started = false;

$(document).on("keypress",function(){
    if(!started){
        $(".main p").html("Level "+ lvl);
        nextSequence();
        started=true;
    }
});



function nextSequence(){
    lvl++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
 
    playSound(randomChosenColor);
    var theButton =$("."+randomChosenColor);
    theButton.fadeIn(150).fadeOut(150).fadeIn(150);  
    
    $(".main p").html("Level "+ lvl);
    
}

$(".simon").on("click",function(){
   var userChosenColour = $(this).attr("id") ;
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern);
})

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}



function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(end,100);
    function end(){
        $("."+currentColour).removeClass("pressed");
    }
}



function checkAnswer(currentLevel){
    var a = currentLevel.length - 1;
    if(gamePattern[a] == userClickedPattern[a]){
        console.log("success");
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(nextSequence,1000);
            userClickedPattern = [];
        }

    }else{
        console.log("fail");
        $("body").addClass("wrong");  
        var audioFail = new Audio("./sounds/wrong.mp3");
        audioFail.play();   
        $(".main p").html("Game Over, Press Any Key to Restart");
        setTimeout(wrong,200);
        function wrong() {
            $("body").removeClass("wrong");       
        }
        startOver()
    }

    function startOver(){
        lvl = 0;
        gamePattern = [];
        started=false;
    }

}