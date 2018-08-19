let model: Model = (<any>window).model
let modelHistory = new ModelHistory()

function startApp(kontra, versionAtStart) {
  kontra.init()

  let background = kontra.sprite({
    x: 0, y: 0, color: "black",
    width: kontra.canvas.width,
    height: kontra.canvas.height,
  })

  let map = new GameMap(model, kontra)

  let loop = kontra.gameLoop({
    update: function () {
      if (versionAtStart != (<any>window).version) {
        loop.stop()
        return
      }

      modelHistory.save(model)
    },

    render: function () {        // render the game state
      if (versionAtStart != (<any>window).version) {
        return
      }

      background.render()
      map.render()
    }
  })

  loop.start();    // start the game
}

function stopApp() {
}