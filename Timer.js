const browserEnv = typeof window !== 'undefined'
const now = browserEnv
    ? (performance ? performance.now.bind(performance) : Date.now)
    : () => Number(process.hrtime.bigint() / 1000000n)

const tidMap = new WeakMap()

class Timer {
    constructor(handler, interval = 1000, options = {}) {
        const {
            delayLimit = +Infinity,
            delayCallback
        } = options

        const start = now()
        let prev = start

        const handlerWrapper = () => {
            const curTime = now()
            const offset = curTime - start
            const count = ~~(offset / interval)
            const expectTime = count * interval + start
            const nextDelay = expectTime + interval - curTime

            handler({
                offset,
                count
            })

            const delay = curTime - expectTime
            if (delay > delayLimit) {
                delayCallback({
                    offset,
                    count,
                    delay
                })
            }
            prev = curTime

            const tid = setTimeout(handlerWrapper, nextDelay)
            tidMap.set(this, tid)
        }

        const tid = setTimeout(handlerWrapper, interval)
        tidMap.set(this, tid)
    }

    clear() {
        clearTimeout(tidMap.get(this))
    }
}

export default Timer