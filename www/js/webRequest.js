var webUrl = "http://netinfinium.publicvm.com:86/";
var intervalid, intervalidpage2, intervalidpage3;
var apiTimeout=20000;

function getDMZKey(){
    var requestUrl=webUrl+"api_generator.php?api_name=mobile_validation&key=34716a5e9f9e23f40acadd9dd55e0c22";
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Corrad-Api-Key": "NICMAMDEC"
      },
      async: false, 
      data:"api_name=session&key1=ps2ds&key2=esolutions",
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;    
        
        var newJsonObj=$.parseJSON(data);
        var baseurl, dmzkey;
        $.each(newJsonObj, function(key, value){
            if(key=='api-url')
                baseurl=value;
            else if(key=='key')
                dmzkey=value
        });
        
        storeDMZKey(dmzkey, baseurl);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
        //alert("fail get dmz key");  
      }
    })
}

function storeDMZKey(dmzKey, baseurl){
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    var dmz = {
    values1 : [dmzKey, baseurl]
    };
    
    insertDmzKey(dmz);
    
    function insertDmzKey(dmz) {
        db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS DMZKEYSLOT');
            tx.executeSql('CREATE TABLE IF NOT EXISTS DMZKEYSLOT (DMZKEY text, BASEURL text)');
            tx.executeSql('DELETE FROM DMZKEYSLOT');
            tx.executeSql(
                'INSERT INTO DMZKEYSLOT (DMZKEY, BASEURL) VALUES (?,?)', 
                dmz.values1,
                successStoreDMZKey,
                erroStoreDMZKey
            );
        });
    }
}

function successStoreDMZKey(){
    //alert("success get fmz key");
}

function erroStoreDMZKey(err){
    //alert("fail get fmz key");
}

