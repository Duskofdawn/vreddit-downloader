document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('clipboardvid').addEventListener('click', copyToClipboard);
    document.getElementById('downloadvid').addEventListener('click', downloadVideo);
});

function copyToClipboard() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url;
        if (! url.endsWith('.json')) {
            url = url + ".json";
        }
        var JSON = $.getJSON(url, function() {
            try {
                var response = JSON.responseJSON[0].data.children[0].data.secure_media.reddit_video.fallback_url;
                response = response.replace("?source=fallback", "");
                const dummy = document.createElement("textarea");
                dummy.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;'
                dummy.value = response;
                document.body.appendChild(dummy);
                dummy.focus();
                dummy.select();
                document.execCommand("copy");
                dummy.remove();
                document.getElementById('clipboardvid').innerHTML = "Copied."
            } catch {
                document.getElementById('clipboardvid').style.cssText = 'height: 50px;';
                document.getElementById('clipboardvid').innerHTML = "No v.redd.it URL found.";
                document.getElementById('downloadvid').remove();
            }
        });
    });
    
    
};

function downloadVideo() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentDate = new Date();
        var downloadName =  "vreddit-" + currentDate.getFullYear()
                        + "-" + (currentDate.getMonth())
                        + "-" + currentDate.getDate()
                        + "-" + currentDate.getHours()
                        + currentDate.getMinutes()
                        + currentDate.getSeconds()
                        + ".mp4";
        var url = tabs[0].url;
        if (! url.endsWith('.json')) {
            url = url + ".json";
        }
        var JSON = $.getJSON(url, function() {
            try {
                var response = JSON.responseJSON[0].data.children[0].data.secure_media.reddit_video.fallback_url;
                response = response.replace("?source=fallback", "");
                document.getElementById('downloadvid').innerHTML = "Downloading...";
                chrome.downloads.download({url: response, filename: downloadName});
            } catch {
                document.getElementById('clipboardvid').style.cssText = 'height: 50px;';
                document.getElementById('clipboardvid').innerHTML = "No v.redd.it URL found.";
                document.getElementById('downloadvid').remove();
            }
        });
    });
};