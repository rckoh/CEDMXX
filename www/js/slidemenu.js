$(function(){
	var menuStatus;
	
	$("button.buttonbg").click(function(){
		if(menuStatus != true){				
			$(".menuarea").animate({
                marginLeft: "0px",}, 300, function() {
                    menuStatus = true; 
            });
            
		  	return false;
		  } 
        else {
			$(".menuarea").animate({
			marginLeft: "-70%",
		  }, 300, function(){menuStatus = false;});
              
			return false;
		  }
	});
    
	$("body").on("swipeleft", function(){
        alert("slideleft");
		if (menuStatus){	
		$(".menuarea").animate({
			marginLeft: "-70%",
		  }, 300, function(){menuStatus = false});
		  }
	});
	
	$("body").on("swiperight", function(){
        alert("slideright");
		if (!menuStatus){	
		$(".menuarea").animate({
			marginLeft: "0%",
		  }, 300, function(){menuStatus = true});
		  }
	});
	
	$("#menu li a").click(function(){
		var p = $(this).parent();
		if($(p).hasClass('active')){
			$("#menu li").removeClass('active');
		} else {
			$("#menu li").removeClass('active');
			$(p).addClass('active');
		}
	});
		
});