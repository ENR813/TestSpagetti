// background.js
chrome.commands.onCommand.addListener(async (command) => {
    console.log(`Command "${command}" triggered`);
    // `tab` will either be a `tabs.Tab` instance or `undefined`.

    let tabs = await chrome.tabs.query({active: true,currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: fuckyou,
      //files: ['content.js']
    });

    //chrome.tabs.sendMessage(tabs[0].id, "annotate", (resp) =>{ console.log(resp)});
    chrome.tabs.sendMessage(tabs[0].id, {method: "annotate"}, function(response) {console.log(response.data);});
});


function fuckyou(){
    console.log("FUCK YOU ")
    console.log(window.getSelection.toString())
}


//chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
//        chrome.scripting.executeScript({
//            target: { tabId: tabId },
//            files: ["./foreground.js"]
//        })
//            .then(() => {
//                console.log("INJECTED THE FOREGROUND SCRIPT.");
//            })
//            .catch(err => console.log(err));
//    }
//});

// background.js
//chrome.action.onClicked.addListener((tab) => {
//    chrome.scripting.executeScript({
//      target: {tabId: tab.id},
//      files: ['content.js']
//    });
//  });