---
layout: post
title: JS中父页面frame与子页面frame之间页面元素的互相获取
---
<pre>
//在父页面获取子页面的frame
var pd = document.querySelector('frame').contentWindow;
var son = pd.document.querySelector('标签');

//子页面获取父页面
var sd = window.parent;
var pnode = sd.document.querySelector('标签');
</pre>
