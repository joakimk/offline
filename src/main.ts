if (!(<any>window).model) {
  (<any>window).model = {
    x: 0
  }
}
let model = (<any>window).model

class Kontra {
  public canvas: any
  private kontra: any

  constructor(kontra) {
    this.kontra = kontra
    kontra.init()

    this.canvas = kontra.canvas
  }

  sprite(opts) {
    return this.kontra.sprite(opts)
  }

  gameLoop(opts) {
    return this.kontra.gameLoop(opts)
  }
}

let gameLoop = null

function startApp(rawKontra, versionAtStart) {
  let kontra = new Kontra(rawKontra)

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

      sprite.update();
      model.x += 1.0

      // wrap the sprites position when it reaches
      // the edge of the screen
      if (model.x > kontra.canvas.width) {
        model.x = -sprite.width;
      }

      sprite.x = model.x
    },
    render: function () {        // render the game state
      sprite.render();
    }
  });

  loop.start();    // start the game
}

function stopApp() {
}