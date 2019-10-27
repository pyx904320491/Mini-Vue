//监听者
function Watcher (vm, exp, cb) {
    this.cb = cb; //回凋函数 
    this.vm = vm; //vue实例
    this.exp = exp; //监听的变量
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        //如果数据变动，则执行回调函数
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function () {
        Dep.target = this;  // 缓存自己
        var value = this.vm.data[this.exp];  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    },
};
