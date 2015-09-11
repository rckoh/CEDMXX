function startLoading(){
    $(".app").prepend("<div class='loadingPage'><img class='loadingIcon' src='img/loading_large.gif'></img></div>");
}

function endLoading(){
    $(".loadingPage").remove();
}