function getFeaturedList(){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/getfeatured";
    
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
        $(".scrollul li").remove();
        for (var x = 0; x < data.nodes.length; x++) {    
            if(data.nodes[x].node.type=="productservice"){
                $(".scrollul").append("<li class='scrollli' onclick='viewProductDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title+ "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
            }
            else if(data.nodes[x].node.type=="company"){
                $(".scrollul").append("<li class='scrollli' onclick='viewCompanyDetails("+data.nodes[x].node.nid+")' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title+ "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
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
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
}); 
}

function getLatestPostList(){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    //alert("webrequst");
    var requestUrl=baseurl+"drupalgap/getlatestpost";
    
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
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
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function getAnnouncementList(){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    //alert("webrequst");
    var requestUrl=baseurl+"drupalgap/getannouncement";
    
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
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
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}


function getSearchResultList(key){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/contentsearch/"+key;
    
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
          var returnstr=JSON.stringify(data);
          
        if(data.view.count>0)  
        {
            $(".scrollul").append("<li class='scrollliresult'><br><span class='resultnumber'>"+addCommas(data.view.count)+" results&nbsp;</span><br></li>");
            
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
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
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

function viewCompanyDetails(nid){
    window.location = "companyDetailPage.html?nid="+nid;
}

function getProductDetails(nid, fromPage){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/getprodservdetail/"+nid;
    if(fromPage=="BM")
        requestUrl=baseurl+"drupalgap/bmgetprodservdetail/"+nid;
    
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
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
                $(".scrollul").append("<li class='scrollli'><h1 id='companyName'>"+title+"</h1><p class='pBtn'><button onclick='sharetoFVnormal();'><img src='img/share%20alt.png'/></button>&nbsp;<button onclick='clickFav("+nid+")'><img src='img/fav-alt.png' id='shareImg'/></button>&nbsp;<button onclick='replyOnClick("+nid+")'><img src='img/message-alt.png'/></button></p><br><p><img id='productImg' src='"+ imageUrl +"'/></p><p class='seperator'>&nbsp;</p><br><p class='description'>"+ desc +"</p><p class='seperator'>&nbsp;</p><h2>Unique Selling Point</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+unidsellingpoint+"</p><br><h2>Customer References</h2><p class='h2seperator'>&nbsp;</p><p class='description'>" +custRef+"</p><br><h2>Brochures</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+brochure+"</p><br><h2>Tags</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+tags+"</p><br><h2>Technology Area</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+techarea+"</p><br><h2>Platforms</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+platform+"</p><br><h2>Product Requirement</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+prequirement+"</p><br><h2>Market</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+market+" </p><br><h2>Industry</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+industry+"</p><br><h2>Gallery</h2><p class='h2seperator'>&nbsp;</p><br><p class='description'></p><p><br><br></p></li>");
            }
            else if(data.nodes[x].node.type=="Service"){
                $(".scrollul").append("<li class='scrollli'><h1 id='companyName'>"+title+"</h1><p class='pBtn'><button onclick='sharetoFVnormal();'><img src='img/share%20alt.png'/></button>&nbsp;<button onclick='clickFav("+nid+")'><img src='img/fav-alt.png' id='shareImg'/></button>&nbsp;<button onclick='replyOnClick("+nid+")'><img src='img/message-alt.png'/></button></p><br><p><img id='productImg' src='"+imageUrl+"'/></p><p class='seperator'>&nbsp;</p><br><p class='description'>"+desc+"</p><p class='seperator'>&nbsp;</p><h2>Customer References</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+custRef+"</p><br><h2>Brochures</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+brochure+"</p><br><h2>Tags</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+tags+"</p><br><h2>Platforms</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+platform+"</p><br><h2>Service Requirement</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+srequirement+"</p><br><h2>Market</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+market+"</p><br><h2>Service Category</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+scategory+"</p><br><h2>Service Sub Category</h2><p class='h2seperator'>&nbsp;</p><p class='description'>"+ssubcat+"</p><br><h2>Gallery</h2><p class='h2seperator'>&nbsp;</p><br><p class='description'></p><p><br><br></p></li>");
            }
            
//            <img id='galleryImg' src='"+data.nodes[x].node.gallery+"'/>
        }
          
        dbmanager.getProfile(function(returnData){
                if(returnData.rows.length>0){
                    $(".pBtn button:nth-child(2)").show();
                    $(".pBtn button:nth-child(3)").show();
                    checkFav(nid);
                }
        });
        
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function getAnnouncementDetails(nid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/getpostdetail/"+nid;
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;

        var title=data.nodes[0].node.title;
          
        var imageUrl=data.nodes[0].node.background.src;
        var desc=(data.nodes[0].node.description=="")?"N/A":data.nodes[0].node.description;
          
        $(".scrollul").append("<li class='scrollli'><h1 id='companyName'>"+title+"</h1><br><p><img id='productImg' src='"+imageUrl+"'/></p><p class='seperator'>&nbsp;</p><br><p class='description'>"+desc+"</p><p><br><br></p></li>");
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}


function getCompanyDetails(nid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/getcompanydetail/"+nid;
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
          var returnstr=JSON.stringify(data);
          
          var title=data.nodes[0].node.title;
          var imageUrl=data.nodes[0].node.image.src;
          var desc=data.nodes[0].node.description;
          var address=data.nodes[0].node.address;
          var wesiteUrl=(data.nodes[0].node.website_url=="")?"N/A":"<a class='brouchurelink' href='"+data.nodes[0].node.website_url+"'>"+data.nodes[0].node.website_url+"</a>";
          var requirement=(data.nodes[0].node.requirement=="")?"N/A":data.nodes[0].node.requirement;
          var awards=(data.nodes[0].node.award=="")?"N/A":data.nodes[0].node.award;
          
          $(".scrollul").append(
            "<li class='scrollli'><br><p class='lipclass'><img id='productImg' src='"+imageUrl+"'/></p><p class='lineseperator'>&nbsp;</p><br><h1 id='companyName' class='lih1class'>"+title+"</h1><p class='description'> "+desc+"<br><br><table class='companyInfo'><tr><td><span>Address</span></td><td><span>:</span></td><td><span>"+address+"</span> </td></tr><tr><td><span>Website URL</span></td><td><span>:</span></td><td><span>"+wesiteUrl+"</span> </td></tr></table></p><p class='seperator'>&nbsp;</p><p class='description'><span class='buttonSpan'><button onclick='sharetoFVnormal();'><img src='img/share%20alt.png'/></button>&nbsp;<button onclick='clickFav("+nid+")'><img src='img/fav-alt.png' id='shareImg'/></button>&nbsp;<button onclick='replyOnClick("+nid+")'><img src='img/message-alt.png'/></button></span><table class='companyStatistic'><tr><td>Views</td><td>:</td><td>0</td></tr><tr><td>Shares</td><td>:</td><td>0</td></tr><tr><td>Favourites</td><td>:</td><td>0</td></tr></table></p><p class='seperator'>&nbsp;</p><br><div class='companyDetails'><div class='requirement'><button class='requirementBtn' onclick='changepage(1);'>Company Requirement</button></div><div class='awards'><button class='awardsBtn' onclick='changepage(2);'>Company Awards</button></div><div class='selectedItem'>&nbsp;</div><div class='companyDetailsDescriptionOne'>"+requirement+"</div><div class='companyDetailsDescriptionTwo'>"+awards+"</div></div><br><h2 class='lih2class'>Announcement</h2><ul class='scrollul' id='scrollulAnnouncement'></ul><br><h2 class='lih2class'>Products and Services</h2><ul class='scrollul' id='scrollulProdServ'></ul></li>"
          );
          
          dbmanager.getProfile(function(returnData){
                if(returnData.rows.length>0){
                    $(".buttonSpan button:nth-child(2)").show();
                    $(".buttonSpan button:nth-child(3)").show();
                    checkFav(nid);
                }
          });
          
          getCompanyProdServList(nid);
          getCompanyAnnouncementList(nid);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}


function getCompanyProdServList(companyid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/getprodservlist/"+companyid;
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
        $("#scrollulProdServ li").remove();
        for (var x = 0; x < data.nodes.length; x++) {    
            $("#scrollulProdServ").append("<li class='scrollliChild' onclick='viewProductDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitlechild'>" + data.nodes[x].node.title+ "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
        }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function getCompanyAnnouncementList(nid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
     //alert("webrequst");
    var requestUrl=baseurl+"drupalgap/getannouncement/"+nid;
    
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
          
        $("#scrollulAnnouncement li").remove();  
          
        for (var x = 0; x < data.nodes.length; x++) {
            $("#scrollulAnnouncement").append("<li class='scrollliChild' onclick='viewAnnouncementDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitlechild'>" + data.nodes[x].node.title + "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");

        }          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});   
}


function getFavouriteList(uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/getfavourite/"+uid;
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;   
        $(".scrollul li").remove();

        $(".scrollul").append("<li class='scrollliresult'><br><span class='resultnumber'>"+addCommas(data.view.count)+" results&nbsp;</span><br></li>");
          
        for (var x = 0; x < data.nodes.length; x++) {    
            if(data.nodes[x].node.type=="Product" || data.nodes[x].node.type=="Service"){
                $(".scrollul").append("<li class='scrollli' onclick='viewProductDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title+ "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
            }
            else if(data.nodes[x].node.type=="Company"){
                $(".scrollul").append("<li class='scrollli' onclick='viewCompanyDetails("+data.nodes[x].node.nid+")' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitle'>" + data.nodes[x].node.title + "</h1><p class='listviewitemseperator'>&nbsp;</p><p class='listviewitemdetails'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
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
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});
}



function postCompanyProfile(companyid, token, page){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY;
    var baseurl=data.item(0).BASEURL; 

    var requestUrl=baseurl+"drupalgap/mobileapp/companyprofile.json?nid="+companyid;
    
    $.ajax({
      url: requestUrl,
      type: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        var newJsonObj=$.parseJSON(data);
          
        var numberofview=newJsonObj.total_view;
        var numberoffav=newJsonObj.total_favourite;
        var numberofshare=newJsonObj.total_share;
        var backgroundImg=newJsonObj.background;
        
        
        $("#lblviewnumber").text(numberofview);
        $("#lblfavnumber").text(numberoffav);
        $("#lblsharenumber").text(numberofshare);
        $(".profileBG").attr("src", backgroundImg);
          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});
}


function postUserPoint(uid, token){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/userpoints.json?uid="+uid;
    $.ajax({
      url: requestUrl,
      type: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        var newJsonObj=$.parseJSON(data);
        var numberofearn=newJsonObj.total_earned;
        var numberofredeem=newJsonObj.total_redeemed;
        var numberofbalance=newJsonObj.totalbalanced;
          
        if(numberofbalance==null)
            numberofbalance=0;
          
        if(numberofearn==null)
            numberofearn=0;
          
        if(numberofearn==null)
            numberofearn=0;
          
        $("#lblpointearn").text(numberofearn+" Points");
        $("#lblpointredeem").text(numberofredeem+" Points");
        $("#lblpointbalance").text(numberofbalance+ " Points");
        
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});
}

function getProfileProdServList(companyid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/getprodservlist/"+companyid;
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
        $(".scrollulPage2 li").remove();
        for (var x = 0; x < data.nodes.length; x++) {    
            $(".scrollulPage2").append("<li class='scrollliPage2' onclick='viewProductDetails("+data.nodes[x].node.nid+");' id=featuredrow"+x+"><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimgPage2' src='" + data.nodes[x].node.image.src +"'></td><td><h1 class='listviewitemtitlePage2'>" + data.nodes[x].node.title+ "</h1><p class='listviewitemseperatorPage2'>&nbsp;</p><p class='listviewitemdetailsPage2'>" + data.nodes[x].node.description + "</p></td></tr></table></li>");
        }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function requestLogin(username, password){  
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"?q=services/session/token";
    
    $.ajax({
      url: requestUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        var sessionToken=JSON.stringify(data);
        postLogin(sessionToken, username, password);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
          
          loading.endLoading();
        }
    })
});    
}

function postLogin(token, username, password){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/user/login";

    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      data:"username=" + username + "&password="+password,
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        var returnstr=JSON.stringify(data);
//        alert(returnstr);
          
        var uid=data.user.uid;
        var name=data.user.name;
        var email=data.user.mail;
        var profileimg=data.user.picture.url;
        var role="";
        var companyid=data.user.field_company_id_user.und[0].target_id;  
        var sessionToken=data.token;
        $.each(data.user.roles , function(key , value){ // First Level
            if(role=="")
                role=role+key.toString()
            else
                role=role+","+key.toString();
        });
        
        storeProfile(uid, companyid, name, email, profileimg, role, sessionToken);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          if(xhr.status==0)
            navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
          else
            navigator.notification.alert("Invalid username or password.", function(){}, "MDeC eSolution", "Ok");
          
          loading.endLoading();
        }
    })
});
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
    navigator.notification.alert("Login failed.", function(){}, "MDeC eSolution", "Ok");
    loading.endLoading();
}

