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
			marginLeft: "-66%",
		  }, 300, function(){menuStatus = false;});
              
			return false;
		  }
	});
 
	$('.pages').on("swipeleft",".ui-page-active", function(){
		if (menuStatus){	
		$(".ui-page-active").animate({
			marginLeft: "0px",
		  }, 300, function(){menuStatus = false});
		  }
	});
	
	$('.pages').on("swiperight", ".ui-page-active", function(){
		if (!menuStatus){	
		$(".ui-page-active").animate({
			marginLeft: "165px",
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