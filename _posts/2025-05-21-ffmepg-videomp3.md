---
layout: post
title: "ffmpeg音视频转换提取"
date: 2025-05-21
categories: 技术
tags: [ffmpeg, 音频提取, 视频转换, 博客]
featured_image: /assets/images/article20.jpg
---
# ffmpeg音视频转换提取
<pre>
ffmpeg视频转换命令：

   1. 基本命令：

   2. ffmpeg -i input.ts -c:v copy -c:a copy output.mp4
<!--more-->
   3. -c:v copy: 视频流直接复制，不重新编码，速度快且无损；-c:a copy: 音频流直接复制，不重新编码

   4. ffmpeg -i input.ts -c:v libx264 -c:a aac output.mp4

   5. -c:v libx264: 使用 H.264 编码器重新编码视频；-c:a aac: 使用 AAC 编码器重新编码音频

ffmpeg视频里提取音频：

   1. ffmpeg -i input.mp4 -q:a 0 -map a output.mp3

   2. 音频质量，0 是最高质量（可选）；-map a：只提取音频流
</pre>