function successLogin(){
//    alert('insert success');
    loading.endLoading();
    window.location="index.html";
}



function postLogout(token){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/user/logout";
    $.ajax({
      url: requestUrl,
      type: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        deleteProfile();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
        
        deleteProfile();
//          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
          
//          loading.endLoading();
        }
    })
});
}


function deleteProfile() {
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(runDeleteProfile, errorDeleteProfile, successDeleteProfile);
}

function runDeleteProfile(t){
    t.executeSql('DELETE FROM userprofile');
}

  
function errorDeleteProfile(err){
    loading.endLoading();
    navigator.notification.alert("Logout failed.", function(){}, "MDeC eSolution", "Ok");
}

function successDeleteProfile(){
    loading.endLoading();
    navigator.notification.alert("Logout succesfully", function(){}, "MDeC eSolution", "Ok");
    window.location="index.html";
}


function postListingProductList(token, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/getListingResult.json?type=product";
    
    if(uid!="")
        requestUrl=requestUrl+"&uid="+uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
    
        $(".scrollulLVM li").remove();
        //for (var x = 0; x < data.results.length; x++) { 
        for (var x = 0; x < data.results.length; x++) { 
                    $(".scrollulLVM").append("<li class='scrollliLVM' onclick='viewProductDetails("+data.results[x].result.nid+")'><table class='listviewitemframeLVM'><tr><td style='width:20%'><img class='listviewimgLVM' src='"+data.results[x].result.image+"'></td><td><h1 class='listviewitemtitleLVM'>"+data.results[x].result.title+"</h1><p class='listviewitemseperatorLVM'>&nbsp;</p><p class='listviewitemdetailsLVM'>"+data.results[x].result.description+"</p></td></tr></table></li>");
        }          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}


