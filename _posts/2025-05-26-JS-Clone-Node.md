---
layout: post
title: "JavaScript克隆节点"
date: 2025-05-23
categories: 技术
tags: [正则, Python, 博客]
featured_image: /assets/images/article25.jpg
---
# JavaScript克隆节点
<pre>
let video = document.querySelector('video');
let clone = video.cloneNode(true);<!--more-->
video.parentNode.replaceChild(clone, video);

// 也可以使用以下方法替换
// video.replaceWith(clone);

clone.playbackRate = 16;
clone.play();

// 如果克隆无效可以修改视频源
clone.src = clone.currentSrc;
clone.playbackRate = 16;
clone.play()
</pre>