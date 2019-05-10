// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

$( document ).ready(function() {
    $("#searchButton").click(search);

    $('#inputText').keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        search();
	    }
	});

});

function search(){
	$(".result").html("");
	var text = $("#inputText").val();
	var jqxhr = $.getJSON( "https://kitsu.io/api/edge/anime?filter[text]=" + text+"&fields[anime]=titles,posterImage")
	  .done(function() {
	    jqxhr.responseJSON.data.forEach(function(element) {
	    var stringQuery = "";
	    stringQuery += "<div>";
    	if(element.attributes.titles.en != null){
    		stringQuery += "<p>EN:" + element.attributes.titles.en +"</p>";
    	}
    	if(element.attributes.titles.en_jp != null){
		  	stringQuery += "<p>JP:" + element.attributes.titles.en_jp +"</p>";
		}
		stringQuery += "</div>";
		stringQuery += "<div>";
	    if(element.attributes.posterImage.tiny != null){
			stringQuery += "<img src='" + element.attributes.posterImage.tiny +"'>";
	    }
	    stringQuery += "</div>";
		$(".result").append(stringQuery);
		$(".result").append("<br>");
	  });
	  })
	  .fail(function() {
	  })
	  .always(function() {
	  });
}