function postSearchListingProductList(token, productName, productCompany, gst, industry, techArea, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/getListingResult.json?type=product&title="+productName+"&company="+productCompany+"&gst="+gst+"&ind="+industry+"&tech="+techArea;
    
    if(uid!="")
        requestUrl=requestUrl+"&uid="+uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
//        alert(JSON.stringify(data))
        $(".scrollulLVM li").remove();
        
        $(".scrollulLVM").append("<li class='scrollliresult'><br><span class='resultnumber'>"+addCommas(data.view[0].count)+" results&nbsp;</span><br></li>");
        //for (var x = 0; x < data.results.length; x++) { 
        for (var x = 0; x < data.results.length; x++) { 
                    $(".scrollulLVM").append("<li class='scrollliLVM' onclick='viewProductDetails("+data.results[x].result.nid+")'><table class='listviewitemframeLVM'><tr><td style='width:20%'><img class='listviewimgLVM' src='"+data.results[x].result.image+"'></td><td><h1 class='listviewitemtitleLVM'>"+data.results[x].result.title+"</h1><p class='listviewitemseperatorLVM'>&nbsp;</p><p class='listviewitemdetailsLVM'>"+data.results[x].result.description+"</p></td></tr></table></li>");
        }          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}



function postListingServiceList(token, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/getListingResult.json?type=service";
    
    if(uid!="")
        requestUrl=requestUrl+"&uid="+uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        $(".scrollulLVMPG2 li").remove();
        //for (var x = 0; x < data.results.length; x++) { 
        for (var x = 0; x < data.results.length; x++) { 
                    $(".scrollulLVMPG2").append("<li class='scrollliLVMPG2' onclick='viewProductDetails("+data.results[x].result.nid+")'><table class='listviewitemframeLVMPG2'><tr><td style='width:20%'><img class='listviewimgLVMPG2' src='"+data.results[x].result.image+"'></td><td><h1 class='listviewitemtitleLVMPG2'>"+data.results[x].result.title+"</h1><p class='listviewitemseperatorLVMPG2'>&nbsp;</p><p class='listviewitemdetailsLVMPG2'>"+data.results[x].result.description+"</p></td></tr></table></li>");
        }          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
}); 
}

function postSearchListingServiceList(token, serviceName, serviceCompany, cat, subcat, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/getListingResult.json?type=service&title="+serviceName+"&company="+serviceCompany+"&cat="+cat+"&subcat="+subcat;
    
    
    if(uid!="")
        requestUrl=requestUrl+"&uid="+uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        $(".scrollulLVMPG2 li").remove();
          
        $(".scrollulLVMPG2").append("<li class='scrollliresult'><br><span class='resultnumber'>"+addCommas(data.view[0].count)+" results&nbsp;</span><br></li>");
          
        //for (var x = 0; x < data.results.length; x++) { 
        for (var x = 0; x < data.results.length; x++) { 
                    $(".scrollulLVMPG2").append("<li class='scrollliLVMPG2' onclick='viewProductDetails("+data.results[x].result.nid+")'><table class='listviewitemframeLVMPG2'><tr><td style='width:20%'><img class='listviewimgLVMPG2' src='"+data.results[x].result.image+"'></td><td><h1 class='listviewitemtitleLVMPG2'>"+data.results[x].result.title+"</h1><p class='listviewitemseperatorLVMPG2'>&nbsp;</p><p class='listviewitemdetailsLVMPG2'>"+data.results[x].result.description+"</p></td></tr></table></li>");
        }          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function postProductSearchCriteria(token, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/getListingSearchCriteria.json?type=product";
    
    if(uid!="")
        requestUrl=requestUrl+"&uid="+uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        $("#filterProductTechArea option").remove();
        $("#filterProductIndustry option").remove();
        $("#filterProductGST option").remove();
        
        $("#filterProductTechArea").append($("<option></option>").attr("value","").text("Any"));
        $("#filterProductIndustry").append($("<option></option>").attr("value","").text("Any"));
        $("#filterProductGST").append($("<option></option>").attr("value","").text("Any"));
          
        for(var x=0; x<data.technology_area.length; x++){     
            var optionValue=data.technology_area[x].tech.value;
            var displayname=data.technology_area[x].tech.display_name;
            $("#filterProductTechArea").append($("<option></option>").attr("value",optionValue).text(displayname));
        }
        
        for(var x=0; x<data.industry_area.length; x++){
            var optionValue=data.industry_area[x].industry.value;
            var displayname=data.industry_area[x].industry.display_name;
            $("#filterProductIndustry").append($("<option></option>").attr("value",optionValue).text(displayname));
        }
        
        for(var x=0; x<data.gst_compliance.length; x++){
            var optionValue=data.gst_compliance[x].gst.value;
            var displayname=data.gst_compliance[x].gst.display_name;
            $("#filterProductGST").append($("<option></option>").attr("value",optionValue).text(displayname));
        }  
        loading.endLoading();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function postServiceSearchCriteria(token, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/getListingSearchCriteria.json?type=service";
    
    if(uid!="")
        requestUrl=requestUrl+"&uid="+uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        $("#filterServiceCategory option").remove();
        
        $("#filterServiceCategory").append($("<option></option>").attr("value","").text("Any"));
          
        for(var x=0; x<data.service_category.length; x++){     
            var optionValue=data.service_category[x].category.value+"|"+data.service_category[x].category.sub_key;
            var displayname=data.service_category[x].category.display_name;
            $("#filterServiceCategory").append($("<option></option>").attr("value",optionValue).text(displayname));
        }
        
        $("#filterServiceSubCategory").append($("<option></option>").attr("value","").text("Any"));
//        postServiceSearchCriteriaSubCategory(token, data.service_category[0].category.sub_key, uid);
        loading.endLoading();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}


function postServiceSearchCriteriaSubCategory(token, category, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/getListingSearchCriteria.json?type=service&cat="+category;
    
    if(uid!="")
        requestUrl=requestUrl+"&uid="+uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        $("#filterServiceSubCategory option").remove();

        for(var x=0; x<data.sub_category.length; x++){     
            var optionValue=data.sub_category[x].sub.value;
            var displayname=data.sub_category[x].sub.display_name;
            $("#filterServiceSubCategory").append($("<option></option>").attr("value",optionValue).text(displayname));
        }

        loading.endLoading();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});   
}


