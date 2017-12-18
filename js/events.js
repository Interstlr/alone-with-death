$(document).ready(function(){
    $('.pauseMenu').hide();
    $('.pauseIndicator').hide();
    $('.startMenu').show();
    $('.gameOverMenu').hide();
});

$('.startBtn').click(function(){
    $('.startMenu').hide();
    gameStart = true;
});

$('.resumeBtn').click(function(){
    $('.pauseMenu').toggle();
    $('.pauseIndicator').toggle();
    gameIsPaused = false;
});

$('.restartBtn').click(function(){
    $('.gameOverMenu').hide();
    window.location.reload();
});


$(this).keydown(function(e){
    
    if(!gameStart) {
        return;
    }

    if(e.keyCode == 27) {
        gameIsPaused = gameIsPaused ? false : true;
        $('.pauseMenu').toggle();
        $('.pauseIndicator').toggle();
    }
});

$("html,body").on("contextmenu", false);
