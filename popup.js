function initPopup() {
  document.getElementById("clearList").addEventListener("click", function() {
    clearList();
    populatelist();
  })

  linkAddressLabel = document.getElementById("linkAdd");

  setHistoryCount();
  populatelist();
}

function setHistoryCount() {
  chrome.storage.local.get("urlList", function (item) {
    var urlList = new Array();
    var countLabel = document.getElementById("count");
    if ('urlList' in item) {
      urlList = JSON.parse(item.urlList);
      countLabel.innerHTML = "Tab History - " + urlList.length;
    } else {
      countLabel.innerHTML = "Tab History - " + 0;
    }
  });
}

function populatelist() {

  var htmlList = document.getElementById("uList");
  if(htmlList != null)
    htmlList.remove();

  //read data and create a Lists
  chrome.storage.local.get("urlList", function (item) {
    var urlList = new Array();

    if("urlList" in item) {
      urlList = JSON.parse(item.urlList);

      var div = document.getElementById("listContainer");

      var ul = document.createElement("ul");
      ul.id = "uList";
      for(var i = 0; i < urlList.length; i++)
      {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.addEventListener("mouseover", function(e) {console.log(e);linkAddressLabel.innerHTML = e.target.href});
        a.addEventListener("mouseout", function() {linkAddressLabel.innerHTML = ""});
        a.text = urlList[i].title.substring(0,55);
        a.href = urlList[i].url;
        li.appendChild(a);
        ul.appendChild(li);
      }

      div.appendChild(ul);
    }
  });
}



function clearList(){
  console.log("Clear list");
  chrome.storage.local.clear();
}

window.onload = initPopup;
