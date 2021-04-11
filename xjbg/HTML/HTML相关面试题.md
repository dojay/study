### 简述一下对HTML语义化的理解

1. 正确的标签做正确的事情，结构清晰
2. 便于浏览器解析，有利于SEO

### Label的作用是什么？怎么使用？

定义表单的控制关系，用户选择该标签的时候，可以自动聚焦到和标签相关的表单控件上。

```
<label for="name">点我</label>
<input id="name" />

// or

<label>点我<input /></label>
```

### 渐进增强和优雅降级

渐进增强： 针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果，交互等改进和追加功能达到更好的用户体验。

优雅降级： 一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。


### 浏览器的渲染过程

1. 解析html，生成dom tree
2. 解析css，生成css tree
3. 将dom和css合并生成render tree
4. 计算出渲染树的布局 layout
4. 绘制

在不加defer和async的时候，如果dom解析的过程遇到script标签，则停止dom的解析，去加载js脚本，并执行，执行完毕以后，再继续解析html

DOMContentLoaded事件只有在DOM结构生成以后才会触发。onload是在js脚本下载和解析完成以后，才会触发。

解析和执行css，也会产生阻塞。


defer属性的流程：

1. 浏览器解析HTML
2. 遇到script标签，继续解析HTML，并且并行下载js
3. 解析完毕HTML，执行js脚本

注意：下载的**脚本文件在DOMCotentLoaded事件触发前**执行。

async属性：

1. js脚本的执行顺序无法保证
2. js脚本下载完毕以后就会执行，这个时候，会暂停解析HTML

### 回流和重绘

回流是 修改dom引起的行为，比如更改宽度，高度，margin等等
重绘是修改样式的行为，比如color，background-color

回流必然引起重绘，重绘不会引起回流

优化技巧：

1. 使用文档碎片对象
2. 动画使用定位，减少影响
3. 使用window.requestAnimationFrame()，它可以把代码推迟到下一次回流的时候执行，而不是立刻执行。

### 跨标签通讯

1. localstorage，监听window.onstorage方法
2. window.open  + window.postMessage(message, targetOrigin)
  其他窗口可以监听message方法
  window.addEvebtListenner('message', function(event) {})


### webpack优化项目
### service worker











