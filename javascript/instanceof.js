function instanceOf(instance, constructor) {
    let proto = Object.getPrototypeOf(instance)
    while (proto) {
        if (proto === constructor.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}

function Parent() {}

Parent.prototype.xxx = 'xxx'
function Child() {
    Parent.call(this)
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const parent = new Parent()
const child = new Child()

console.log(instanceOf(child, Child))
console.log(instanceOf(child, Parent))
console.log(instanceOf(parent, Parent))
console.log(instanceOf(parent, Child))
