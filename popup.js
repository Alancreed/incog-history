function codeAddress() {
  console.log("update");
  document.getElementById('date').innerHTML = " Somedata " + new Date();

  document.getElementById("clearList").addEventListener("click", function() {
    console.log("button clicked");
    clearList();
  })
}

function clearList(){
  console.log("Clear list");
  chrome.storage.local.clear();
}

window.onload = codeAddress;
