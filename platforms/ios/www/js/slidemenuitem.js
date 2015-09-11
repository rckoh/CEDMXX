//$("#slidemenu").append("<li><label class='itemlabel'><img src='img/user-2.png' class='menuitemimg' />Login</label></li>");
var sessiontoken;
function checkMenuLoginStatus(){
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(runMenuSelectProfile);
}

function runMenuSelectProfile(t){
    t.executeSql('select * from userprofile', [], successMenuSelectProfile, errorMenuSelectProfile);    
}

function successMenuSelectProfile(t, results){
    if(results.rows.length==0)
    {
        $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
        $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching.png' class='menuitemimg' />Business Matching</label></li>");
        $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing.png' class='menuitemimg' />Listings</label></li>");
        $("#slidemenu").append("<li><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
        $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
    }
    else{
        var roles=results.rows.item(0).role;
        var rolearr=roles.split(",");
        sessiontoken=results.rows.item(0).token;
        if(jQuery.inArray("7",rolearr)==1 || jQuery.inArray("6",rolearr)==1){    
            $("#slidemenu").append("<li onclick='goProfile();'><label class='itemlabel'><img src='img/user-2.png' class='menuitemimg' />My Profile</label></li>");
        }
        $("#slidemenu").append("<li onclick='goFavourite();'><label class='itemlabel'><img src='img/fav.png' class='menuitemimg' />Favourites</label></li>");
        $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
        $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching.png' class='menuitemimg' />Business Matching</label></li>");
        $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing.png' class='menuitemimg' />Listings</label></li>");
        $("#slidemenu").append("<li><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
        $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
        $("#slidemenu").append("<li><label class='itemlabel' onclick='logout();'><img src='img/logout.png' class='menuitemimg' />Logout</label></li>");
    }

////        console.log('ID: '+results.rows.item(i).id);

}


function errorMenuSelectProfile(err){
    //alert('There was an error processing the SQL: '+err.message);
}                       
                        
                        
                        
                        
                        