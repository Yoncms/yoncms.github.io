---
layout: post
title: Web页面刷新的几种方法
---
## 页面自动刷新：把如下代码加入<head>区域中

&lt;meta http-equiv="refresh" content="5"&gt;

其中5指每隔5秒刷新一次页面.

## 页面自动跳转：把如下代码加入<head>区域中

&lt;meta http-equiv="refresh" content="5;url=http://www.baidu.com">

其中5指隔5秒后跳转到http://www.baidu.com页面

3，页面自动刷新js版

&lt;script language="JavaScript">
  
function myrefresh()
  
{
  
   window.location.reload();
  
}
  
setTimeout('myrefresh()',1000); //指定1秒刷新一次
  
&lt;/script>

## JS刷新框架的脚本语句

//刷新包含该框架的页面用 

&lt;script language=JavaScript>
  
   parent.location.reload();
  
&lt;/script>

//子窗口刷新父窗口

&lt;script language=JavaScript>
  
    self.opener.location.reload();
  
&lt;/script>

(或&lt;a href="javascript:opener.location.reload()">刷新&lt;/a>   )

//刷新另一个框架的页面用

&lt;script language=JavaScript>
  
   parent.另一FrameID.location.reload();
  
&lt;/script>

如果想关闭窗口时刷新或想开窗时刷新，在<body>中调用以下语句即可。

&lt;body onload="opener.location.reload()"> 开窗时刷新
  
&lt;body onUnload="opener.location.reload()"> 关闭时刷新
  
&lt;script language="javascript">
  
window.opener.document.location.reload

## Javascript刷新的几种方法
history.go(0) 

location.reload() 

location=location 

location.assign(location) 

document.execCommand('Refresh') 

window.navigate(location) 

location.replace(location) 

document.URL=location.href
