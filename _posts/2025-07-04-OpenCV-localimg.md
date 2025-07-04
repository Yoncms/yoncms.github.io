---
layout: post
title: "OpenCV操作保存到本地的图片数据"
date: 2025-07-04
categories: 技术
tags: [OpenCV, image, 博客]
featured_image: /assets/images/article35.jpg
---

# OpenCV操作保存到本地的图片数据

<pre>
# 读取本地图片，使用的是<!--more-->cv2.imread方法
image = cv2.imread('img/xxx.jpg, 0)
# """消除噪声"""
image = cv2.GaussianBlur(image, (3, 3), 0)
res = cv2.Canny(image, 50, 150)
</pre>