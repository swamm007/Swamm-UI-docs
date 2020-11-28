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
#### setTimeout和setInterval
  
  setTimeout和setInterval他们都可以接受两个参数，第一个参数为回调函数，第二个参数是等待执行的时间，在等待时间结束之后，就会将回调函数放到event loop中进行执行（关于event loop 会单独抽一小节讲解），他们都会返回一个id，传入clearTimeout和clearIntervel能够清除这次定时操作。
  ```js
  var timer = setTimeoute(function() {
      console.log('执行-----')
  }, 2000)
  clearTimeout(timer)
  ```
  <!-- setIntervel丢帧待完善     -->
#### alert，confirm，prompt等交互性API
  alert 会弹出一个警告框，confirm和prompt可以和用户交互，confirm会弹出一个确认框，最终返回true(用户点击确定)，false(用户点击取消)，而prompt可以让用户输入一段文字，最终返回用户输出结果。    
    
  使用这类API执行，会导致JS停止执行，需要注意。
  
#### Location
<img :src="$withBase('/assets/img/location.jpg')" alt="location">  

##### 属性
  * hash: 返回一个url的锚部分
  * host: 返回一个url的主机名和端口
  * hostName: 返回一个url的主机名 
  * href: 当前url
  * pathname: 返回的url路径名
  * port: 返回一个url协议
  * search: 返回一个url的查询部分  
##### 方法
  * reload: 重新载入当前页面
  * replace: 用新的页面替换当前页面

## Document
  #### 方法：选择器
  选择器是浏览器知识中的重要一环， 除了getElementById, getElementsByClassName, getElementsByTagName,等早期定义的
  API。还有新增的querySelector, querySelectorAll等新规范增加的选择器  
  重点：选择器的返回值并不是数组，而是浏览器实现的一种数据结构（类数组：arrat-like object 具有length属性的对象）
  #### 方法：创建元素
  document.createElement能够创建一个dom元素，在新增多个元素时，可以先在内存中拼接出所有的dom元素一次性存入，减少浏览器的回流和重绘
  ```js
  var names = ['小明', '小红', '小方']

  var fragment = document.createDocumentFragment()

  names.forEach(name => {
    var li = document.createElement('li)
    li.innerHtml = name
    fragment.appendChild(li)
  })

  document.body.appendChild(fragment)
  ```
  #### 属性
  * title: document.title 可以设置或返回当前页面的标题
  * domain: 展示当前网站的域名
  * url: 当前网站的链接
  * anchors: 返回所有的锚点，带name属性的a标签
  * forms: 返回所有的form标签集合
  * images: 返回所有的img标签组合
  * links: 返回所有的带herf属性的 a 标签

## History

  history对象包含用户（在浏览器窗口中）访问过的URL,在html5中， history还与客户端路由息息相关
  #### 属性
  length: 返回历史列表中的网址数
  #### 方法
  * back: 加载history列表中的前一个url
  * forward: 加载history列表中的下一个url
  * go: 加载history列表中的某一个具体url
  * pushState:替换地址栏地址，并加入history列表，但是不会刷新页面
  * replaceState: 替换地址栏地址，替换当前页面在history列表中的记录，并不刷新页面。

