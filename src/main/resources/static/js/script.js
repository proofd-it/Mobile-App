let complianceReport = {"hello": "world"};

function getPuckData(name) {
  return new Promise((resolve, reject) => {
    Puck.eval("getAll()", name, function (data) {
      puckData = JSON.parse(data);
      sendData(data);
      resolve(puckData);
    });
  });
}

async function receiveData() {
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function (
      item) {
    queryDict[item.split("=")[0]] = item.split("=")[1]
  });
  var name = queryDict["n"];
  var puckData;
  if (name) {
    while (!puckData) {
      try {
        puckData = await getPuckData(name);
      } catch (err) {
        console.log("transfer failed, trying again");
      }
    }
    complianceReport = puckData;
    return puckData;
  } else {
    console.log("name not provided!");
  }
}

function sendData(data) {
  $.ajax({
    url: "https://trustlens.abdn.ac.uk/api/save",
    type: 'POST',
    data: data
  });
}

function addToBlockchain(accepted) {
  let payload = complianceReport;
  payload["status"] = accepted ? "accepted" : "rejected";
  $.ajax({
    url: "https://trustlens.abdn.ac.uk/api/transaction",
    type: 'POST',
    data: payload
  });
}