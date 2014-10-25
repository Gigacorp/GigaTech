class LocalStorage

  @delete: (args) =>
    localStorage.removeItem args.key

  @set: (args) =>
    item = JSON.stringify args.value
    localStorage.setItem args.key, item

  @get: (args) =>
    item = localStorage.getItem args.key

    if item
      item = JSON.parse item
    else
      item = args.default

    return item
