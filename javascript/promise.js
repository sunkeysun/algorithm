/**
 * Promise
 */

class MyPromise {
    state = 'pending'
    value = undefined
    reason = undefined
    chainCallbacks = []

    constructor(executor) {
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
                this.chainCallbacks.forEach(([onFulfilled]) => onFulfilled())
            }
        }
    
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                this.chainCallbacks.forEach(([,onRejected]) => onRejected())
            }
        }

        executor(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        let realOnFulfilled = onFulfilled
        let realOnRejected = onRejected
        if (typeof onFulfilled !== 'function') {
            realOnFulfilled = (value) => value
        }
        if (typeof onRejected !== 'function') {
            realOnRejected = (reason) => { throw reason }
        }

        function resolvePromise(promise2, callbackResult, resolve, reject) {
            if (promise2 === callbackResult) {
                throw new TypeError('circle promise')
            }

            if (callbackResult instanceof MyPromise) {
                callbackResult.then((value) => resolvePromise(promise2, value, resolve, reject), (reason) => reject(reason))
            } else {
                resolve(callbackResult)
            }
        }

        const promise2 = new MyPromise((resolve, reject) => {
            const that = this
            function resolveCallback() {
                setTimeout(() => {
                    try {
                        const callbackResult = realOnFulfilled(that.value)
                        resolvePromise(promise2, callbackResult, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            }
    
            function rejectCallback() {
                setTimeout(() => {
                    try {
                        const callbackResult = realOnRejected(that.reason)
                        resolvePromise(promise2, callbackResult, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            }

            if (this.state === 'pending') {
                this.chainCallbacks.push([
                    resolveCallback,
                    rejectCallback,
                ])
            } else if (this.state === 'fulfilled') {
                resolveCallback()
            } else if (this.state === 'rejected') {
                rejectCallback()
            }
        })

        return promise2
    }

    catch(onRejected) {
        this.then('', onRejected)
    }

    static resolve(value) {
        return new MyPromise((resolve) => resolve(value))
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason))
    }
}
