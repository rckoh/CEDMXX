$(function(){
    
	$("#filterBtn").click(function(){
        
        
        if(currentpage==1){
            $("#productfilter").show();
            $("#servicefilter").hide();
        }
        else if(currentpage==2){
            $("#productfilter").hide();
            $("#servicefilter").show();
        }
        
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
