function inherits(child, parent) {
    child.prototype = Object.create(superConstructor.prototype)
    child.prototype.constructor = constructor
    Object.setPrototypeOf(child, parent)
}
