function initPopup() {
  document.getElementById("clearList").addEventListener("click", function() {
    clearList();
    setHistoryCount();
    populatelist();
  })

  linkAddressLabel = document.getElementById("linkAdd");
  linkAddressLabel.style.display = 'none';

  setHistoryCount();
  populatelist();
}

function setHistoryCount() {
  chrome.storage.local.get("urlList", function (item) {
    var urlList = new Array();
    var countLabel = document.getElementById("count");
    if ('urlList' in item) {
      urlList = JSON.parse(item.urlList);
      countLabel.innerHTML = "Tab History - <small>" + urlList.length + "</small>";
    } else {
      countLabel.innerHTML = "Tab History - <small>" + 0 + "</small>";
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

      var ul = document.createElement("ol");
      ul.id = "uList";
      for(var i = 0; i < urlList.length; i++)
      {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.addEventListener("mouseover", function(e) {linkAddressLabel.innerHTML = e.target.href; linkAddressLabel.style.display = 'inline'});
        a.addEventListener("mouseout", function() {linkAddressLabel.style.display = 'none'});
        a.text = urlList[i].title.substring(0,55) + "   ";
        a.href = urlList[i].url;

        // var delButton = document.createElement("button");
        // delButton.setAttribute("class" , "btn btn-info btn-xs pull-right");
        // delButton.innerHTML = "X";
        // li.setAttribute("class" , "row");

        var delButton = document.createElement("span");
        delButton.setAttribute("class", "glyphicon glyphicon-trash pull-right");
        delButton.addEventListener("click", function(e) {
            console.log(e);
        });

        li.appendChild(a);
        li.appendChild(delButton);
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
