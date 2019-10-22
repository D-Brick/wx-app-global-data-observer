import Dep from './Dep.js'
import Watcher from './Watcher.js'

class Observer {
  constructor() {
    this.Dep = Dep
    this.Watcher = Watcher
  }

  Observe(data) {
    let _this = this
    for (let key in data) {
      let val = data[key]
      this.observe(data[key])
      let dep = new this.Dep()
      Object.defineProperty(data, key, {
        configurable: true,
        get() {
          _this.Dep.target && dep.addSubs(_this.Dep.target)
          return val
        },
        set(newValue) {
          if (val === newValue) {
            return
          }
          val = newValue
          _this.observe(newValue)
          dep.notify()
        }
      })
    }
  }

  observe(data) {
    if (!data || typeof data !== 'object') return
    this.Observe(data)
  }

  makeWatcher(key, global, fn) {
    new this.Watcher(key, global, fn, this.Dep)
  }
}

module.exports = Observer