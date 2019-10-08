function receiveData() {
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function(
      item) { queryDict[item.split("=")[0]] = item.split("=")[1] });
  var name = queryDict["n"];
  if (name) {
    var puckData = Puck.eval("getData()", name, function(x) { sendData(x) });
    console.log("Received puck data: " + puckData);
  } else {
    console.log("name not provided!");
  }
}
function sendData(data) {
  $.ajax({
    url : "https://httpbin.org/post",
    type : 'POST',
    data : data,
    success : function(d, s) { console.log(s); }
  });
}
