$(document).ready(function(){
    $('.pauseMenu').hide();
    $('.pauseIndicator').hide();
    $('.gameOverMenu').hide();
    $('.finishMenu').hide();
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
    if(e.keyCode == 27 && !gameOver && !gameIsWon) {
        gameIsPaused = gameIsPaused ? false : true;
        $('.pauseMenu').toggle();
        $('.pauseIndicator').toggle();
    }
});

$("html,body").on("contextmenu", false);

$('.resumeFinishBtn').click(function(){
    $('.finishMenu').hide();
    gameIsPaused = false;
    gameIsWon = false;
});

$('.landingBtn').click(function () {
    location.href = '/';
});