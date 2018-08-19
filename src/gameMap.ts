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
          width: 44,
          height: 44,
          onDown: () => {
            state = model.update("toggleMapIndex", mapIndex)
            this.setState(sprite, state)
            this.setFillerState(sprite2, state)
          },
        })

        let sprite2 = kontra.sprite({
          x: 45 * x + 7.5,
          y: 45 * y + 2,
          width: 46,
          height: 46,
        })

        this.setState(sprite, state)
        this.setFillerState(sprite2, state)

        kontra.pointer.track(sprite)

        this.sprites.push(sprite2)
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

  private setFillerState(block, state) {
    if (state == "g") {
      block.color = "#080"
    } else {
      block.color = "#00e"
    }
  }
}