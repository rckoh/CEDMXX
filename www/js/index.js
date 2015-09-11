/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var currentpage=1;
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

function slideshow(data){
    
//    var imga="http://cdn.playbuzz.com/cdn/fdbf1197-18af-43df-a5b1-76d180475700/49081b85-5614-4368-9103-71d9f0651322.jpg";
//    var imgb="http://dreamatico.com/data_images/animals/animals-4.jpg";
//    var imgc="http://thewowstyle.com/wp-content/uploads/2015/04/8589130571841-animal-wallpaper-hd.jpg";
//    var imgd="http://i.telegraph.co.uk/multimedia/archive/02296/animal4c_2296997i.jpg";
//    var imge="http://cdn.playbuzz.com/cdn/279428ca-ddfa-45ce-87b5-53b20c6f3b38/ac4084b3-f55b-4332-83c9-0d411095e812.jpg";
    
    var imga=data.nodes[0].node.background .src;
    var imgb=data.nodes[1].node.background .src;
    var imgc=data.nodes[2].node.background .src;
    var imgd=data.nodes[3].node.background .src;
    var imge=data.nodes[4].node.background .src;
//    alert("cas");
//    if($(".slideshowimage").attr("src")=="img/loading.gif");
    
    var imgname=document.getElementById("slideshowimage").src;
    
    if(imgname==imga){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imgb);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[1].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[1].node.description+"</p>");});
    }
    
    if(imgname==imgb){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imgc);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[2].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[2].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imgc){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imgd);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[3].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[3].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imgd){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imge);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[4].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[4].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imge){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imga);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[0].node.description+"</p>");
        });
    }
}

function slideshowpagetwo(data){
    
    var imga=data.nodes[0].node.background .src;
    var imgb=data.nodes[1].node.background .src;
    var imgc=data.nodes[2].node.background .src;
    var imgd=data.nodes[3].node.background .src;
    var imge=data.nodes[4].node.background .src;
//    if($(".slideshowimage").attr("src")=="img/loading.gif");
    
    var imgname=document.getElementById("slideshowimagepage2").src;

    if(imgname==imga){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imgb);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[1].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[1].node.description+"</p>");});
    }
    
    if(imgname==imgb){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imgc);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[2].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[2].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imgc){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imgd);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[3].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[3].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imgd){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imge);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[4].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[4].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imge){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imga);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[0].node.description+"</p>");
        });
    }
}


function slideshowpagethree(data){
    
    var imga=data.nodes[0].node.background .src;
    var imgb=data.nodes[1].node.background .src;
    var imgc=data.nodes[2].node.background .src;
    var imgd=data.nodes[3].node.background .src;
    var imge=data.nodes[4].node.background .src;
//    if($(".slideshowimage").attr("src")=="img/loading.gif");
    
    var imgname=document.getElementById("slideshowimagepage3").src;

    if(imgname==imga){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imgb);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[1].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[1].node.description+"</p>");});
    }
    
    if(imgname==imgb){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imgc);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[2].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[2].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imgc){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imgd);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[3].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[3].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imgd){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imge);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[4].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[4].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imge){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imga);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[0].node.description+"</p>");
        });
    }
}


