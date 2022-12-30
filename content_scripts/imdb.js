window.addEventListener("load", function(){
    let jsondata = JSON.parse(document.querySelector("script[type='application/ld+json']").innerHTML);
    chrome.runtime.sendMessage({action: "fetchedPoster", url: jsondata["image"]});
    window.close();
});