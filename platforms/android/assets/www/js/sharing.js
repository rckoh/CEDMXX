
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//init custom sharing sheet
var sharing={

    initShareSheet:function(){
        $("#app").prepend("<div id='sharesheetbg' class='sharesheetbg'></div>");
        $("#sharesheetbg").prepend("<div id='sharesheet' class='sharesheet'></div>");
        $("#sharesheetbg").append("<button id='closeBtn' class='closeBtn'></button>");
        $("#sharesheet").append("<ul></ul>");
        $("#sharesheet ul").append("<li style='border:none;'>Share with</li>");
        $("#sharesheet ul").append("<li onclick='sharing.emailShare();'><img src='img/emailapp.png'/><span>Email</span></li>");
        $("#sharesheet ul").append("<li onclick='sharing.facebookShare();'><img src='img/fbapp.png'/><span>Facebook</span></li>");
        $("#sharesheet ul").append("<li onclick='sharing.whatsappShare();'><img src='img/whatsapp.png'/><span>Whatsapp</span></li>");
        
        
        
        $("#closeBtn").click(function(){
            sharing.closeShareSheet();
        });
    },
    
    closeShareSheet:function(){
        $("#sharesheetbg").remove();
    },
    
    facebookShare:function(){
        var getDMZKeyFromDbProcess=getDMZKeyFromDB();
        $.when(getDMZKeyFromDbProcess).done(function(data){
            
            var sharingpage=$("#sharingpage").val();
            
            if(sharingpage=='product'){
                var baseurl=data.item(0).BASEURL; 
                var websiteLink=$("#websitelink a").attr("href");
                websiteLink=baseurl+websiteLink.substring(1, websiteLink.length);

                window.plugins.socialsharing.shareViaFacebook(null, null, websiteLink, function(){
                    app.closeShareSheet();
                }, function(errormsg){
                    navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
                });
            }
            else{
                var baseurl=data.item(0).BASEURL; 
                var title=$("#companyName").text();
                
                title="msc-company/"+title.replace(/\s+/g, '-');
                var websiteLink= baseurl+title;
                
                window.plugins.socialsharing.shareViaFacebook(null, null, websiteLink, function(){
                    app.closeShareSheet();
                }, function(errormsg){
                    navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
                });
            }
        });
    },
    
    whatsappShare:function(){
        var getDMZKeyFromDbProcess=getDMZKeyFromDB();
        $.when(getDMZKeyFromDbProcess).done(function(data){
            var sharingpage=$("#sharingpage").val();
            
            if(sharingpage=='product'){
                var baseurl=data.item(0).BASEURL; 
                var websiteLink=$("#websitelink a").attr("href");
                websiteLink= baseurl+websiteLink.substring(1, websiteLink.length);

                window.plugins.socialsharing.shareViaWhatsApp(null, null, websiteLink,   function() {
                    app.closeShareSheet();
                }, function(errormsg){
                    navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
                });
            }
            else{
                var baseurl=data.item(0).BASEURL; 
                var title=$("#companyName").text();
                
                title="msc-company/"+title.replace(/\s+/g, '-');
                var websiteLink= baseurl+title;
                
                window.plugins.socialsharing.shareViaWhatsApp(null, null, websiteLink,   function() {
                    app.closeShareSheet();
                }, function(errormsg){
                    navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
                });
            }
        });
    },
    
    emailShare:function(){
        var getDMZKeyFromDbProcess=getDMZKeyFromDB();
        $.when(getDMZKeyFromDbProcess).done(function(data){
            var sharingpage=$("#sharingpage").val();
            
            if(sharingpage=='product'){
                var imageUrl=document.getElementById("productImg").src;    
                var newurl=imageUrl.split("?");
                var productDetails=$('#productdetails').html();
                var title=$("#companyName").text();
                var baseurl=data.item(0).BASEURL; 
                var websiteLink=$("#websitelink a").attr("href");
                websiteLink=baseurl+websiteLink.substring(1, websiteLink.length);
                
                if ( device.platform == 'android' || device.platform == 'Android'){   
                    
                    productDetails=productDetails.replace(/\sstyle="[a-zA-Z\/][^>]*"/g, "")
                    productDetails=productDetails.replace(/<br *\/?>/gi, "\n");
                    productDetails=productDetails.replace(/<li>/gi, "wsescchkpoint");    
                    productDetails=productDetails.replace(/wsescchkpoint\s+/gi, "   -");
                    productDetails=productDetails.replace(/<[a-zA-Z\/][^>]*>/g, "")
                    productDetails=productDetails.replace(/&amp;/g, "&");
                    productDetails=productDetails.replace(/&nbsp;/g, " ");
                    productDetails=productDetails.replace(/&apos;/g, "'");
                    productDetails=productDetails.replace(/&quot;/g, '"');
                    productDetails=productDetails+"\n";
                            
                    window.plugins.socialsharing.shareViaEmail(
                      productDetails+websiteLink, 
                      title,null, null, null, [newurl[0]], 
                      function(){
                        app.closeShareSheet();
                      }, 
                      function(errormsg){
                        navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
                      }
                    ); 
                } 
                else {
                     window.plugins.socialsharing.shareViaEmail(
                      productDetails+websiteLink, 
                      title,null, null, null, [newurl[0]], 
                      function(){
                        app.closeShareSheet();
                      }, 
                      function(errormsg){
                        navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
                      }
                    );   
                }
            }
            else{
                var imageUrl=document.getElementById("productImg").src;
                var newurl = imageUrl.split("?");
                var title=$("#companyName").text();
                var productDetails=$('#productdetails').html();
                var baseurl=data.item(0).BASEURL; 
                
                var titleurl="msc-company/"+title.replace(/\s+/g, '-');
                var websiteLink= baseurl+titleurl;
                
                if ( device.platform == 'android' || device.platform == 'Android'){   
                    
                    productDetails=productDetails.replace(/\sstyle="[a-zA-Z\/][^>]*"/g, "")
                    productDetails=productDetails.replace(/<br *\/?>/gi, "\n");
                    productDetails=productDetails.replace(/<li>/gi, "wsescchkpoint");    
                    productDetails=productDetails.replace(/wsescchkpoint\s+/gi, "   -");
                    productDetails=productDetails.replace(/<[a-zA-Z\/][^>]*>/g, "")
                    productDetails=productDetails.replace(/&amp;/g, "&");
                    productDetails=productDetails.replace(/&nbsp;/g, " ");
                    productDetails=productDetails.replace(/&apos;/g, "'");
                    productDetails=productDetails.replace(/&quot;/g, '"');
                    productDetails=productDetails+"\n";
                          
                    window.plugins.socialsharing.shareViaEmail(
                      productDetails+websiteLink, 
                      title,null, null, null, [newurl[0]], 
                      function(){
                        app.closeShareSheet();
                      }, 
                      function(errormsg){
                        navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
                      }
                    ); 
                } 
                else {
                     window.plugins.socialsharing.shareViaEmail(
                      productDetails+websiteLink, 
                      title,null, null, null, [newurl[0]], 
                      function(){
                        app.closeShareSheet();
                      }, 
                      function(errormsg){
                        navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
                      }
                    );   
                }
            }
        });
    }
}



