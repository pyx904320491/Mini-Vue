//观察者对象

function Observer (data) {

    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            //遍历监听每个数值
            self.defineReactive(data, key, data[key]);
        });
    },
    //定义响应
    defineReactive: function (data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter () {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function setter (newVal) {
                //数据不变时，返回不操作
                if (newVal === val) {
                    return;
                }
                //数据变化时，发出通知
                val = newVal;
                dep.notify();
            },
        });
    },
};

function observe (value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}

//监听对象
function Dep () {
    //对象列表
    this.subs = [];
}

Dep.prototype = {
    //添加对象
    addSub: function (sub) {
        this.subs.push(sub);
    },
    //通知变化
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    },
};
Dep.target = null;
