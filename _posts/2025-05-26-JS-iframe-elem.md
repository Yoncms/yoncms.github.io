---
layout: post
title: "JavaScript获取嵌套在iframe里的video标签"
date: 2025-05-26
categories: 技术
tags: [JavaScript, iframe, 博客]
featured_image: /assets/images/article26.jpg
---
# JavaScript获取嵌套在iframe里的video标签
<pre>
// 如果video是嵌套在iframe中的，可以使用以<!-- more -->下方法获取video标签：
// 获取iframe元素
let iframe = document.querySelector('iframe');
// 确保iframe和主页面在同一个域下
if (iframe && iframe.contentDocument) {
    // 访问iframe的内容文档
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // 查找iframe中的video标签
    let video = iframeDocument.querySelector('video');

    if (video) {
        console.log('找到video标签:', video);
        // 你可以在这里对video标签进行操作
        video.playbackRate = 16;
        video.play();
    } else {
        console.log('未找到video标签');
    }
} else {
    console.log('无法访问iframe内容');
}
</pre>