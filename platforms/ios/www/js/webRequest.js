var webUrl = "http://netinfinium.publicvm.com:86/";

function getFeaturedList(){
    alert("webrequst");
    var requestUrl=webUrl+"drupalgap/getfeatured";
    
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/hal+json"
      },
      success: function(data, status, xhr) {
        debugger
        var returnstr=JSON.stringify(data);
          //alert(returnstr);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert(xhr.status);
        }
    })
}



                        
                        
                        
                        
                        
                        