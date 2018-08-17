let ws = new WebSocket("ws://localhost:4455")

window.version = 0

ws.onmessage = function (event) {
  window.newCode = event.data
  stopApp()

  eval(window.newCode)
  window.version += 1
  startApp(kontra, window.version)
  console.log("[live_update_client] New version started")
}