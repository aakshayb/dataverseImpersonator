'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log('Accessible Gifs has been installed');
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher(
                        {
                            pageUrl: {hostEquals: 'developer.chrome.com'},
                        })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });

    var storageCache = {};
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for(var key in changes) {
            // Could do something here
        }
    });    
});