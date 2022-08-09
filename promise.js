//声明构造函数
// 传形参
function Promise(executor){
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;

    //声明属性，用来保存回调函数
    this.callback = {};

    //保存实例对象的 this 的值
    // 否则实参数函数中的this指向的是window
    const self = this;// self _this that

    // 实参函数
    //resolve 函数
    function resolve(data){
        // 加条件，状态只能修改一次
        // 作用：
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'fulfilled';// resolved
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        if(self.callback.onResolved){
            self.callback.onResolved(data);
        }
    }
    //reject 函数
    function reject(data){
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'rejected';// 
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //调用失败的回调函数
        if(self.callback.onRejected){
            self.callback.onRejected(data);
        }
    }
    // 用try catch 接收抛出的异常
    try{
        //同步调用『执行器函数』
        executor(resolve, reject);
    }catch(e){
        // e 接收抛出的结果"error"
        //修改 promise 对象状态为『失败』
        reject(e);
    }
}

//添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){
    // Promise 同步操作 then方法的调用
    //调用回调函数  PromiseState
    if(this.PromiseState === 'fulfilled'){
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState === 'rejected'){
        onRejected(this.PromiseResult);
    }

    // Promise 异步操作 then方法的调用
    //判断 pending 状态
    if(this.PromiseState === 'pending'){
        //保存回调函数
        this.callback = {
            // 键名：键值
            onResolved: onResolved,
            onRejected: onRejected
        }
    }
}