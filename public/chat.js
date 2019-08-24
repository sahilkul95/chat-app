function init() {
  var socket = io.connect('http://localhost:3000')
}

function change_username() {
  let username = document.getElementById("username").value;
  socket.emit('change_username', {username})
}
