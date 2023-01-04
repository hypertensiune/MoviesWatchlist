if(window.location.search == "?moviewatchlistextension"){
    window.addEventListener("load", function(){
        let url = document.querySelector("div.ipc-media.ipc-media--poster-27x40.ipc-image-media-ratio--poster-27x40.ipc-media--baseAlt.ipc-media--poster-l.ipc-poster__poster-image.ipc-media__img img").getAttribute("src");
        let date = document.querySelector("span.sc-8c396aa2-2.itZqyK").innerText;
        
        chrome.runtime.sendMessage({action: "fetchedData", url: url, date: date});
        window.close();
    });
}

