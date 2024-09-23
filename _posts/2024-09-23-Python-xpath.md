---
layout: base
title: Python爬虫之xpath语法
---
**Xpath语法介绍**

*路径常用规则*
<pre>
表达式         描述                       实例
nodename    选取此节点的所有子节点         xpath(‘//div’)       选取了div节点的所有子节点
/           从根节点选取                   xpath(‘/div’)        从根节点上选取div节点
//          选取所有当前节点，不考虑位置   xpath(‘//div’)       选取所有的div节点
.           选取当前节点                   xpath(‘./div’)       选取当前节点下的div节点
..          选取当前节点的父节点           xpath(‘..’)          回到上一个节点
@           选取属性                       xpath（’//@calss’）  选取所有的class属性
</pre>
**谓语规则**

*谓语被嵌在方括号内，用来查找某个特定的节点或包含某个制定的值的节点*
<pre>
表达式                                  结果
xpath(‘/body/div1’)                选取body下的第一个div节点
xpath(‘/body/divlast()’)           选取body下最后一个div节点
xpath(‘/body/divlast()-1’)         选取body下倒数第二个div节点
xpath(‘/body/divpositon()❤️’)     选取body下前两个div节点
xpath(‘/body/div@class’)           选取body下带有class属性的div节点
xpath(‘/body/div@class=”main”’)  选取body下class属性为main的div节点
xpath(‘/body/divprice>35.00’)      选取body下price元素值大于35的div节点
</pre>
**通配符**  

*通配符来选取未知的XML元素*
<pre>
表达式                             结果
xpath（’/div/*’）                选取div下的所有子节点
xpath(‘/div@*’)                  选取所有带属性的div节点
</pre>
**取多个路径**  

*使用“|”运算符可以选取多个路径*
<pre>
表达式                                结果
xpath(‘//div|//table’)            选取所有的div和table节点
</pre>
**功能函数**

*使用功能函数能够更好的进行模糊搜索*
<pre>
函数                   用法                                                   解释
starts-with   xpath(‘//divstarts-with(@id,”ma”)’)                         选取id值以ma开头的div节点
contains      xpath(‘//divcontains(@id,”ma”)’)                            选取id值包含ma的div节点
and           xpath(‘//divcontains(@id,”ma”) and contains(@id,”in”)’)   选取id值包含ma和in的div节点
text()        xpath(‘//divcontains(text(),”ma”)’)                         选取节点文本包含ma的div节点
</pre>
