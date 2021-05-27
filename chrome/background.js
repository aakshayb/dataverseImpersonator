'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log('The color is green');
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
            if(key === 'callerobjectid') {
                let newValue = changes[key].newValue;
                if (newValue) {
                    let newHeader = {name: 'CallerObjectId', value: changes[key].newValue };
                    storageCache = {...storageCache, ...newHeader };
                } else {
                    storageCache = {};
                }
            }
        }
    });

    chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {            
            if (storageCache.name) {
                let newHeader = {name: storageCache.name, value: storageCache.value}
                details.requestHeaders = [...details.requestHeaders, newHeader];
                return { requestHeaders: details.requestHeaders }; 
            } 

            let headers = new Promise((resolve, reject)=> {
                chrome.storage.local.get(['callerobjectid'], function(result) {                
                    if(result.callerobjectid) {
                        let newHeader = {name: 'CallerObjectId', value: result.callerobjectid}
                        details.requestHeaders = [...details.requestHeaders, newHeader];
                        storageCache = { ...storageCache, ...newHeader};
                    }
                    return resolve({requestHeaders: details.requestHeaders});
                });
            });
            return headers;
        },
        { urls: ['https://*.dynamics.com/*'] },
        [ 'blocking', 'requestHeaders', 'extraHeaders']
    );
});