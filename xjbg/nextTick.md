## 一道nextTick执行顺序题引发的讨论

废话不多说，直接上代码

#### 代码一：
```
<template>
  <div id="app">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: '哈哈'
    }
  },
  mounted() {
    this.msg = '老王'
    console.log(1)
    setTimeout(() => {
      console.log(3)
    })
    Promise.resolve().then(() => {
      console.log('promise')
    })
    this.$nextTick(() => {
      console.log(2)
    })
  }
}
</script>
```

这个代码的执行顺序是什么？

再来看一道题：

#### 代码二：
```
<template>
  <div id="app">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: '哈哈'
    }
  },
  mounted() {
    // 注意这里没有上面的this.msg的赋值操作
    console.log(1)
    setTimeout(() => {
      console.log(3)
    })
    Promise.resolve().then(() => {
      console.log('promise')
    })
    this.$nextTick(() => {
      console.log(2)
    })
  }
}
</script>
```

这个代码的执行顺序又是什么？


先揭晓一下答案：

- 代码一的执行顺序：1、2、promise、3
- 代码二的执行顺序：1、promise、2、3

为什么呢？

抛开this.$nextTick，我想大家应该对这个题毫无压力。那么nextTick搞了什么事情呢？咱们去结合源码看下。

打开`/node_modules/vue/src/core/util/next-tick.js` 这里是关于nextTick的代码。


// 页面执行this.msg = '老王大帅比' 后执行如下：
1、触发响应式原理中的Object.defineProperty的set方法
2、set方法执行了dep.notify()，也就是所有订阅者的notify方法
3、notify方法中执行了所有监听者的update方法
4、update方法执行了调度系统的queueWatcher()
5、queueWatcher()里面执行了nextTick(flushSchedulerQueue)（非this.$nextTick）
6、flushSchedulerQueue里面执行了监听者的run方法
7、run执行了vm._update
8、_update里面开始diff

才开始diff........ 他妈的没完没了了........

洗洗睡了，明天再弄