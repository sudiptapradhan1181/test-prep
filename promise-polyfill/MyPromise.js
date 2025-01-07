const STATES = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
};

class MyPromise {
    #thenCbs = [];
    #catchCbs = [];
    #value;
    #state = STATES.PENDING;
    #onSuccessBind = this.#onSuccess.bind(this);
    #onFailBind = this.#onFail.bind(this);

    constructor(cb) {
        try {
            cb(this.#onSuccessBind, this.#onFailBind);
        } catch (e) {
            this.#onFail(e);
        }
    }

    #runCallbacks() {
        if (this.#state === STATES.FULFILLED) {
            this.#thenCbs.forEach((callback) => {
                callback(this.#value);
            });

            this.#thenCbs = [];
        }

        if (this.#state === STATES.REJECTED) {
            this.#catchCbs.forEach((callback) => {
                callback(this.#value);
            });

            this.#catchCbs = [];
        }
    }

    #onSuccess(value) {
        queueMicrotask(() => {
            if (this.#state !== STATES.PENDING) return;

            if (value instanceof MyPromise) {
                value.then(this.#onSuccessBind, this.#onFailBind);
                return;
            }
            this.#value = value;
            this.#state = STATES.FULFILLED;
            this.#runCallbacks();
        });
    }

    #onFail(value) {
        queueMicrotask(() => {
            if (this.#state !== STATES.PENDING) return;

            if (value instanceof MyPromise) {
                value.then(this.#onSuccessBind, this.#onFailBind);
                return;
            }

            if (this.#catchCbs.length === 0) {
                return new UncaughtPromiseError(value);
            }
            this.#value = value;
            this.#state = STATES.REJECTED;
            this.#runCallbacks();
        });
    }

    then(thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            this.#thenCbs.push((result) => {
                if (thenCb == null) {
                    resolve(result);
                    return;
                } else {
                    try {
                        resolve(thenCb(result));
                    } catch (e) {
                        reject(e);
                    }
                }
            });

            this.#catchCbs.push((result) => {
                if (catchCb == null) {
                    reject(result);
                    return;
                } else {
                    try {
                        resolve(catchCb(result));
                    } catch (e) {
                        reject(e);
                    }
                }
            });

            this.#runCallbacks();
        });
    }

    catch(cb) {
        return this.then(undefined, cb);
    }

    finally(cb) {
        return this.then(
            (result) => {
                cb();
                return result;
            },
            (result) => {
                cb();
                throw result;
            }
        );
    }

    static resolve(value) {
        return new MyPromise((resolve) => resolve(value));
    }

    static reject(value) {
        return new MyPromise((reject) => reject(value));
    }

    static all(promises) {
        const results = [];
        let completedPromises = 0;
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i];
                promise
                    .then((value) => {
                        results[i] = value;
                        completedPromises++;
                        if (completedPromises === promises.length) {
                            resolve(results);
                        }
                    })
                    .catch(reject);
            }
        });
    }

    static allSettled(promises) {
        const results = [];
        let completedPromises = 0;
        return new MyPromise((resolve) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i];
                promise
                    .then((value) => {
                        results[i] = {
                            status: STATES.FULFILLED,
                            value,
                        };
                    })
                    .catch((reason) => {
                        results[i] = {
                            status: STATES.REJECTED,
                            reason,
                        };
                    })
                    .finally(() => {
                        completedPromises++;
                        if (completedPromises === promises.length) {
                            resolve(results);
                        }
                    });
            }
        });
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i];
                promise.then(resolve).catch(reject);
            }
        });
    }

    static any(promises) {
        return new MyPromise((resolve, reject) => {
            let errors = [];
            let rejectedPromises = 0;
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i];
                promise.then(resolve).catch((error) => {
                    errors.push(error);
                    rejectedPromises++;
                    if (rejectedPromises === promises.length) {
                        reject(new AggregateError(errors, 'All promises were rejected'));
                    }
                });
            }
        });
    }
}

class UncaughtPromiseError extends Error {
    constructor(error) {
        super(error);
        this.stack = `(in promise) ${error.stack}`;
    }
}

module.exports = MyPromise;
