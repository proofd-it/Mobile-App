let complianceReport = {"hello": "world"};

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getPuckData(name) {
  return new Promise((resolve, reject) => {
    Puck.eval("getAll()", name, function (data) {
      puckData = JSON.parse(data);
      data["deliveryID"] = uuidv4();
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
    url: "https://trustlens.abdn.ac.uk/blockchain/save",
    type: 'POST',
    data: data
  });
}

function addToBlockchain(accepted) {
  let payload = complianceReport;
  payload["status"] = accepted ? "accepted" : "rejected";
  $.ajax({
    url: "https://trustlens.abdn.ac.uk/blockchain/transaction",
    type: 'POST',
    data: payload
  });
}