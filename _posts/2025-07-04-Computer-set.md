---
layout: post
title: "家用电脑应用的一些设置"
date: 2025-07-04
categories: 技术
tags: [computer, 设置, 博客]
featured_image: /assets/images/article38.jpg
---
# 家用电脑应用的一些设置

<pre>
#### 系统自检、自动修复方法（只能修复一些小问题）
sfc /scannow    #### 中间有个空格符

通过cmd指定目录安装：<!--more-->xxxx.exe /DIR="盘符:\xxx\xxx

#### 设置默认程序的安装路径
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion。 
然后找到：CommonFilerDir这个项。 然后双击：CommonFilerDir项。 最后把数值数据改为：H:\Program Files。

chrome或edge浏览器的设置：
#### chrome无痕模式
 --incognito 
#### 关闭设置默认浏览器的提问
 -no-default-browser-check
#### 指定缓存目录
 --user-data-dir="H:\banjb\userData"
#### 想要默认打开一个网页，直接把网页的地址（可以是本地地址）写在后面就可以
#### 取消chrome的无法升级提示：
 --disable-background-networking

#### 转移应用的缓存
1. 关闭微信
2. 把 `C:\Users\<你>\AppData\Local\Tencent\WeChat` 移动到 D:\WeChatData
3. 打开管理员命令行，执行：
   mklink /D "C:\Users\<你>\AppData\Local\Tencent\WeChat" "D:\WeChatDat
4. 创建一个快捷键，快捷键指向的是目标路径里的程序。

#### 旧版 QQ（Win7/Win10）：
C:\Users\<用户名>\Documents\Tencent Files
新版 QQ（官方新版重构后）：
C:\Users\<用户名>\AppData\Local\Tencent\QQ
✅ 通常只需迁移 Documents\Tencent Files 就能释放大量聊天数据占用。

#### 以安全模式启动word：在运行输入winword /safe

#### 禁用 JavaScript
在 开发者工具 打开时，按 Ctrl + Shift + P，找到Disable JavaScript或禁止javascript，点击它。
</pre>