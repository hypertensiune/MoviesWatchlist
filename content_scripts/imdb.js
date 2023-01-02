window.addEventListener("load", function(){
    let url = document.querySelector("div.ipc-media.ipc-media--poster-27x40.ipc-image-media-ratio--poster-27x40.ipc-media--baseAlt.ipc-media--poster-l.ipc-poster__poster-image.ipc-media__img img").getAttribute("src");
    chrome.runtime.sendMessage({action: "fetchedPoster", url: url});
    window.close();
});