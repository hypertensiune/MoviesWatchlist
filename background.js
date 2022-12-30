chrome.action.onClicked.addListener(async () => {
    chrome.tabs.create({url: chrome.runtime.getURL('movies.html')});
});

async function getPosterFromIMDB(url){
    let poster = "";

    chrome.tabs.create({url: url + "?moviebookmarkextension", active: false});
    await new Promise(resolve => {
        chrome.runtime.onMessage.addListener(resolve);
    }).then(res => {
        if(res.action == "fetchedPoster"){
            poster = res.url;
        }
    });
    return poster;
}

// communication with the extension page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action == "getPosterFromIMDB"){
        (async () => {
            let poster = await getPosterFromIMDB(request.url);
            sendResponse(poster);
        })();
    }
    return true;
});