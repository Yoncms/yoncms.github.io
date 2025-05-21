---
layout: post
title: "Chrome扩展v3的脚本注入"
date: 2025-05-19
categories: 技术
tags: [manifest, Python, 博客]
featured_image: /assets/images/article8.jpg
---
# Chrome扩展v3的脚本注入
<pre>
(function(){
    // 获取body节点
    const bodyElement = document.querySelector('body');
<!--more-->   
    // 注入脚本到页面
    function injectScripts(scriptFiles) {
        if (!bodyElement) {
            console.error('无法找到body元素');
            return;
        }      
        scriptFiles.forEach(file => {
            file = file + '.js';
            try {
                const scriptElement = document.createElement('script');
                scriptElement.type = 'text/javascript';
                scriptElement.src = chrome.runtime.getURL(file);
                bodyElement.appendChild(scriptElement);
                console.log(`脚本 ${file} 已注入`);
            } catch (error) {
                console.error(`注入脚本 ${file} 时出错:`, error);
            }
        });
    }
    
    // 注入所需脚本
    injectScripts([
	'selector', 
	'login', 
	'executex'
    ]);
})();
</pre>