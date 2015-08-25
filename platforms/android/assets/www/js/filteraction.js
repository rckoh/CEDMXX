$(function(){
	$("#filterBtn").click(function(){
		$(".filterbg").animate({
			marginLeft: "10%",
		  }, 300, function(){});
              
        return false;
	});
    
    $("#closeBtn").click(function(){
		$(".filterbg").animate({
			marginLeft: "100%",
		  }, 300, function(){});
              
        return false;
	});
});