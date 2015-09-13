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


function changepage(pagenumber){
    if(pagenumber==1){
        $(".pageone").show();
        $(".pagetwo").hide();
        $("#btnPoints").css("color", "#4be5d9");
        $("#btnProducts").css("color", "#32978f");
        
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
                marginLeft: "0%",}, 300, function() {});
    }
    
    if(pagenumber==2){
        
        $(".pageone").hide();
        $(".pagetwo").show();
        $("#btnPoints").css("color", "#32978f");
        $("#btnProducts").css("color", "#4be5d9");
        
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
                marginLeft: "50.5%",}, 300, function() {});
    }
}

function initsubmenustyle(){
    currentpage=1;
    $("#btnPoints").css("color", "#00FFFF");
}

function pageSwipeLeft(){
    if(!menuStatus){
        if(currentpage==1){
            $(".pageone").hide();
            $(".pagetwo").show();
            $("#btnPoints").css("color", "#32978f");
            $("#btnProducts").css("color", "#4be5d9");

            $(".pagetwo").css("marginLeft", "100%");

            $(".pageone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});
            $(".pagethree").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "50.5%",}, 300, function() {});
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
        if(currentpage==2){
            $(".pageone").show();
            $(".pagetwo").hide();
            $("#btnPoints").css("color", "#4be5d9");
            $("#btnProducts").css("color", "#32978f");

            $(".pageone").css("marginLeft", "-100%");

            $(".pageone").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=1;});
            $(".pagetwo").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "0%",}, 300, function() {});
        }
    }
}


function initcompanyprofile(){
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(runGetComanyIdTrnasaction);
}

function runGetComanyIdTrnasaction(t){
    t.executeSql('select companyid from userprofile', [], successGetCompanyId, errorGetCompanyId);    
}

function successGetCompanyId(t, results){
    if(results.rows.length>0)
    {
        var companyid=results.rows.item(0).companyid;
        requestCompanyProfile(companyid);
        getProfileProdServList(companyid);
    }

}

function errorGetCompanyId(err){
//    alert('There was an error processing the SQL: '+err.message);
} 

function initUserPoint(){
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(runGetUserIdTransaction);
}

function runGetUserIdTransaction(t){
    t.executeSql('select uid, name, profileImg from userprofile', [], successGetUserId, errorGetUserid);    
}

function successGetUserId(t, results){
    if(results.rows.length>0)
    {
        requestUserPoint(results.rows.item(0).uid);
        $("#lblUSername").text(results.rows.item(0).name);
       
//        $("#imgProfile").attr("src".results.rows.item(0).profileImg);
       
    }

}

function errorGetUserid(err){
    alert("fail");
//    alert('There was an error processing the SQL: '+err.message);
} 

