var spawn = require("child_process").spawn

fs = require("fs")

// Start websocket server
const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 4455 })
var clientSocket = null
wss.on("connection", function connection(ws) { clientSocket = ws })

function main() {
  compileOnChangesAnd(rebuildAndPublishChanges)
}

function rebuildAndPublishChanges() {
  console.log("[live_update_server] Updating browser and release/offline.html")

  // publish incremental change
  if (clientSocket) {
    var content = fs.readFileSync("build/app.js", "utf8");
    try {
      clientSocket.send(content)
    } catch (e) {
      console.log("[live_update_server] Failed to update browser.")
    }
  } else {
    console.log("[live_update_server] No browser connected.")
  }

  // Update html build in background
  spawn("make", ["debug_update"])
}

function compileOnChangesAnd(codeWasUpdated) {
  var ls = spawn("make", ["watch"]);

  ls.stdout.on("data", function (data) {
    console.log(data.toString())

    if (data.toString().indexOf("Found 0 errors") != -1) {
      codeWasUpdated()
    }
  });

  ls.stderr.on("data", function (data) {
    console.log(data.toString())
  });

  ls.on("exit", function (code) {
    console.log("Compiler exited with code " + code.toString());
  });
}

main()