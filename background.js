chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  //console.log(changeInfo);
  //console.log(tab);
  //console.log(tab.url);
  if(changeInfo.status === "complete" && tab.url != "chrome://newtab/")
    addToStorage(tab.url);
  }
);


var addToStorage = function(url){
  console.log("URL: " + url);

  var urlList = new Array();

  chrome.storage.local.set({"urlList" : url}, function() {
    console.log("Data saved : " + (chrome.runtime.lastError == null));
  })

  chrome.storage.local.get("urlList", function (items) {
    console.log(items);
  })
}
