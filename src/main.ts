let model: Model = (<any>window).model
let modelHistory = new ModelHistory()
//let timeTravel

function startApp(kontra, versionAtStart) {
  kontra.init()

  let sprite = kontra.sprite({
    x: 0,        // starting x,y position of the sprite
    y: 0,
    color: 'red',  // fill color of the sprite rectangle
    width: 4000,     // width and height of the sprite rectangle
    height: 4000,
  })

  let loop = kontra.gameLoop({  // create the main game loop
    update: function () {        // update the game state
      if (versionAtStart != (<any>window).version) {
        loop.stop()
        return
      }

      //model.x += 1.0
      modelHistory.save(model)

      // wrap the sprites position when it reaches
      // the edge of the screen
      if (model.x > kontra.canvas.height) {
        model.x = -sprite.height;
      }

      //sprite.x = model.x
      //sprite.y = model.x

      sprite.update();
    },

    render: function () {        // render the game state
      if (versionAtStart != (<any>window).version) {
        return
      }

      sprite.render()
    }
  })

  loop.start();    // start the game
}

function stopApp() {
}