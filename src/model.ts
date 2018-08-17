interface Model {
  x: number
}

let initialModel: Model = {
  x: 0
}

if (!(<any>window).model) { (<any>window).model = initialModel }