---
layout: post
title: Javascript的创建、初始化、派遣事件
---
<pre>
1、createEvent()
createEvent()方法返回新创建的Event对象，支持一个参数，表示事件类型，如下：

参数	           事件接口	      初始化方法
HTMLEvents	  HTMLEvent	     initEvent()
MouseEvents	  MouseEvent	   initMouseEvent
UIEvents	    UIEvent	       initUIEvent
2、initEvent()
initEvent()方法用于初始化通过DocumentEvent接口创建的Event的值。

支持三个参数：initEvent(eventName, canBubble, preventDefault)
分别表示：事件名称  是否可以冒泡  是否阻止事件的默认操作
  
3、dispatchEvent()
dispatchEvent()就是触发执行了，dom.dispatchEvent(eventObject)
参数eventObject表示事件对象，是createEvent()方法返回的创建的Event对象。
  
var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    document.getElementById("imgLogin").addEventListener("click",function(){
        console.log("我是jquery");
    })
    document.getElementById("imgLogin").dispatchEvent(evt);
</pre>
