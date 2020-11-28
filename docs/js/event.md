---
title: 事件
---
## 定义事件
 我们可以通过多种方式对DOM元素定义一个事件：
 ```html
 <!-- 点击p标签弹出alert -->
 <p>点我，点我</p>
 ```
 第一种方式，直接在dom元素中添加，不过这种方式一般不推荐，过分的将视图与逻辑部分的代码耦合
 ```js
  <p onclick="showAlert()">点我，点我</p>

  <script>
    function showAlert () {
        alert('hello world')
    }
  </script>
 ```

 第二种方式，纯js解决，获取dom元素之后通过设置其onclick属性

 ``` js
    var dom = document.getElementsByTagName('p')[0]
    dom.onclick=function () {
        alert('hello world')
    }
    //取消事件只需要将onlick属性置为null即可
    dom.onclick = null
 ```
 * 优点：纯js实现，试图与逻辑解耦
 * 缺点： 一个DOM元素，仅能设置一个onclick事件

 第三种方式，纯js解决，DOM2级规范实现新的API, addEventListener 和 removeEventListener两个API
 ``` js
    var onClickFun = function () {
        alert('hello world')
    }
    var dom = document.getElementsByTagName('p')[0]

    dom.addEventListener('click', onClickFun, false)

    // 取消事件监听方法

    dom.removeEventListener('click', onClickFun)
 ```
 * 优点
     1. 纯js实现，视图与逻辑解耦
     2. 可以通过addEventListener可以对click设置多个函数，他们会依次触发
 * 缺点
     1. removeEventListener 删除的事件函数必须与设置时保持相同的函数引用，所以设置事件事尽量不要使用匿名函数。

## 事件捕获与冒泡

DOM是一个嵌套形的树状结构，在浏览器的表现是叠加在一起的，所以在浏览器中点击一个区域，在DOM结构中会依次遍历多个DOM， 自顶向下我们称为 事件捕获 自下而上我们称为 事件冒泡。  
DOM2级事件规范规定，一个标准的事件流分为三个阶段，首先是    自上而下的 事件捕获 状态，然后是达到真正的触发事件的元素，最后才从这个元素回到顶部的  事件冒泡。 
<img :src="$withBase('/assets/img/event.png')" alt="捕获与冒泡">
    
addEventListener 可以通过第三个参数里指定究竟在捕获阶段触发事件，还是在冒泡阶段触发事件，第三个阶段为true,则代表在捕获阶段触发， 为false，则代表在冒泡阶段触发。

## 事件对象
   触发事件后，浏览器会传入一个事件对象进入事件回调函数本身
``` js
 var dom = document.getElementsByTagName('p')

 dom.onclick = function (event) {
     console.log(event)
     alert('hello world')
 }

 dom.addEventListener('click', function (event) {
     console.log('event')
     alert('hello world')
 }, false)

```
event 对象具有以下属性
  * bubles: 表明事件是否冒泡
  * cancelable: 表明是否可以取消事件的默认行为
  * currentTarget: 事件当前正在处理的元素
  * defaultPrevented: 为 true 则代表已经调用了preventDefault函数
  * detail: 事件细节    
  * eventPhase: 表明事件所处阶段，1 代表捕获 2 代表在事件目标 3 代表冒泡
  * type: 事件类型
event 对象上的方法
  * preventDefault: 取消事件的默认行为
  * stopImmediatePropagation: 取消事件的进一步捕获或冒泡，同时阻止事件处理程序的调用
  * stopPropagation: 阻止进一步捕获或者冒泡

## 事件委托