function postBMProductFilterCriteria(token, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/businessmatchesfilters.json?interestData=Product";
    
    if(uid!="")
        requestUrl=requestUrl+"&uid=" + uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        

        $("#filterProductLoookFor option").remove();
        $("#filterProductInterest option").remove();
        $("#filterProductTechArea option").remove();
        $("#filterProductIndustryArea option").remove();
          
        for(var x=0; x<data.rolesData.length; x++){     
            var optionValue=data.rolesData[x].role.value;
            var displayname=data.rolesData[x].role.display_name;
            $("#filterProductLoookFor").append($("<option></option>").attr("value",optionValue).text(displayname));
        }

        for(var x=0; x<data.interestData.length; x++){    
            $.each(data.interestData[0], function(key, value){
              $.each(value, function(key, value){
                var optionValue=value.value;
                var displayname=value.display_name;
                $("#filterProductInterest").append($("<option></option>").attr("value",optionValue).text(displayname)); 
                });
            });
        }
          
        for(var x=0; x<data.technologyData.technology_area.length; x++){     
            var optionValue=data.technologyData.technology_area[x].tech.value;
            var displayname=data.technologyData.technology_area[x].tech.display_name;
            $("#filterProductTechArea").append($("<option></option>").attr("value",optionValue).text(displayname));
        }
          
        for(var x=0; x<data.technologyData.industry_area.length; x++){     
            var optionValue=data.technologyData.industry_area[x].industry.value;
            var displayname=data.technologyData.industry_area[x].industry.display_name;
            $("#filterProductIndustryArea").append($("<option></option>").attr("value",optionValue).text(displayname));
        }
        
        if($("#filterServiceInterest").val()!=null){
            $("#filterProductInterest").val($("#filterServiceInterest").val());
            $("#filterProductLoookFor").val($("#filterServiceLookFor").val());
            $("#filterProductKeyword").val($("#filterServiceKeyword").val());
        }
          
        loading.endLoading();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}


