chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  //console.log(changeInfo);
  //console.log(tab);
  //console.log(tab.url);
  if(changeInfo.status === "complete" && tab.url != "chrome://newtab/"  && tab.url != tab.title)
    addToStorage(tab.url, tab.title);
  }
);


var addToStorage = function(url, title){
  //read data
  chrome.storage.local.get("urlList", function (item) {
    var urlList = new Array();

    if("urlList" in item) {
      urlList = JSON.parse(item.urlList);
    }

    var entry = {};
    entry.url = url;
    entry.title = title;

    //append data
    urlList.unshift( entry );
    var arrayString = JSON.stringify(urlList);

    //write data
  chrome.storage.local.set({"urlList" : arrayString}, function() {
    console.log("Data saved : " + (chrome.runtime.lastError == null));
    });
  });
}
