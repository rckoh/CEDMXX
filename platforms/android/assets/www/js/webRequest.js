var webUrl = "http://netinfinium.publicvm.com:86/";
var intervalid, intervalidpage2, intervalidpage3;

function getFeaturedList(){
    var requestUrl=webUrl+"drupalgap/getfeatured";
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;        
        $(".scrollul li").remove();
        for (var x = 0; x < data.nodes.length; x++) {    
            if(data.nodes[x].node.type=="productservice"){
                $(".scrollul").append("<li class='scrollli' onclick='viewProductDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title+ "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
            }
            else if(data.nodes[x].node.type=="company"){
                $(".scrollul").append("<li class='scrollli' onclick='' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title+ "(" +data.nodes[x].node.type+")"+ "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
            }
        }
          
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimage").attr("src", data.nodes[0].node.background.src);
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[0].node.description+"</p>");
        window.clearInterval(intervalid);
        intervalid=window.setInterval(function() {
        slideshow(data);
        },5000);
          
        
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert(xhr.status);
        }
    })
}

function getLatestPostList(){
    //alert("webrequst");
    var requestUrl=webUrl+"drupalgap/getlatestpost";
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;
        $(".scrollulPage2 li").remove();
          
        for (var x = 0; x < data.nodes.length; x++) {
            $(".scrollulPage2").append("<li class='scrollliPage2' onclick='viewAnnouncementDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimgPage2' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitlePage2'>" + data.nodes[x].node.title + "</h1><p class='listviewitemseperatorPage2'>&nbsp;</p><p class='listviewitemdetailsPage2'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
        }
         
          
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagepage2").attr("src", data.nodes[0].node.background.src);
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[0].node.description+"</p>");
       
        window.clearInterval(intervalidpage2);
        intervalidpage2=window.setInterval(function() {
        slideshowpagetwo(data);
        },5000);
          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert(xhr.status);
        }
    })
}

function getAnnouncementList(){
    //alert("webrequst");
    var requestUrl=webUrl+"drupalgap/getannouncement";
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;
          
        $(".scrollulPage3 li").remove();  
          
        for (var x = 0; x < data.nodes.length; x++) {
            $(".scrollulPage3").append("<li class='scrollliPage3' onclick='viewAnnouncementDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimgPage3' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitlePage3'>" + data.nodes[x].node.title + "</h1><p class='listviewitemseperatorPage3'>&nbsp;</p><p class='listviewitemdetailsPage3'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");

        }
          
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagepage3").attr("src", data.nodes[0].node.background.src);
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[0].node.description+"</p>");
        
        window.clearInterval(intervalidpage3);  
        intervalidpage3=window.setInterval(function() {
        slideshowpagethree(data);
        },5000);
          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert(xhr.status);
        }
    })
}


function getSearchResultList(key){
    var requestUrl=webUrl+"drupalgap/contentsearch/"+key;
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;
          var returnstr=JSON.stringify(data);
          
        if(data.view.count>0)  
        {
            for (var x = 0; x < data.nodes.length; x++) {
                if(data.nodes[x].node.type=="Product")
                {
                    $(".scrollul").append("<li class='scrollli' id='featuredrow"+x+"'  onclick='viewProductDetails("+data.nodes[x].node.nid+")'><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title + "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
                }
                else if(data.nodes[x].node.type=="Service")
                {
                    $(".scrollul").append("<li class='scrollli' id='featuredrow"+x+"' onclick='viewProductDetails("+data.nodes[x].node.nid+")'><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title + "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
                }
                else if(data.nodes[x].node.type=="Announcement")
                {
                    $(".scrollul").append("<li class='scrollli' id=featuredrow"+x+" onclick='viewAnnouncementDetails("+data.nodes[x].node.nid+")'><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title + "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
                }
            }
        }
        else
        {
            $(".scrollul").append("<li class='' id=featuredrow"+x+"><label class='noresultlbl'> no result found</label></li>");
        }
        
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert(xhr.status);
        }
    })
}