function postFilterProductList(token, uid, submitted, lookFor, keyword, interest, industryArea, techArea){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/businessmatches.json?uid="+uid+"&submitted="+submitted+"&rolesData="+lookFor+"&keywordsData="+keyword+"&interestData="+interest+"&technologyData="+techArea+"& industryData="+industryArea;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
//          alert(returnstr);
        $(".scrollulRM li").remove();

        $(".scrollulRM").append("<li class='scrollliresult'><br><span class='resultnumber'>"+addCommas(data.view.count)+" results&nbsp;</span><br></li>");
          
        for (var x = 0; x < data.results.length; x++) { 
            if(data.results[x].type=="product" || data.results[x].type=="service"){
                $(".scrollulRM").append("<li class='scrollliRM' onclick='viewProductDetailsBM("+data.results[x].nid+")'><table class='listviewitemframeRM'><tr><td style='width:20%'><img class='listviewimgRM' src='"+data.results[x].image+"'></td><td><h1 class='listviewitemtitleRM'>"+data.results[x].title+"</h1><p class='listviewitemseperatorRM'>&nbsp;</p><p class='listviewitemdetailsRM'>"+data.results[x].description+"</p></td></tr></table></li>");
            }
            else{
                $(".scrollulRM").append("<li class='scrollliRM' onclick='replyOnClick("+data.results[x].uid+")'><table class='listviewitemframeRM'><tr><td style='width:20%'><img class='listviewimgRM' src='img/buyer.png'></td><td><h1 class='listviewitemtitleRM'>"+data.results[x].name+"</h1><p class='listviewitemseperatorRM'>&nbsp;</p><p class='listviewitemdetailsRM'>"+data.results[x].roles+"</p></td></tr></table></li>");
            }
        }            
          
        loading.endLoading();
                  
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function viewProductDetailsBM(nid){
    window.location = "productDetailPage.html?nid="+nid+"&fromPage=BM";
}

function postLVMProductList(token, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/bmRecentViewed.json?uid="+uid;
//    alert(uid);
//    alert(token);
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        
        var returnstr=JSON.stringify(data);
//        alert(returnstr);
        
$(".scrollulLVM li").remove();

        for (var x = 0; x < data.length; x++) { 
            if(data[x].type=="product" || data[x].type=="service"){
                $(".scrollulLVM").append("<li class='scrollliLVM' onclick='viewProductDetailsBM("+data[x].nid+")'><table class='listviewitemframeLVM'><tr><td style='width:20%'><img class='listviewimgLVM' src='"+data[x].image+"'></td><td><h1 class='listviewitemtitleLVM'>"+data[x].title+"</h1><p class='listviewitemseperatorLVM'>&nbsp;</p><p class='listviewitemdetailsLVM'>"+data[x].description+"</p></td></tr></table></li>");
            }
            else{
                $(".scrollulLVM").append("<li class='scrollliLVM' onclick='replyOnClick("+data[x].uid+")'><table class='listviewitemframeLVM'><tr><td style='width:20%'><img class='listviewimgLVM' src='img/buyer.png'></td><td><h1 class='listviewitemtitleLVM'>"+data[x].name+"</h1><p class='listviewitemseperatorLVM'>&nbsp;</p><p class='listviewitemdetailsLVM'>"+data[x].roles+"</p></td></tr></table></li>");
            }
        } 
          
        
        loading.endLoading();
                  
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function postBMServiceFilterCriteria(token, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/businessmatchesfilters.json?type=Service";
    
    if(uid!="")
        requestUrl=requestUrl+"&uid=" + uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        var returnstr=JSON.stringify(data);
//        alert(returnstr);

        $("#filterServiceLookFor option").remove();
        $("#filterServiceInterest option").remove();
        $("#filterServiceCategory option").remove();
        
          
        for(var x=0; x<data.rolesData.length; x++){     
            var optionValue=data.rolesData[x].role.value;
            var displayname=data.rolesData[x].role.display_name;
            $("#filterServiceLookFor").append($("<option></option>").attr("value",optionValue).text(displayname));
        }

        for(var x=0; x<data.interestData.length; x++){    
            $.each(data.interestData[0], function(key, value){
              $.each(value, function(key, value){
                var optionValue=value.value;
                var displayname=value.display_name;
                $("#filterServiceInterest").append($("<option></option>").attr("value",optionValue).text(displayname)); 
                });
            });
        }
          
        for(var x=0; x<data.servCategoryData.service_category.length; x++){     
            var optionValue=data.servCategoryData.service_category[x].category.value;
            var displayname=data.servCategoryData.service_category[x].category.display_name;
            var subkey=data.servCategoryData.service_category[x].category.sub_key;
            $("#filterServiceCategory").append($("<option></option>").attr("value",optionValue+"|"+subkey).text(displayname));
        }
        

        $("#filterServiceInterest").val($("#filterProductInterest").val());
        $("#filterServiceLookFor").val($("#filterProductLoookFor").val());
        $("#filterServiceKeyword").val($("#filterProductKeyword").val());
          
        postBMServiceSubCategory(token, data.servCategoryData.service_category[0].category.sub_key, uid);
          
//        loading.endLoading();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function postBMServiceSubCategory(token, category, uid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/businessmatchesfilters.json?type=Service&subCategoryData="+category;
    
    if(uid!="")
        requestUrl=requestUrl+"&uid=" + uid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;
        var returnstr=JSON.stringify(data);
//        alert(returnstr);

        $("#serviceSubCatDiv h1").remove();

          
        for(var x=0; x<data.servCategoryData.sub_category.length; x++){     
            var optionValue=data.servCategoryData.sub_category[x].sub.value;
            var displayname=data.servCategoryData.sub_category[x].sub.display_name;
            $("#serviceSubCatDiv").append("<h1><input type='checkbox' name='filterServiceSubCat' value='"+optionValue+"' class='check_box' id='chb"+x+"'><label for='chb"+x+"'>"+displayname+"</label><br></h1>"); 
        }
          
        loading.endLoading();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function postFilterServiceList(token, uid, submitted, lookFor, keyword, interest, category, subcategory){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/businessmatches.json?uid="+uid+"&submitted=true&rolesData="+lookFor+"&keywordsData="+keyword+"&interestData="+interest+"&servCategoryData="+category+"&subCategoryData="+subcategory;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
//          alert(returnstr);
        $(".scrollulRM li").remove();

        $(".scrollulRM").append("<li class='scrollliresult'><br><span class='resultnumber'>"+addCommas(data.view.count)+" results&nbsp;</span><br></li>");
          
        for (var x = 0; x < data.results.length; x++) { 
            if(data.results[x].type=="product" || data.results[x].type=="service"){
                $(".scrollulRM").append("<li class='scrollliRM' onclick='viewProductDetailsBM("+data.results[x].nid+")'><table class='listviewitemframeRM'><tr><td style='width:20%'><img class='listviewimgRM' src='"+data.results[x].image+"'></td><td><h1 class='listviewitemtitleRM'>"+data.results[x].title+"</h1><p class='listviewitemseperatorRM'>&nbsp;</p><p class='listviewitemdetailsRM'>"+data.results[x].description+"</p></td></tr></table></li>");
            }
            else{
                $(".scrollulRM").append("<li class='scrollliRM' onclick='replyOnClick("+data.results[x].uid+")'><table class='listviewitemframeRM'><tr><td style='width:20%'><img class='listviewimgRM' src='img/buyer.png'></td><td><h1 class='listviewitemtitleRM'>"+data.results[x].name+"</h1><p class='listviewitemseperatorRM'>&nbsp;</p><p class='listviewitemdetailsRM'>"+data.results[x].roles+"</p></td></tr></table></li>");
            }
        }            
          
        loading.endLoading();
                  
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function postNewInboxMessageCount(token, uid, act){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/message.json?uid="+uid+"&act="+act;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
//        alert(returnstr);

        $(".inboxBtn label").remove();
        if(data.new_message_count>0)
            $(".menuheaderright").append("<label class='badgeNumber'>"+data.new_message_count+"</label>");  
          
                  
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function postInboxMessageList(token, uid, act){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/message.json?uid="+uid+"&act="+act;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
//        alert(returnstr);    
             
        var list = new Array();
        var pageString="";
          
        $(".scrollul").append("<li class='scrollliresult'><br><span class='resultTitle'><u>Messages</u>&nbsp;</span><br></li><li class='scrollliresult'><br><span class='resultnumber'>"+addCommas(data.view.count)+" results&nbsp;</span><br></li>");
          
        for (var x = 0; x < data.lists.length; x++) { 
            var participant="";
            $.each(data.lists[x].participants , function(key , value){ // First Level
               $.each(value , function(key , value){ // First Level
                    participant=value.name;
                }); 
            });

            var datestring=data.lists[x].last_updated;
        
            
            if(data.lists[x].is_new==0){
                $(".scrollul").append("<li class='scrollli' onclick='viewMessageContent("+data.lists[x].thread_id+");'><table style='width:100%;'><tr><td rowspan='3' style='width:20%'><img class='inboxImg' src='img/profile_default_new2.png'></td><td style='width:60%;'><p class='inboxReadTitle'>"+data.lists[x].subject+"</p></td><td style='width:20%;' rowspan='2'><p class='inboxReadDate'>"+datestring.substr(0, 6)+"</p></td></tr><tr><td style='width:60%;'></td></tr><tr><td style='width:60%;'><span class='inboxReadMsg'>"+data.lists[x].messageBody+"</span></td></tr></table></li>");
                
//                                $(".scrollul").append("<li class='scrollli' onclick='viewMessageContent("+data[x].thread_id+");'><table style='width:100%;'><tr><td rowspan='3' style='width:20%'><img class='inboxImg' src='img/profile_default_new2.png'></td><td style='width:60%;'><p class='inboxReadTitle'>"+data[x].subject+"</p></td><td style='width:20%;' rowspan='2'><p class='inboxReadDate'>"+data[x].last_updated+"</p></td></tr><tr><td style='width:60%;'><p class='inboxReadInfo'>"+data[x].subject+"</p></td></tr><tr><td style='width:60%;'><span class='inboxReadMsg'>"+data[x].messageBody+"</span></td></tr></table></li>");
            }
            else{
                $(".scrollul").append("<li class='scrollli' onclick='viewMessageContent("+data.lists[x].thread_id+");'><table style='width:100%;'><tr><td rowspan='3' style='width:20%'><img class='inboxImgUnread' src='img/profile_default_new.png'></td><td style='width:60%;'><p class='inboxUnreadTitle'>"+data.lists[x].subject+"</p></td><td style='width:20%;' rowspan='2'><p class='inboxUnreadDate'>"+datestring.substr(0, 6)+"</p></td></tr><tr><td style='width:60%;'></td></tr><tr><td style='width:60%;'><span class='inboxUnreadMsg'>"+data.lists[x].messageBody+"</span></td></tr></table></li>");
                
//                $(".scrollul").append("<li class='scrollli' onclick='viewMessageContent("+data[x].thread_id+");'><table style='width:100%;'><tr><td rowspan='3' style='width:20%'><img class='inboxImgUnread' src='img/profile_default_new.png'></td><td style='width:60%;'><p class='inboxUnreadTitle'>"+participant+"</p></td><td style='width:20%;' rowspan='2'><p class='inboxUnreadDate'>"+data[x].last_updated+"</p></td></tr><tr><td style='width:60%;'><p class='inboxUnreadInfo'>"+data[x].subject+"</p></td></tr><tr><td style='width:60%;'><span class='inboxUnreadMsg'>"+data[x].messageBody+"</span></td></tr></table></li>");
            }
            
            if(pageString=="")
                pageString=data.lists[x].thread_id;
            else
                pageString=pageString+","+data.lists[x].thread_id;
        }
        
//        $.each(data, function(i, item) {
//            
//            list.push(item.text);
//        });
        $("#pageString").val(pageString);  
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}

function postInboxMessageContent(token, uid, act, mid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/message.json?uid="+uid+"&act="+act+"&mid="+mid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
//        alert(returnstr);
        $(".scrollul li").remove();  
//        var title=data.recipients[0].recipient.name;
        var date=data.messages[0].message.datetime;
        var message="";
        var recipient="";
        
        for(var x=0; x<data.recipients.length; x++){
            if(recipient=="")
                recipient=data.recipients[x].recipient.name;
            else
                recipient=recipient+","+data.recipients[x].recipient.name;
        }
          
        for(var x=0; x<data.messages.length; x++){
            $(".scrollul").append("<li class='scrollli'><br><p class='msgInfo'></p><p class='msgTitle'>"+data.messages[x].message.author.name+"</p><p class='msgDate'>"+data.messages[x].message.datetime+"</p><hr><span class='description'>"+data.messages[x].message.messageBody+"</span><hr></li>");
        }
          
//        $(".scrollul").append("<li class='scrollli'><br><p class='msgInfo'>More Infomation</p><p class='msgTitle'>"+recipient+"</p><p class='msgDate'>"+date+"</p>"+message+"<p class='seperator'>&nbsp;</p></li>");
        loading.endLoading();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
          loading.endLoading();
        }
    })
});    
}

