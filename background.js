chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { urlContains: 'reddit.co' }
            }),
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { urlContains: 'redd.it' }
            })
          ],
          actions: [ 
            new chrome.declarativeContent.ShowPageAction()
          ]
        }
      ]);
    });
  });