//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//init slide menu
var slideMenu = {
    
    initSlideMenu: function(){
        dbmanager.getProfile(function(returnData){
            if(returnData.rows.length==0){
                $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
                $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching.png' class='menuitemimg' />Business Matching</label></li>");
                $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing.png' class='menuitemimg' />Listings</label></li>");
                $("#slidemenu").append("<li><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
                $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
            }
            else{
                var roles=returnData.rows.item(0).role;
                var rolearr=roles.split(",");
                if(jQuery.inArray("7",rolearr)==1 || jQuery.inArray("6",rolearr)==1){    
                    $("#slidemenu").append("<li onclick='goProfile();'><label class='itemlabel'><img src='img/user-2.png' class='menuitemimg' />My Profile</label></li>");
                }
                $("#slidemenu").append("<li onclick='goFavourite();'><label class='itemlabel'><img src='img/fav.png' class='menuitemimg' />Favourites</label></li>");
                $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
                $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching.png' class='menuitemimg' />Business Matching</label></li>");
                $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing.png' class='menuitemimg' />Listings</label></li>");
                $("#slidemenu").append("<li><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
                $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
                $("#slidemenu").append("<li><label class='itemlabel' onclick='logoutOnclick();'><img src='img/logout.png' class='menuitemimg' />Logout</label></li>");
            }
        });
    },    
}




//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//add slide menu event to control

$(function(){
	
	$("button.buttonbg").click(function(){
		if(menuStatus != true){				
			$(".menubg").animate({
                marginLeft: "0px",}, 300, function() {
                    menuStatus = true; 
            });
            
		  	return false;
		  } 
        else {
			$(".menubg").animate({
			marginLeft: "-70%",
		  }, 300, function(){menuStatus = false;});
              
			return false;
		  }
});
    
//	$("body").on("swipeleft", function(){
//		if (menuStatus){	
//		$(".menubg").animate({
//			marginLeft: "-70%",
//		  }, 300, function(){menuStatus = false});
//		  }
//	});
//	
//	$("body").on("swiperight", function(){
//		if (!menuStatus){	
//		$(".menubg").animate({
//			marginLeft: "0%",
//		  }, 300, function(){menuStatus = true});
//		  }
//	});
//	
//	$("#menu li a").click(function(){
//		var p = $(this).parent();
//		if($(p).hasClass('active')){
//			$("#menu li").removeClass('active');
//		} else {
//			$("#menu li").removeClass('active');
//			$(p).addClass('active');
//		}
//	});
});

//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//slide menu item onclick

function goBusinessMatching(){
	window.location = "businessMatchingPage.html";
}

function goTrending(){
	window.location = "index.html";
}

function goFavourite(){
	window.location = "favouritePage.html";
}

function goAbout(){
	window.location = "aboutPage.html";
}

function goListing(){
	window.location = "listingPage.html";
}

function goProfile(){
	window.location = "profilePage.html";
}

function logoutOnclick(){
    loading.startLoading();
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            postLogout(token);
        }
        else{
            loading.endLoading();
        }
    });
}






