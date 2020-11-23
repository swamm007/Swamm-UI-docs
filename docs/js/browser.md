---
title: 浏览器内置对象
---
# 浏览器内置对象

浏览器是一个js的运行时环境，它基于JS解析器的同时，增加了许多环境相关的内容，用一张图表示各个运行环境和JS解析器的关系如下：
  
<img :src="$withBase('/assets/img/browser.jpg')" alt="关系图">

我们把常见的，能够用js这门语言控制的内容称为一个JS的运行环境，常见的运行环境有node.js，浏览器，小程序等等。所有的运行环境都必须含有一个JS的解释器，在解释器层面符合ECMASCRIPT规范，定义了Js 本身语言层面的东西，比如关键字，语法等等。  
  
在每个环境中，也会基于JS加入一些自己环境的特性，比如Node.js中的**globe对象**，**process对象**，浏览器环境中的**window对象**，**document对象**等等。  
这也就解释了为什么在node.js和浏览器中都能使用数组，函数，但是只能在node.js环境中使用require加载模块，而不能在浏览器中使用的原因，因为require是node.js的环境中特有的内容。  
  
## 内置对象属性
 接下来主要针对的浏览器中的一些常见内置对象  
 ### Window
   
   window是在浏览器中代表全局作用域，所有在全局作用域下声明的变量和内容最终都会变成window对象下的属性，比如：  
   ```js
   var a = 1
   console.log(window.a) // 1
   ```
   访问未声明的变量时，直接访问会报错，如果通过window访问则会报undefined  
   ```js
   var a = name // Uncaught ReferenceError: name is not defined at <anonymous>:1:9
   var a = window.name
   console.log(a) // undefined
   ```
### setTimeout和setInterval
  
  setTimeout和setInterval他们都可以接受两个参数，第一个参数为回调函数，第二个参数是等待执行的时间，在等待时间结束之后，就会将回调函数放到event loop中进行执行（关于event loop 会单独抽一小节讲解），他们都会返回一个id，传入clearTimeout和clearIntervel能够清除这次定时操作。
  ```js
  var timer = setTimeoute(function() {
      console.log('执行-----')
  }, 2000)
  clearTimeout(timer)
  ```
  <!-- setIntervel丢帧待完善     -->
### alert，confirm，prompt等交互性API
  alert 会弹出一个警告框，confirm和prompt可以和用户交互，confirm会弹出一个确认框，最终返回true(用户点击确定)，false(用户点击取消)，而prompt可以让用户输入一段文字，最终返回用户输出结果。    
    
  使用这类API执行，会导致JS停止执行，需要注意。

