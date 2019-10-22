# WxMinix
微信小程序全局状态管理方案，提供响应式的app.globalData。

### 1.将WxMinix文件复制到小程序根目录

### 2.在app.js文件中引入Observer模块，例如：
    import Observer from './WxMinix/Observer.js'
    let observer = new Observer()

### 3.在app.js的globalData中添加属性，并在onLaunch中进行数据劫持，例如：
    App({
        onLaunch: function() {
            observer.Observe(this.globalData.wxMinix)
        },
        globalData: {
            wxMinix: {
                userInfo: {}
            }
        },
    })
    

### 4.在App构造器中添加makeWatcher函数，例如：
    App({
        makeWatcher: function(key, fn) {
            observer.makeWatcher(key, this.globalData, fn)
        }
    })

### 5.在任意page或component中的onLoad或attached中实例化Watcher，并在回调函数中设置希望随app.globalData改变而改变的data或properties字段。例如：
    const app = getApp()
    Component({
        lifetimes: {
            attached: function () {
                let _this = this
                app.makeWatcher("wxMinix.userInfo", function(newValue) {
                    _this.setData({
                        userInfo: newValue  //希望app.globalData.wxMinix.userInfo发生改变时，当前组件的userInfo字段也能发生变化
                    })
                })
            },
        },
        properties: {
            info: {
                type: Object,
                value: null
            }
        },
    },

### 6.在全局任意地方为app.globalData.wxMinix.userInfo赋值时，通过app.makeWatcher注册的观察者回调函数就会执行，从而改变指定的data或properties字段

