/**
 * Promise
 */
class Promise {
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

        function resolvePromise(promiseThen, callbackResult, resolve, reject) {
            if (promiseThen === callbackResult) {
                throw new TypeError('circle promise')
            }

            if (callbackResult instanceof Promise) {
                callbackResult.then((value) => resolvePromise(promise2, value, resolve, reject), (reason) => reject(reason))
            } else {
                resolve(callbackResult)
            }
        }

        const promiseThen = new Promise((resolve, reject) => {
            function resolveCallback() {
                setTimeout(() => {
                    try {
                        const callbackResult = realOnFulfilled(that.value)
                        resolvePromise(promiseThen, callbackResult, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            }
    
            function rejectCallback() {
                setTimeout(() => {
                    try {
                        const callbackResult = realOnRejected(that.reason)
                        resolvePromise(promiseThen, callbackResult, resolve, reject)
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

        return promiseThen 
    }

    catch(onRejected) {
        this.then('', onRejected)
    }

    static resolve(value) {
        return new Promise((resolve) => resolve(value))
    }

    static reject(reason) {
        return new Promise((resolve, reject) => reject(reason))
    }
}
