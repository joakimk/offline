let model: Model = (<any>window).model
let modelHistory = new ModelHistory()
//let timeTravel

function startApp(kontra, versionAtStart) {
  kontra.init()

  let background = kontra.sprite({
    x: 0, y: 0, color: "black",
    width: kontra.canvas.width,
    height: kontra.canvas.height,
  })

  let sprite = kontra.sprite({
    x: model.x,
    y: 0,
    color: "red",
    width: 20,
    height: 20,
  })

  let loop = kontra.gameLoop({  // create the main game loop
    update: function () {        // update the game state
      if (versionAtStart != (<any>window).version) {
        loop.stop()
        return
      }

      model.x += 1.0
      modelHistory.save(model)

      // wrap the sprites position when it reaches
      // the edge of the screen
      if (model.x > kontra.canvas.width) {
        model.x = -sprite.width;
      }

      sprite.x = model.x

      sprite.update();
    },

    render: function () {        // render the game state
      if (versionAtStart != (<any>window).version) {
        return
      }

      background.render()
      sprite.render()
    }
  })

  loop.start();    // start the game
}

function stopApp() {
}