function changepage(pagenumber){
    if(pagenumber==1 && currentpage!=pagenumber){
        $(".pageone").show();
        $(".pagetwo").hide();
        $(".pagethree").hide();
        $("#btnFeatured").css("color", "#4be5d9");
        $("#btnLatestPost").css("color", "#32978f");
        $("#btnAnnouncement").css("color", "#32978f");
        
        if(currentpage>pagenumber){
            $(".pageone").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pageone").css("marginLeft", "100%");
        }
        
        $(".pageone").animate({
                marginLeft: "0%",}, 300, function() {currentpage=1;});
        $(".pagetwo").animate({
                marginLeft: "100%",}, 300, function() {});
        $(".pagethree").animate({
                marginLeft: "200%",}, 300, function() {});
        
        $(".selectedItem").animate({
                marginLeft: "0%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
        getFeaturedList();
    
    }
    
    if(pagenumber==2 && currentpage!=pagenumber){
        
        $(".pageone").hide();
        $(".pagetwo").show();
        $(".pagethree").hide();
        $("#btnFeatured").css("color", "#32978f");
        $("#btnLatestPost").css("color", "#4be5d9");
        $("#btnAnnouncement").css("color", "#32978f");
        
        if(currentpage>pagenumber){
            $(".pagetwo").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pagetwo").css("marginLeft", "100%");
        }
        
        $(".pageone").animate({
                marginLeft: "-100%",}, 300, function() {});
        $(".pagetwo").animate({
                marginLeft: "0%",}, 300, function() {currentpage=2;});
        $(".pagethree").animate({
                marginLeft: "100%",}, 300, function() {});
        
        $(".selectedItem").animate({
                marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
        getLatestPostList();
    }
    
    if(pagenumber==3 && currentpage!=pagenumber){
        $(".pageone").hide();
        $(".pagetwo").hide();
        $(".pagethree").show();
        $("#btnFeatured").css("color", "#32978f");
        $("#btnLatestPost").css("color", "#32978f");
        $("#btnAnnouncement").css("color", "#4be5d9");
        
        
        if(currentpage>pagenumber){
            $(".pagethree").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pagethree").css("marginLeft", "100%");
        }
        
        $(".pageone").animate({
                marginLeft: "200%",}, 300, function() {});
        $(".pagetwo").animate({
                marginLeft: "100%",}, 300, function() {});
        $(".pagethree").animate({
                marginLeft: "0%",}, 300, function() {currentpage=3;});
        
        $(".selectedItem").animate({
                marginLeft: "67.25%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
        getAnnouncementList();
    }
}

function initsubmenustyle(){
    currentpage=1;
    $("#btnFeatured").css("color", "#00FFFF");
}

function pageSwipeLeft(){
    if(!menuStatus){
        if(currentpage==1){
            $(".pageone").hide();
            $(".pagetwo").show();
            $(".pagethree").hide();
            $("#btnFeatured").css("color", "#32978f");
            $("#btnLatestPost").css("color", "#4be5d9");
            $("#btnAnnouncement").css("color", "#32978f");

            $(".pagetwo").css("marginLeft", "100%");

            $(".pageone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});
            $(".pagethree").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
            getLatestPostList();
        }
        else if(currentpage==2){
             $(".pageone").hide();
            $(".pagetwo").hide();
            $(".pagethree").show();
            $("#btnFeatured").css("color", "#32978f");
            $("#btnLatestPost").css("color", "#32978f");
            $("#btnAnnouncement").css("color", "#4be5d9");

            $(".pagethree").css("marginLeft", "100%");

            $(".pageone").animate({
                    marginLeft: "200%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "100%",}, 300, function() {});
            $(".pagethree").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=3;});

            $(".selectedItem").animate({
                    marginLeft: "67.25%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
            
            getAnnouncementList();
        }    
    }
    else{
    	$("body").on("swipeleft", function(){
            if (menuStatus){	
            $(".menubg").animate({
                marginLeft: "-70%",
              }, 300, function(){menuStatus = false});
              }
        });
    }
}

function pageSwipeRight(){
    
    if(!menuStatus){
        if(currentpage==3){
            $(".pageone").hide();
            $(".pagetwo").show();
            $(".pagethree").hide();
            $("#btnFeatured").css("color", "#32978f");
            $("#btnLatestPost").css("color", "#4be5d9");
            $("#btnAnnouncement").css("color", "#32978f");

            $(".pagetwo").css("marginLeft", "-100%");

            $(".pageone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});
            $(".pagethree").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
            getLatestPostList();
        }
        else if(currentpage==2){
            $(".pageone").show();
            $(".pagetwo").hide();
            $(".pagethree").hide();
            $("#btnFeatured").css("color", "#4be5d9");
            $("#btnLatestPost").css("color", "#32978f");
            $("#btnAnnouncement").css("color", "#32978f");

            $(".pageone").css("marginLeft", "-100%");

            $(".pageone").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=1;});
            $(".pagetwo").animate({
                    marginLeft: "100%",}, 300, function() {});
            $(".pagethree").animate({
                    marginLeft: "200%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "0%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
            
            getFeaturedList();
        }
    }
}

function itemOnClick(){
    window.location = "productDetailPage.html";
}

function itemOnClickService(){
    window.location = "serviceDetailPage.html";
}

function goInbox(){
    window.location = "inboxPage.html";
}

function checkLoginStatus() {
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(runSelectProfile);
}

function runSelectProfile(t){
    t.executeSql('SELECT * FROM userprofile', [], success, error);
}

function success(t, results){
    if(results.rows.length==0)
    {
        $(".app").prepend("<div class='pagefooter' onclick='goLogin();'>Login</div>");
    }
}
function error(err){
//    alert('There was an error processing the SQL: '+err.message);
}

function initdb(){
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(inittabletransaction, errorinitdb, successinitdb);
}

function inittabletransaction(t) {
    t.executeSql('CREATE TABLE IF NOT EXISTS userprofile (uid text, companyid text,name text, email text, profileImg text, role text, token text)');
}

function errorinitdb(err){
//    alert('Error insert: '+err.message);
    //alert("init Failed.");
}

function successinitdb(){
    //alert('init success');
}


