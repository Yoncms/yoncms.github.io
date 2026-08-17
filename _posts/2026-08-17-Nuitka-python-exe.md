---
layout: post
title: "nuitka打包python成exe"
date: 2026-08-17
categories: 技术
tags: [nuitka, python, 博客]
featured_image: /assets/images/article48.jpg
---
nuitka打包后的exe文件，双击打开后遇到错误迅速退出，想要查看什么错误，可以在cmd窗口手动打开exe文件，不要
直接双击它就可以。

python -m nuitka --standalone --onefile your_program.py --enable-plugin=tk-inter  --enable-plugin=tk-inter

#### 如果不需要显示cmd小窗口，则添加参数：--windows-disable-console

#### 如果需要明确启用 tk-inter，在打包命令里加上这个参数：--enable-plugin=tk-inter

#### 有的库需要手动指定才能打包进去，则添加参数：--include-data-dir
如：
python -m nuitka --standalone --onefile tttt.py --include-data-dir=E:\Python312\Lib\site-packages\cloudscraper\user_agent=cloudscraper/user_agent；= 左边：你电脑上 user_agent 文件夹的实际路径= 右边：程序运行时，这个文件夹应该被放在哪个虚拟路径下你需要把 你的cloudscraper库路径 替换成你电脑上实际路径。


#### 如果遇到如下的错误：
[Errno 2] No such file or directory: 'C:\\Users\\banjb\\AppData\\Local\\Temp\\onefile_6380_193434_Ihyov8zey7g\\cloudscraper\\user_agent\\browsers.json'这是什么错误

这个错误很经典，几乎和 Nuitka 没什么关系。它其实是打包工具在运行时，找不到 cloudscraper 这个第三方库所需要的一个数据文件 browsers.json。

🕵️‍♂️ 错误原因分析
cloudscraper 库在运行时，会动态地去读取它自己的 user_agent/browsers.json 文件，来获取最新的浏览器用户代理（User-Agent）列表，以此模拟真实浏览器请求。你的 Nuitka 打包程序在 --onefile 模式下运行时，所有依赖都被解压到一个临时文件夹（错误信息里那个带 onefile_6380... 的路径）。Nuitka 没有自动将这个 json 数据文件包含进来，所以程序在临时目录里翻了个遍也找不到它，就报了这个错。

🛠️ 解决方案
既然知道是少了文件，那我们手动把它“塞”进打包程序里就行了。我们需要告诉 Nuitka，在打包时，把 cloudscraper 库中的这个数据文件夹原封不动地复制到它应该在的位置。

你需要使用 --include-data-dir 参数。

打包命令示例
python -m nuitka --standalone --onefile tttt.py --include-data-dir=E:\Python312\Lib\site-packages\cloudscraper\user_agent=cloudscraper/user_agent；= 左边：你电脑上 user_agent 文件夹的实际路径= 右边：程序运行时，这个文件夹应该被放在哪个虚拟路径下
你需要把 你的cloudscraper库路径 替换成你电脑上实际路径。通常它在你的 Python 安装目录下的 site-packages 文件夹里。

如果你是 Windows 用户，路径可能类似于 C:\Users\你的用户名\AppData\Local\Programs\Python\Python3xx\Lib\site-packages\cloudscraper\user_agent

如果你是 macOS/Linux 用户，路径可能类似于 /usr/local/lib/python3.x/site-packages/cloudscraper/user_agent

这个命令会告诉 Nuitka，把 cloudscraper 库里的 user_agent 整个文件夹复制到输出目录的 cloudscraper/user_agent 路径下，这样程序运行时就能找到了。

#### 如果打包后，模块无法加载就在打包命令里进行指定
python -m nuitka --standalone tttt.py --include-data-dir=E:\Python312\Lib\site-packages\cloudscraper\user_agent=cloudscraper/user_agent  --enable-plugin=tk-inter

#### 如果需要明确启用 tk-inter，在打包命令里加上这个参数
--enable-plugin=tk-inter

#### 给exe添加图标：
--windows-icon-from-ico=F:\pgnico\your_icon.ico
ico的尺寸一般：16x16, 24x24, 32x32, 48x48, 64x64, 96x96, 128x128, 256x256，可以多尺寸在同一张ico里

#### 下面是出现内存地址冲突时，通过VS tool解决的方法，先安装，再通过命令解决 
安装VS tool：
winget install -e --id Microsoft.VisualStudio.2022.BuildTools --override "--wait --passive --add Microsoft.VisualStudio.Component.VC.Tools.x86.x64 --add Microsoft.VisualStudio.Component.Windows11SDK.26100"

cd tttt.dist
"C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\14.44.35207\bin\Hostx64\x64\editbin.exe" /DYNAMICBASE python312.dll
tttt.exe
