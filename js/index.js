//定义VUE实例

function Vue (options) {
    var self = this;
    //传入data
    this.data = options.data;

    //传入方法
    this.methods = options.methods;

    //遍历data，监听数据变化
    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });

    //观察者观察data数组变化
    observe(this.data);

    //渲染页面
    new Compile(options.el, this);
    
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

Vue.prototype = {
    //Object.defineProperty，监听数据变化
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            },
        });
    },
};
