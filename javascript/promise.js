/**
 * 手写Promise
 */
class MyPromise {
    state = 'pending'
    result = undefined
    callbacks = []

    constructor(executor) {
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.result = value

                this.callbacks.forEach(([onFulfilled]) => onFulfilled(this.result))
            }
        }
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.result = reason

                this.callbacks.forEach(([, onRejected]) => onRejected(this.result))
            }
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    resolveThen(promise, ret, resolve, reject) {
        if (promise === ret) {
            reject(new TypeError('circle error'))
        }

        if (!(ret instanceof MyPromise)) {
            return resolve(ret)
        }

        ret.then((ret) => {
            this.resolveThen(promise, ret, resolve, reject)
        }, (reason) => {
            reject(reason) 
        })
    }

    then(onFulfilled, onRejected) {
        const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : result => result
        const onRejectedFn = typeof onRejected === 'function' ? onRejected : result => result
        const thenCallback = (callback, resolve, reject, result) => {
            setTimeout(() => {
                try {
                    const ret = callback(result)
                    this.resolveThen(thenPromise, ret, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        }

        const thenPromise = new MyPromise((resolve, reject) => {
            let result
            switch (this.state) {
                case 'fulfilled':
                    thenCallback(onFulfilledFn, resolve, reject, this.result)
                    break
                case 'rejected':
                    thenCallback(onRejected, resolve, reject, this.result)
                    break
                case 'pending':
                    this.callbacks.push([
                        (result) => thenCallback(onFulfilledFn, resolve, reject, result),
                        (result) => thenCallback(onRejectedFn, resolve, reject, result),
                    ])
                    break
            }
        })
        return thenPromise
    }
}

function test(Promise) {
    console.log(1)
    new Promise((resolve, reject) => {
        console.log(2)
        setTimeout(() => resolve('result'))
        console.log(3)
    }).then((v) => new MyPromise((resolve) => resolve('hello')))
    .then((v2) => console.log(v2), (err) => console.error(err, 'catch'))
    console.log(4)
}

// console.log('Promise ------------------------------')
// test(Promise)

console.log('\r\nMyPomise ------------------------------')
test(MyPromise)

