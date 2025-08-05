---
layout: post
title: "JS把子节点的事件绑定到父节点"
date: 2025-08-05
categories: 技术
tags: [JavaScript, Event, 博客]
featured_image: /assets/images/article43.jpg
---
# JavaScript把子节点的事件绑定到父节点
<pre>
<div id="out"style="background:#efe"><!--more-->
    <div id="div1"class='sdiv'data-ddd='myself'>1</div>
    <div id="div2"class='sdiv'data-ddd='youself'>2</div>
    <div id="div3"class='sdiv'data-ddd='xxself'>3</div>
    <div class='sdiv'data-ddd='xxsxxx'>4</div>
    <div class='sdiv'data-xddd='xxwww'zhang-rong='quan'>5</div>
</div>
<script>
    let obj = document.querySelector('#out');
    obj.onclick = function(e){
        if (e.target && e.target.matches('div')) {
            // 处理子元素的点击事件
            console.log('子元素被点击:', e.target.textContent);
            // 处理子元素的点击事件
            console.log('子元素被点击:', e.target.innerHTML);
            // 处理子元素的点击事件
            console.log('子元素被点击:', e.target.id);
            // 处理子元素的点击事件
            console.log('子元素被点击:', e.target.className);
            // 用于遍历元素的所有属性
            console.log('子元素被点击:', e.target.attributes);
            // 用于访问和操作元素的自定义数据属性
            console.log('子元素被点击:', e.target.dataset, e.target.getAttribute('zhang-rong'));
            let ems = this.querySelectorAll('.sdiv');
            let leng = ems.length;
            for(let i=0; i<leng; i++){
                ems[i].style.background ='#efe';
            }
            e.target.style.background = 'red';
        }
    };
</script>
</pre>