function viewProductDetails(nid){
    window.location = "productDetailPage.html?nid="+nid;
}

function viewServiceDetails(nid){
    window.location = "serviceDetailPage.html?nid="+nid;
}

function viewAnnouncementDetails(nid){
    window.location = "announcementDetailPage.html?nid="+nid;
}

function getProductDetails(nid){
    var requestUrl=webUrl+"drupalgap/getprodservdetail/"+nid;
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;
          var returnstr=JSON.stringify(data);
        for (var x = 0; x < data.nodes.length; x++) {
            var title=data.nodes[x].node.title;
            var imageUrl=data.nodes[x].node.background.src;
            var desc=(data.nodes[x].node.description=="")?"N/A":data.nodes[x].node.description;
            var unidsellingpoint=(data.nodes[x].node.product_unique_selling_point=="")?"N/A":data.nodes[x].node.product_unique_selling_point;
            var custRef=(data.nodes[x].node.customer_reference=="")?"N/A":data.nodes[x].node.customer_reference;
            var brochure=(data.nodes[x].node.brochures=="")?"N/A":"<a class='brouchurelink' href='"+data.nodes[x].node.brochures+"'>"+data.nodes[x].node.brochures+"</a>";
            var tags=(data.nodes[x].node.tags=="")?"N/A":data.nodes[x].node.tags;
            var techarea=(data.nodes[x].node.product_technology_area=="")?"N/A":data.nodes[x].node.product_technology_area;
            var platform=(data.nodes[x].node.platform=="")?"N/A":data.nodes[x].node.platform;
            var prequirement=(data.nodes[x].node.product_requirement=="")?"N/A":data.nodes[x].node.product_requirement;
            var srequirement=(data.nodes[x].node.service_requirement=="")?"N/A":data.nodes[x].node.service_requirement;
            var market=(data.nodes[x].node.market=="")?"N/A":data.nodes[x].node.market;
            var industry=(data.nodes[x].node.product_industry=="")?"N/A":data.nodes[x].node.product_industry;
            var gallery=data.nodes[x].node.gallery;
            var scategory=(data.nodes[x].node.service_category=="")?"N/A":data.nodes[x].node.service_category;
            var ssubcat=(data.nodes[x].node.service_sub_category=="")?"N/A":data.nodes[x].node.service_sub_category;
            
            if(data.nodes[x].node.type=="Product"){
                $(".scrollul").append("<li class='scrollli'><h1 id='companyName'>"+title+"</h1><p class='pBtn'><button><img src='img/share%20alt.png'/></button>&nbsp;<button><img src='img/fav-alt.png'/></button>&nbsp;</p><br><p><img id='productImg' src='"+ imageUrl +"'/></p><p class='seperator'>&nbsp;</p><br><p class='description'>"+ desc +"</p><p class='seperator'>&nbsp;</p><h2>Unique Selling Point</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+unidsellingpoint+"</p><h2>Customer References</h2><p class='h2seperator'>&nbsp;</p><p class='description'>" +custRef+"</p><h2>Brochures</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+brochure+"</p><h2>Tags</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+tags+"</p><h2>Technology Area</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+techarea+"</p><h2>Platforms</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+platform+"</p><h2>Product Requirement</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+prequirement+"</p><h2>Market</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+market+" </p><h2>Industry</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+industry+"</p><h2>Gallery</h2><p class='h2seperator'>&nbsp;</p><br><p class='description'></p><p><br><br></p></li>");
            }
            else if(data.nodes[x].node.type=="Service"){
                $(".scrollul").append("<li class='scrollli'><h1 id='companyName'>"+title+"</h1><p class='pBtn'><button><img src='img/share%20alt.png'/></button>&nbsp;<button><img src='img/fav-alt.png'/></button>&nbsp;</p><br><p><img id='productImg' src='"+imageUrl+"'/></p><p class='seperator'>&nbsp;</p><br><p class='description'>"+desc+"</p><p class='seperator'>&nbsp;</p><h2>Customer References</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+custRef+"</p><h2>Brochures</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+brochure+"</p><h2>Tags</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+tags+"</p><h2>Platforms</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+platform+"</p><h2>Service Requirement</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+srequirement+"</p><h2>Market</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+market+"</p><h2>Service Category</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+scategory+"</p><h2>Service Sub Category</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+ssubcat+"</p><h2>Gallery</h2><p class='h2seperator'>&nbsp;</p><br><p class='description'></p><p><br><br></p></li>");
            }
            
//            <img id='galleryImg' src='"+data.nodes[x].node.gallery+"'/>
        }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert(xhr.status);
        }
    })
}

