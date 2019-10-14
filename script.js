function receiveData() {
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function(
      item) { queryDict[item.split("=")[0]] = item.split("=")[1] });
  var name = queryDict["n"];
  if (name) {
    Puck.eval("getNames()", name, function(fileNames) {
      var allData = [];
      filenames.forEach(function(filename) {
        Puck.eval('getReading("' + filename + ' ")', name, function(data) {
          allData.push(data);
          if (allData.length == fileNames.length) {
            sendData(allData);
          }
        });
      });
    });
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
