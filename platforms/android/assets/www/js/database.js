//var dbManager = {
//    storeProfile:function(uid, name, email, profileimg){
//        alert("try  ");
//        var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
//        db.transaction(profileTransaction(uid, name, email, profileimg), errorStoreProfile, successStoreProfile);
//    },
//    
//    errorStoreProfile:function(err){
//      alert("failed: "err);  
//    },
//    
//    successStoreProfile:function(){
//     alert("success");
//    },
//    
//    profileTransaction:function(t){
//        t.executeSql('CREATE TABLE IF NOT EXISTS userprofile (uid text, name text, email text, profileImg text)');
//        
////        t.executeSql("INSERT INTO userprofile (uid, name, email, profileImg) VALUES ('your-path-to-image.jpg')");
//    },
//    
//    
//    
//};
function storeProfile() {
    alert("sql");
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    alert("opendb edi");
    db.transaction(runTransaction(), error, success);
}

function runTransaction(t){
    t.executeSql('CREATE TABLE IF NOT EXISTS userprofile (uid text, name text, email text, profileImg text)');
}

function error(err){
    console.log('Error creating tables: '+err);
}

function success(){
    console.log('Successfully created tables');
}

