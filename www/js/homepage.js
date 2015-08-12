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

function slideshow(){
    var imga="http://cdn.playbuzz.com/cdn/fdbf1197-18af-43df-a5b1-76d180475700/49081b85-5614-4368-9103-71d9f0651322.jpg";
    var imgb="http://dreamatico.com/data_images/animals/animals-4.jpg";
    var imgc="http://thewowstyle.com/wp-content/uploads/2015/04/8589130571841-animal-wallpaper-hd.jpg";
    var imgd="http://i.telegraph.co.uk/multimedia/archive/02296/animal4c_2296997i.jpg";
    var imge="http://cdn.playbuzz.com/cdn/279428ca-ddfa-45ce-87b5-53b20c6f3b38/ac4084b3-f55b-4332-83c9-0d411095e812.jpg";
    var imgname=document.getElementById("promoimage").src;
    
    if(imgname==imga){
        $(".promoimage").fadeOut(500, function() {
        $(".promoimage").attr("src",imgb);
        $(".promoimage").fadeOut(500);});
    }
    
    if(imgname==imgb){
        $(".promoimage").fadeOut(500, function() {
        $(".promoimage").attr("src",imgc);
        $(".promoimage").fadeIn(500);});
    }
    
    if(imgname==imgc){
        $(".promoimage").fadeOut(500, function() {
        $(".promoimage").attr("src",imgd);
        $(".promoimage").fadeIn(500);});
    }
    
    if(imgname==imgd){
        $(".promoimage").fadeOut(500, function() {
        $(".promoimage").attr("src",imge);
        $(".promoimage").fadeIn(500);});
    }
    
    if(imgname==imge){
        $(".promoimage").fadeOut(500, function() {
        $(".promoimage").attr("src",imga);
        $(".promoimage").fadeIn(500);});
    }
}

function getPromoList(){ 
    alert("start web services");
    $.ajax({
      url : "http://192.168.1.18/MRWebApi/api/activity/category",
      type: 'GET',
      dataType: 'json',            
      success: function (data) { 
        alert("success get json");
        var returnstr=JSON.stringify(data);
        alert(returnstr);
        alert(data.length.toString());
         for (var x = 0; x < 2; x++) {
                alert(data[x].categoryName);
            }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
                alert(xhr.statusText);
                alert(thrownError);
        }

    });    
  }