function getAnnouncementDetails(nid){
    var requestUrl=webUrl+"drupalgap/getpostdetail/"+nid;
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;

        var title=data.nodes[0].node.title;
          
        var imageUrl=data.nodes[0].node.background.src;
        var desc=(data.nodes[0].node.description=="")?"N/A":data.nodes[0].node.description;
          
        $(".scrollul").append("<li class='scrollli'><h1 id='companyName'>"+title+"</h1><br><p><img id='productImg' src='"+imageUrl+"'/></p><p class='seperator'>&nbsp;</p><br><p class='description'>"+desc+"</p><p><br><br></p></li>");
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert(xhr.status);
        }
    })
}

function getFavouriteList(uid){
    var requestUrl=webUrl+"drupalgap/getfavourite/"+uid;
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;   
        $(".scrollul li").remove();
        for (var x = 0; x < data.nodes.length; x++) {    
            if(data.nodes[x].node.type=="Product" || data.nodes[x].node.type=="Service"){
                $(".scrollul").append("<li class='scrollli' onclick='viewProductDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title+ "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
            }
            else if(data.nodes[x].node.type=="Company"){
                $(".scrollul").append("<li class='scrollli' onclick='' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title+ "(" +data.nodes[x].node.type+")"+ "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
            }
        }
          
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimage").attr("src", data.nodes[0].node.background.src);
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[0].node.description+"</p>");
        window.clearInterval(intervalid);
        intervalid=window.setInterval(function() {
        slideshow(data);
        },5000);
          
        
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("Unable connect to server.");
        }
    })
}

function requestCompanyProfile(companyid){
    var requestUrl=webUrl+"?q=services/session/token";
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;
        var sessionToken=JSON.stringify(data);
        postCompanyProfile(companyid,sessionToken);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          if(xhr.status==0)
            alert("Unable connect to server." + xhr.responseText);
          
        }
    })
}

function postCompanyProfile(companyid, token){
    var requestUrl=webUrl+"drupalgap/mobileapp/companyprofile.json?nid="+companyid;
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token
      },
      success: function(data, status, xhr) {
        debugger;
        var newJsonObj=$.parseJSON(data);
        
        var numberofview=newJsonObj.total_view;
        var numberoffav=newJsonObj.total_favourite;
        var numberofshare=newJsonObj.total_share;
        
        $("#lblviewnumber").text(numberofview);
        $("#lblfavnumber").text(numberoffav);
        $("#lblsharenumber").text(numberofshare);
        
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("Unable connect to server." + xhr.responseText);
        }
    })
}


function requestUserPoint(uid){
    var requestUrl=webUrl+"?q=services/session/token";
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;
        var sessionToken=JSON.stringify(data);
        postUserPoint(uid,sessionToken);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          if(xhr.status==0)
            alert("Unable connect to server." + xhr.responseText);
          
        }
    })
}

function postUserPoint(uid, token){
    var requestUrl=webUrl+"drupalgap/mobileapp/userpoints.json?uid="+uid;
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token
      },
      success: function(data, status, xhr) {
        debugger;
        var newJsonObj=$.parseJSON(data);

        var numberofearn=newJsonObj.total_earned;
        var numberofredeem=newJsonObj.total_redeemed;
        var numberofbalance=newJsonObj.totalbalanced;
        
        $("#lblpointearn").text(numberofearn+" Points");
        $("#lblpointredeem").text(numberofredeem+" Points");
        $("#lblpointbalance").text(numberofbalance+ " Points");
        
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("Unable connect to server." + xhr.responseText);
        }
    })
}

