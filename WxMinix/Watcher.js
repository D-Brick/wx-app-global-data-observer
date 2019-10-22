class Watcher {
    constructor(key, global, fn, Dep) {
      this.key = key
      this.global = global
      this.fn = fn
      this.Dep = Dep
  
      this.subscibeByGet()
    }
  
    //实例化Watcher的同时触发get，进行订阅
    subscibeByGet() {
      this.Dep.target = this
      let arr = this.key.split('.')
      let val = this.global
      arr.forEach(key => {
        val = val[key]
      })
      this.Dep.target = undefined
    }
  
    update() {
      let arr = this.key.split('.')
      let val = this.global
  
      arr.forEach(key => {
        val = val[key]
      })
      this.fn(val)
    }
  }
  
  module.exports = Watcher
  