function postInboxMessageDelete(token, uid, act, mid){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/message.json?uid="+uid+"&act="+act+"&mid="+mid;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
        navigator.notification.alert("Message deleted.", function(){}, "MDeC eSolution", "Ok");
        goInbox();
        loading.endLoading();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
          loading.endLoading();
        }
    })
});    
}

function postInboxMessageReply(token, uid, act, mid, message){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/message.json?uid="+uid+"&act="+act+"&mid="+mid+"&dataBody="+message;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
//        alert(returnstr);    
        if(data.success==true){
            postInboxMessageContent(token, uid, "3", mid);
            navigator.notification.alert("Message sent.", function(){}, "MDeC eSolution", "Ok");
            replyOnClick();
        }
        else{
            navigator.notification.alert(data.messages.warning, function(){}, "MDeC eSolution", "Ok");
            loading.endLoading();
        }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
          loading.endLoading();
        }
    })
});    
}

function postNewMessageToUSer(token, uid, act, nid, message, subject){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/message.json?uid="+uid+"&act="+act+"&nid="+nid+"&subject="+subject+"&dataBody="+message;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
//        alert(returnstr);    
        if(data.success==true){
            navigator.notification.alert("Message sent.", function(){}, "MDeC eSolution", "Ok");
            loading.endLoading();
            replyOnClick();
        }
        else{
            navigator.notification.alert(data.messages.warning, function(){}, "MDeC eSolution", "Ok");
            loading.endLoading();
        }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
          loading.endLoading();
        }
    })
});    
}

