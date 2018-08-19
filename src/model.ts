interface Model {
  x: number,
  map: string[]

  update(event: String, data: any)
}

let initialModel: Model = {
  x: 0,

  map: [
    "s", "s", "s", "s", "s", "s", "s", "s",
    "s", "s", "s", "s", "s", "s", "s", "s",
    "s", "s", "s", "s", "s", "s", "s", "s",
    "s", "s", "s", "s", "s", "s", "s", "s",
    "s", "s", "s", "s", "s", "s", "s", "s",
    "s", "s", "s", "s", "s", "s", "s", "s",
    "s", "s", "s", "s", "s", "s", "s", "s",
    "g", "g", "g", "g", "g", "g", "g", "g",
  ],

  update: function (event: String, data: any) {
    if (event == "toggleMapIndex") {
      let mapIndex = (<number>data)

      if (model.map[mapIndex] == "s") {
        model.map[mapIndex] = "g"
      } else {
        model.map[mapIndex] = "s"
      }

      return model.map[mapIndex]
    }
    else {
      throw "Unhandled event: " + event
    }
  }
}

if (!(<any>window).model) { (<any>window).model = initialModel }