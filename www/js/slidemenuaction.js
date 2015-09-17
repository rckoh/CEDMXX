function goBusinessMatching(){
        // $("html").animate({marginLeft: "-100%",}, 300, function() {window.location = "BusinessMatching.html";});
	window.location = "businessMatchingPage.html";
}

function goTrending(){
         //$("html").animate({marginLeft: "-100%",}, 300, function() {window.location = "index.html";});
	window.location = "index.html";
}

function goFavourite(){
         //$("html").animate({marginLeft: "-100%",}, 300, function() {window.location = "index.html";});
	window.location = "favouritePage.html";
}

function goAbout(){
         //$("html").animate({marginLeft: "-100%",}, 300, function() {window.location = "index.html";});
	window.location = "aboutPage.html";
}

function goListing(){
         //$("html").animate({marginLeft: "-100%",}, 300, function() {window.location = "index.html";});
	window.location = "listingPage.html";
}

function goProfile(){
         //$("html").animate({marginLeft: "-100%",}, 300, function() {window.location = "index.html";});
	window.location = "profilePage.html";
}

function initLogout(){
    startLoading();
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(runGetTokenTransaction);
}

function runGetTokenTransaction(t){
    t.executeSql('select token from userprofile', [], successGetToken, errorGetToken);    
}

function successGetToken(t, results){
    if(results.rows.length>0)
    {
        var token=results.rows.item(0).token;
        postLogout(token);
    }

}

function errorGetToken(err){
//    alert('There was an error processing the SQL: '+err.message);
} 
