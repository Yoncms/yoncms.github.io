---
layout: post
title: "ffmpeg生成适合网页快速播放的视频文件"
date: 2025-07-04
categories: 技术
tags: [JavaScript, storage, 博客]
featured_image: /assets/images/article33.jpg
---
# ffmpeg生成适合网页快速播放的视频文件
<pre>
@echo off
chcp 65001 >nul<!--more-->
setlocal enabledelayedexpansion
@echo off
REM 设置工作目录（可选），否则默认当前目录
set "WORKDIR=%cd%"
cd /d "%WORKDIR%"

for %%F in (*.mp4) do (
    @echo 正在处理：%%F
    REM  -c:v h264_nvenc的作用是启用GPU编码，提高视频的处理效率
    @ffmpeg -i "%%F" -c:v h264_nvenc -movflags faststart "converted_%%F" -y -loglevel error
    @if exist "converted_%%F" (
        @del "%%F"
        @ren "converted_%%F" "%%F"
        @echo 已完成：%%F
    ) else (
        @echo 转换失败：%%F
    )
)

@echo 所有文件处理完成
@pause
</pre>