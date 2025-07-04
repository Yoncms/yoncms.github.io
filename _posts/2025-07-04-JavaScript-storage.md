---
layout: post
title: "JavaScript的当前页监听localStorage"
date: 2025-07-04
categories: 技术
tags: [JavaScript, storage, 博客]
featured_image: /assets/images/article32.jpg
---

# JavaScript的当前页监听localStorage值的变化

<pre>
自定义监听localStorage的方法，<!--more-->可以在本页面中监听storage的变化；
通常在当前页修改localStorage的值，默认是监听不到localStorage</p>
的变化，如果需要监听，就要对它进行触发。需要这么做，通常是因为
页面会刷新，要是只是设置个全局变量的话，页面一刷新就会被初始化。</p>

文件1.html

<script>
const $x = (args, single=0)=>{
    let tf = typeof args;
    if(tf == 'function') {
        window.addEventListener('load', ()=>{
            args();
        });
        return;
    }
    if(tf == 'string') {
        if((args.includes('#') && (args.includes('\\ ') || !args.includes(' ')))||single==1) {
            return document.querySelector(args);
        }
        return document.querySelectorAll(args);
    }
};

const myLocal = {
    setItem: function (key, value, single=0) {
        if(!single){
            window.dispatchEvent(new CustomEvent('myStorage', {
                detail:{key, value}
            }));
        }
        localStorage.setItem(key, value);
    },
    removeItem: function (key) {
        window.dispatchEvent(new CustomEvent('myStorage', {
            detail:{key}
        }));
        localStorage.removeItem(key);
    },
    getItem: function (key, single=0) {
        const value = localStorage.getItem(key);
        if(!single){
            window.dispatchEvent(new CustomEvent('myStorage', {
                detail:{key, value}
            }));
        }
        return value;
    }
};

let i = 0;

let timer = setInterval(function(){

    localStorage.setItem('namex', i);

    // 如果把这句代码注释掉，下面的代码是监听不到namex的变化的
    myLocal.setItem('names', 'zhangrongquansssss'+(i+32134));

    if(i >= 5) return clearInterval(timer);

    i++;
}, 1000);

// 这样做是监听不到当前页里对localStorage的改变的，
// 只能监听到同源的别的页面对localStorage的改变；
 window.addEventListener('storage', function(e){
     let {key, oldValue, newValue} = e;
     console.log(key, oldValue, newValue);
     
    // 如果需要这里也可以获取到names，只要namex的值有变化；
    // 获取的方法可以使用localStorage.getItem
    console.log(localStorage.getItem('names'));
 });

// 这里就可以监听到了
window.addEventListener('myStorage', function(e){
    let ed = e.detail;
    // 因为names的值变化了，所以就被监听到了，因此键和值
    // 就可以直接获取到了，而不是通过getItem去获取。
    console.log('> myLocal', ed.key);
    console.log('>> myLocal', ed.value);
  
    // 如果上面的names值没有变化，这里是监听不到的,
    // 这里能获取到namex的值的变化，是因为names的值变了，
    // 而且这里也不是监听到namex的变化了，而是因为names值变了
    // 被监听到了，因此函数被执行了，而这句代码就在函数里，所以
    // 也被执行了，而它的执行结果是获取namex的值。
    console.log('>>> localstorage', localStorage.getItem('namex'));
});

文件2.html

<div class='dc'>1111</div>
<div class='dc'>2222</div>
<div class='dc'>3333</div>
<div class='dc'>4444</div>
<div class='dc'>5555</div>
<div class='dc'>6666</div>
<div class='dc'>7777</div>
<script>
const $x = (args, single=0)=>{
    let tf = typeof args;
    if(tf == 'function') {
        window.addEventListener('load', ()=>{
            args();
        });
        return;
    }
    if(tf == 'string') {
        if((args.includes('#') && (args.includes('\\ ') || !args.includes(' ')))||single==1) {
            return document.querySelector(args);
        }
        return document.querySelectorAll(args);
    }
};

let i = 1;
var times = setInterval(()=>{
    localStorage.setItem('namex', 'zhangrongquan'+i);
    if(i >= 10) return clearInterval(times);
    i++;
}, 1000);

 window.addEventListener('storage', function(e){
     let {key, oldValue, newValue} = e;
     if(key=='names')return;
     console.log('>>>>>', key, oldValue, newValue);
     let em = $x('.dc');
     em[newValue % 7].style.fontSize = '30px';
 });
</script>
</pre>