---
title: AJAX
---
## AJAX
2005 年开始，ajax 作为⼀项新兴的交互技术开始影响 web 的发展。ajax 的核⼼是 XMLHttpRequest对象。  
```js
var xhr = new XMLHttpRequest();
// xhr.open 接受三个参数，要发送的请求类型 get post、请求的 url、是否异步发送的布尔值
xhr.open('get', '/ajax.json', true);
// 调⽤ send 函数发送这个请求，参数为携带的参数
xhr.send(null);
```

⽐较常⻅的是发送 get 请求和 post 请求。
  * 发送 get 请求时，我们⼀般把参数放置在 url 路径中，以 ?foo=bar&bar=foo 这样的形式。
  * 发送 post 请求时，数据放在 body 中，⼀般我们会以 form 表单的形式发送或者以 json 的形式发送数据。
get 请求发送数据：
  
```js
var xhr = new XMLHttpRequest();
// xhr.open 接受三个参数，要发送的请求类型 get post、请求的 url、是否异步发送的布尔值
xhr.open('get', '/ajax?foo=bar&bar=foo', true);
// 调⽤ send 函数发送这个请求，参数为携带的参数
xhr.send(null);
```

post 请求发送 form 数据和 json 数据的示例：
```js
var xhr = new XMLHttpRequest();
xhr.open('post', '/ajaxPost', true);
// 设置 request 的 content-type 为 application/x-www-form-urlencoded
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
var data = new FormData();
data.append('foo', 'bar');
data.append('bar', 'foo');
xhr.send(data);
```
```js
var xhr = new XMLHttpRequest();
xhr.open('post', '/ajaxPost', true);
// 设置 request 的 content-type 为 application/json
xhr.setRequestHeader('Content-Type', 'application/json');
var data = JSON.stringify({
    foo: 'bar',
    bar: 'foo'
});
xhr.send(data);
```
上⾯这个例⼦中我们通过 setRequestHeader 向后端发送⼀些⾃定义 header，除了浏览器默认发送的header 以外，也会带上我们⾃定义的 header 头部，后端同学收到这些内容就可以进⾏处理。  
同样的，我们可以通过 onreadystatechange 事件，监听当前 xhr 实例的阶段，通过判断xhr.readyState 的阶段，来判断当前请求的状态。readyState 状态如下：
* 未调⽤ open ⽅法
* 已调⽤ open ⽅法但未调⽤ send ⽅法
* 已调⽤ send ⽅法但尚未收到返回
* 收到部分响应数据
* 收到所有响应数据
同时 xhr 实例上还有 xhr.responseText 代表响应主体返回的⽂本， xhr.status 代表响应的 HTTP状态码， xhr.statusText HTTP 状态说明
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
if (xhr.readystate !== 4) return;
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        alert(xhr.responseText);
    } else {
        alert("错误：状态码 " + xhr.status + xhr.statusText);
    }
}
xhr.open('get', '/ajax?foo=bar&bar=foo', true);
xhr.send(null);
```
我们也可以通过 xhr.getRequestHeader 来获取服务端返回的 header

## ES6 之后的 fetch 

在 ES6 之后，浏览器端新增了⼀个 fetch api， 他有以下的⼏个特点：
* fetch api 返回⼀个 promise 的结果
* 默认不带 cookie，需要使⽤配置 credentials: "include"
* 当⽹络故障时或请求被阻⽌时，才会标记为 reject。否则即使返回码是 500，也会 resolve 这个promise

```js
fetch('/ajax?foo=bar')
  .then(function() {
    console.log('请求发送成功');
  })
```

这就是⼀个简单的请求，发送之后就会进⼊ resolve 状态。与普通的 ajax 请求不同的是，在服务端返回内容时，我们还需要调⽤⼀些⽅法才能拿到真正返回的结果。
```js
fetch('/ajax?foo=bar')
  .then(function(response) {
    response.text(); // 返回字符串
    response.json(); // 返回 json
    response.blob(); // ⼀般指返回⽂件对象
    response.arrayBuffer(); // 返回⼀个⼆进制⽂件
    response.formData(): // 返回表单格式内容
  })
```
常⻅的 json 请求，我们需要再调⽤⼀次 response.json 来让 fetch API 返回的结果序列化为 json  

```js
fetch('/ajaxPost', {headers: {}})
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result);
  });
```

## 封装通用的AJAX请求
```js
function fetch(url, config = {}) {
  if (window.fetch) return window.fetch(url, config);
  return new Promise((resolve, reject) => {
    function createXHR() {
      if (typeof XMLHttpRequest !== undefined) {
        return new XMLHttpRequest();
      }
      throw new Error('不⽀持 xhr 相关内容');
    }
    var xhr = createXHR();
    xhr.onreadystatechange = function () {
      console.log(xhr);
      if (xhr.readyState !== 4) return;
      var options = {
        status: xhr.status,
        statusText: xhr.statusText
      };
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      var response = {
        status: options.status || 200,
        statusText: options.statusText || 'ok',
        ok: options.status >= 200 && options.status < 300,
        text() {
          if (typeof body === 'string') {
            return Promise.resolve(body);
          }
        },
        json() {
          return this.text().then(JSON.parse);
        }
      };
      resolve(response);
    }
    xhr.open(config.method || 'get', url, true);
    xhr.send();
  });
}
```