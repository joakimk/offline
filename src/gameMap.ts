class GameMap {
  private sprites: any[] = []

  constructor(model: Model, kontra: any) {
    for (let x = 0; x < 8; x += 1) {
      for (let y = 0; y < 8; y += 1) {
        let mapIndex = y * 8 + x
        let state = model.map[mapIndex]
        let sky = kontra.sprite({
          x: 45 * x + 7.5,
          y: 45 * y + 2,
          width: 45,
          height: 44,
        })
        this.setState(sky, "s")
        this.sprites.push(sky)

        let sprite = kontra.sprite({
          x: 45 * x + 7.5,
          y: 45 * y + 2,
          width: 45,
          height: 44,
          onDown: () => {
            state = model.update("toggleMapIndex", mapIndex)
            this.setState(sprite, state)
          },
        })

        this.setRenderStyle(sprite, state, x, y)
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

  private patternForBlock(block, x: number, y: number): string[] {
    let mapIndex: number = y * 8 + x

    let pattern: string[] = []

    // Top row
    pattern.push(model.map[mapIndex - 8 - 1] || "e")
    pattern.push(model.map[mapIndex - 8] || "e")
    pattern.push(model.map[mapIndex - 8 + 1] || "e")

    // Middle row
    pattern.push(model.map[mapIndex - 1] || "e")
    pattern.push(model.map[mapIndex] || "e")
    pattern.push(model.map[mapIndex + 1] || "e")

    // Bottom row
    pattern.push(model.map[mapIndex + 8 - 1] || "e")
    pattern.push(model.map[mapIndex + 8] || "e")
    pattern.push(model.map[mapIndex + 8 + 1] || "e")

    return pattern
  }

  private setRenderStyle(block, state, x, y) {
    let leftBlockPattern = [
      "s", "s", "s",
      "s", "g", "g",
      "s", "s", "s"
    ].join()

    let rightBlockPattern = [
      "s", "s", "s",
      "g", "g", "s",
      "s", "s", "s"
    ].join()

    let that = this
    block.render = function () {
      let pattern = that.patternForBlock(block, x, y).join()

      if (pattern == leftBlockPattern) {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x + 22, this.y + 22, 20, 0, 2 * Math.PI);
        this.context.fill();
      } else if (pattern == rightBlockPattern) {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x + 22, this.y + 22, 20, 0, 2 * Math.PI);
        this.context.fill();
      } else {
        this.draw()
      }
    }

  }
}