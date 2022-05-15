function New(constructor, ...args) {
    const prototype = Object.create(constructor.prototype)
    prototype.constructor = constructor
    const result = constructor.call(prototype, ...args) 

    if (result && typeof result === 'object') {
        return result
    }

    return prototype
}
