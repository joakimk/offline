class ModelHistory {
  private entries: any[] = []

  // Save history once a second
  save(model: Model) {
    if (this.entries.length == 0 ||
      (<any>new Date() - this.entries[this.entries.length - 1][1]) > 1000) {
      this.entries.push([model, new Date()])
    }
  }
}
