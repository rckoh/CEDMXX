$(function(){
    
	$("#filterBtn").click(function(){
        $(".filterbg").css("margin-left", "190%");
		$(".filterbg").animate({
			marginLeft: "10%",
		  }, 300, function(){});
              
        return false;
	});
    
    $("#closeBtn").click(function(){
		$(".filterbg").animate({
			marginLeft: "100%",
		  }, 300, function(){$(".filterbg").css("margin-left", "-90%");});
               
        return false;
	});
});