function PostFavCheck(token, uid, nid, flag){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/favourite.json?nid="+nid+"&uid="+uid+"&checkflag="+flag;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
//        alert("returnstr:"+returnstr);  
//        alert("flag:"+flag);  
        
        if(flag=="1"){
            if(data=="true")
                $("#shareImg").attr("src", "img/fav-ed.png");
        }
        else{
            if(data=="true")
                $("#shareImg").attr("src", "img/fav-ed.png");
            else
                $("#shareImg").attr("src", "img/fav-alt.png");
        }   
        
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          if(flag=="0")
            navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
        }
    })
});    
}


function postChangePwd(token, uid, newPwd){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/mobileapp/changepassword.json?uid="+uid+"&newpass="+newPwd;
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
        navigator.notification.alert("Password changed succesfully", function(){}, "MDeC eSolution", "Ok");
        loading.endLoading();  
        closeChangePwd();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
            navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
            loading.endLoading();
        }
    })
});    
}

function postForgetPwd(name){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/user/request_new_password.json";
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Mobile-Api-Key":dmzKey
      },
      data:"name=" + name,
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
        navigator.notification.alert("Email sent", function(){}, "MDeC eSolution", "Ok");
          
        loading.endLoading();  
        forgetPwdOnClick();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
            navigator.notification.alert("Unable connect to server.", function(){}, "MDeC eSolution", "Ok");
            loading.endLoading();
        }
    })
});    
}

function postRegistrationId(uid, token,regid, type){
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    //    var requestUrl=webUrl+"drupalgap/pushnotification.json?uid="+uid+"&token="+regid+"&type="+type;
    
    var requestUrl=baseurl+"drupalgap/pushnotification.json";
    
    $.ajax({
      url: requestUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRF-Token":token,
        "Mobile-Api-Key":dmzKey
      },
      data:"uid=" + uid + "&token=" + regid + "&type=" + type,
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
//        var returnstr=JSON.stringify(data);
//        alert(returnstr);
          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
//          alert("regid: Unable connect to server.");      
        }
    })
});
}

function getAboutUs(){  
var getDMZKeyFromDbProcess=getDMZKeyFromDB();
$.when(getDMZKeyFromDbProcess).done(function(data){
    var dmzKey=data.item(0).DMZKEY; 
    var baseurl=data.item(0).BASEURL; 
    
    var requestUrl=baseurl+"drupalgap/getaboutesolutions";
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
        "Mobile-Api-Key":dmzKey
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
      debugger;
        var returnstr=JSON.stringify(data);
        
//        alert(data.nodes[0].node.description);
        
        var content=data.nodes[0].node.description;
        content=content.replace("About eSolutions","");
        content=content.replace(/\r\n|\t|\n|\r/g, '<br />');
//        $("#aboutContent").append("<textarea readonly>"+content+"</textarea>");
        $("#aboutContent").append("<label>"+content+"</label>");
          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
//          alert("Unable connect to server.");      
        }
    })
});    
}

function viewMessageContent(mid){
    var paging=$("#pageString").val();
    
    window.location = "inboxDetailPage.html?mid="+mid+"&paging="+paging;
}

                   
                        