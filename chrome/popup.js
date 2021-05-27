let textBox = document.getElementById('callerobjectid');
if (!textBox.value) {
    chrome.storage.local.get(['callerobjectid'], function(result) {
        if(result && result.callerobjectid) {            
            textBox.value = result.callerobjectid;
        }
    });
}

let startButton = document.getElementById('startButton');
startButton.onclick = function () {
    let objectId = textBox.value;
    if (objectId && objectId.trim() !== '') {
        chrome.storage.local.set({callerobjectid: objectId }, function() {        
            console.log('UserId ' + objectId + ' was set to storage');                      
        });
    }    
};

let clearButton = document.getElementById('clearButton');
clearButton.onclick = function (){
    chrome.storage.local.get(['callerobjectid'], function(result) {
        console.log('Fetched value');        
        if(result && result.callerobjectid) {
            chrome.storage.local.remove(['callerobjectid'], function() {
                console.log('Removed');
                textBox.value = null;
            });
        }
    });
};