function getProfileProdServList(companyid){
    var requestUrl=webUrl+"drupalgap/getprodservlist/"+companyid;
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;        
        $(".scrollulPage2 li").remove();
        for (var x = 0; x < data.nodes.length; x++) {    
            $(".scrollulPage2").append("<li class='scrollliPage2' onclick='viewProductDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimgPage2' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitlePage2'>" + data.nodes[x].node.title+ "</h1><p class='listviewitemseperatorPage2'>&nbsp;</p><p class='listviewitemdetailsPage2'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
        }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("Unable connect to server." + xhr.responseText);
        }
    })
}

function requestLogin(username, password){
    var requestUrl=webUrl+"?q=services/session/token";
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;
        var sessionToken=JSON.stringify(data);
        postLogin(sessionToken, username, password);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          if(xhr.status==0)
            alert("Unable connect to server."); 
          
        }
    })
}

function postLogin(token, username, password){
    var requestUrl=webUrl+"drupalgap/user/login";
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRF-Token":token
      },
      data:"username=" + username + "&password="+password,
      success: function(data, status, xhr) {
        debugger;
        var uid=data.user.uid;
        var name=data.user.name;
        var email=data.user.mail;
        var profileimg=data.user.picture.url;
        var role="";
        var companyid=data.user.field_company_id_user.und[0].target_id;  
          
        $.each(data.user.roles , function(key , value){ // First Level
            if(role=="")
                role=role+key.toString()
            else
                role=role+","+key.toString();
        });
        
        storeProfile(uid, companyid, name, email, profileimg, role, token);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          if(xhr.status==0)
            alert("Unable connect to server.");      
          else
            alert("Invalid username or password");
          
          endLoading();
        }
    })
}

function storeProfile(uid, companyid, name, email, profileimg, role, token) {
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    var profile = {
    values1 : [uid, companyid, name, email, profileimg, role, token]
    };

    insertProfile(profile);
    
    function insertProfile(profile) {
        db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS userprofile');
            tx.executeSql('CREATE TABLE IF NOT EXISTS userprofile (uid text, companyid text,name text, email text, profileImg text, role text, token text)');
            tx.executeSql('DELETE FROM userprofile');
            tx.executeSql(
                'INSERT INTO userprofile (uid, companyid, name, email, profileImg, role, token) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                profile.values1,
                successLogin,
                errorLogin
            );
        });
    }
}

function errorLogin(err){
//    alert('Error insert: '+err.message);
    alert("Login Failed.");
    endLoading();
}

function successLogin(){
//    alert('insert success');
    endLoading();
    window.location="index.html";
}


function requestLogout(){
    var requestUrl=webUrl+"?q=services/session/token";
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data, status, xhr) {
        debugger;
        var sessionToken=JSON.stringify(data);
        postLogout(sessionToken);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          if(xhr.status==0)
            alert("Unable connect to server."); 
          
        }
    })
}


function postLogout(token){
    var requestUrl=webUrl+"drupalgap/user/logout";
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token
      },
      success: function(data, status, xhr) {
        debugger;
//          var returnstr=JSON.stringify(data);
//          alert(data);
        deleteProfile();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          
          alert("Logout failed.serv" +xhr.responseText);
          
          endLoading();
        }
    })
}


function deleteProfile() {
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(runDeleteProfile);
}

function runDeleteProfile(t){
    t.executeSql('DELETE FROM userprofile', successDeleteProfile, errorDeleteProfile);
}

  
function errorDeleteProfile(err){
//    alert('Error insert: '+err.message);
    endLoading();
    alert("Logout Failed. db");
}

function successDeleteProfile(){
    endLoading();
    alert("Logout Succesfully");
    window.location="index.html";
}

                        
                        