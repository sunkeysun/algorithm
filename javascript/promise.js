/**
 * 手写Promise
 */
class MyPromise {
    state = 'pending'
    result = undefined

    constructor(executor) {
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.result = value
            }
        }
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.result = reason
            }
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : result => result
        const onRejectedFn = typeof onRejected === 'function' ? onRejected : result => result

        if (this.state === 'fulfilled') {
            setTimeout(() => {
                onFulfilledFn(this.result)
            })
        }

        if (this.state === 'rejected') {
            setTimeout(() => {
                onRejectedFn(this.result)
            })
        }
    }
}

function test(Promise) {
    console.log(1)
    new Promise((resolve, reject) => {
        console.log(2)
        resolve('result')
        console.log(3)
    }).then((v) => console.log(v))
    console.log(4)
}

// console.log('Promise ------------------------------')
// test(Promise)

console.log('\r\nMyPomise ------------------------------')
test(MyPromise)

