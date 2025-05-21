---
layout: post
title: "Burpsuite通过代理抓包"
date: 2025-05-21
categories: 技术
tags: [burpsuite, 抓包, 代理, 博客]
featured_image: /assets/images/article21.jpg
---
# Burpsuite通过代理抓包

<pre>
   1. 在使用burpsuite抓包时，如果同时还开启了代理，就要在burpsuite的<!--more-->setting->user

   2. ->network->connections->SOCKS proxy->选中Use SOCKS proxy->host:127.0.0.1

   3. ->port:(端口号10808)；如果不设置SOCKS proxy，也可以设置upstream proxy server，

   4. add：127.0.0.1：端口号10808；proxy listeners的端口号要与浏览器的代理端口号相同为：8080
</pre>