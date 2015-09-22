var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


function pageSwipeLeft(){
    if(menuStatus){
        $("body").on("swipeleft", function(){
            if (menuStatus){	
            $(".menubg").animate({
                marginLeft: "-70%",
              }, 300, function(){menuStatus = false});
              }
        });
    }
}


function clearSearch(){
    $("#searchTextBox").val("");
}

function loadContent(){
    var nid=getUrlParameter("nid");
    getCompanyDetails(nid);
}

var currentpage=1;
function changepage(pagenumber){
    if(pagenumber==1 && currentpage!=pagenumber){
        
        $(".companyDetailsDescriptionOne").show();
        $(".companyDetailsDescriptionTwo").hide();

        $(".requirementBtn").css("color", "#565656");
        $(".awardsBtn").css("color", "#BDBDBD");
        
        $(".selectedItem").animate({
                marginLeft: "0%",}, 300, function() {});
        
        currentpage=1;
    }
    
    if(pagenumber==2 && currentpage!=pagenumber){
        
       $(".companyDetailsDescriptionOne").hide();
        $(".companyDetailsDescriptionTwo").show();

        $(".requirementBtn").css("color", "#BDBDBD");
        $(".awardsBtn").css("color", "#565656");
        
        $(".selectedItem").animate({
                marginLeft: "50%",}, 300, function() {});
        
        currentpage=2;
    }
}
