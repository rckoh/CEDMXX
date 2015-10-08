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
    var fromPage=getUrlParameter("fromPage");
    
    if(fromPage=="BM")
        getProductDetails(nid, "BM");
    else    
        getProductDetails(nid, "");
}

function sharetoFV()
{
                window.plugins.socialsharing.shareViaFacebook("Test from MMMDDEECC via Facebook", null /* img */, "http://www.joshmorony.com/add-social-sharing-to-a-phonegap-application-facebook-twitter-and-more/" /* url */, function() {alert("share success")}, function(errormsg){alert("error to share"+errormsg)});
}
            
function sharetoFVnormal(){
//    alert("share");
        var imageUrl=document.getElementById("productImg").src
        window.plugins.socialsharing.share('', null, imageUrl, '');
}
            
function sharetoFVios(){
                window.plugins.socialsharing.shareVia('com.apple.social.facebook', 'Message via FB', null, null, null, function(){alert('share ok')}, function(msg) {alert('error: ' + msg)});
}
            
function showDialogFB() { 
                alert("sharedialog");
                facebookConnectPlugin.showDialog( {
                            method: "share",
                            href: 'https://developers.facebook.com/docs/',
                        }, 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
}

var selectedId;
var textboxDisplay=0;
function replyOnClick(sId){
    if(textboxDisplay==0){
        $(".messageDivFrame").show();
        textboxDisplay=1;
        selectedId=sId;
    }
    else if(textboxDisplay==1)
    {
        $(".messageDivFrame").hide();
        textboxDisplay=0;
    }
    else{
        $(".messageDivFrame").show();
        textboxDisplay=1;
        selectedId=sId;
    }
}

function submitReplyMessage(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            var message=$(".replyMessageInput").val();
            var subject=$(".replyMessageSubject").val();
            
            loading.startLoading();
            postNewMessageToUSer(token, uid, "4", selectedId, encode4HTML(message), subject);
        }
    });
}

function checkFav(nid){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            
            PostFavCheck(token, uid, nid, "1");
        }
    });
}

function clickFav(nid){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            
            PostFavCheck(token, uid, nid, "0");
        }
    });
}

