class GameMap {
  private sprites: any[] = []

  constructor(model: Model, kontra: any) {
    for (let x = 0; x < 8; x += 1) {
      for (let y = 0; y < 8; y += 1) {
        let mapIndex = y * 8 + x
        let state = model.map[mapIndex]
        let sprite = kontra.sprite({
          x: 45 * x + 7.5,
          y: 45 * y + 2,
          width: 43,
          height: 43,
          onDown: () => {
            state = model.update("toggleMapIndex", mapIndex)
            this.setState(sprite, state)
          },
        })

        this.setState(sprite, state)
        kontra.pointer.track(sprite)

        this.sprites.push(sprite)
      }
    }
  }

  render() {
    for (let sprite of this.sprites) {
      sprite.render();
    }
  }

  private setState(block, state) {
    if (state == "g") {
      block.color = "green"
    } else {
      block.color = "blue"
    }
  }
}