let model: Model = (<any>window).model
let modelHistory = new ModelHistory()

function startApp(kontra, versionAtStart) {
  kontra.init()

  let sprite = kontra.sprite({
    x: model.x,        // starting x,y position of the sprite
    y: 80,
    color: 'red',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 40,
  });

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
      sprite.render()
    }
  })

  loop.start();    // start the game
}

function stopApp() {
}