function goSearchResult(key){
    window.location = "searchResultPage.html?key="+document.getElementById('searchTextBox').value;
}

$(".searchbox").append("<input type='text' class='searchbox' placeholder='search products and services' id='searchTextBox'><button class='searchBoxBtn' onclick='goSearchResult()'><img src='img/search.png' class='searchBoxBtnImg'/></button></input>");


                        
                        
                        
                        
                        
                        