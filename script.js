function receiveData() {
	Puck.eval("BTN.read()",function(x) { sendData(x) })
}
function sendData(data) {
  $.ajax({
    url: "https://httpbin.org/post",
    type: 'POST',
    data: data,
    success: function(d, s) {
      console.log(s);
    }
  });
}
