---
layout: post
title: "OpenCV直接操作返回的二进制图片数据"
date: 2025-07-04
categories: 技术
tags: [JavaScript, Event, 博客]
featured_image: /assets/images/article31.jpg
---
# OpenCV直接操作返回的二进制图片数据

<pre>
def imgRead(data):<!--more-->
	# print('>>>>>>>>', data)
	# 直接把二进制转成numpy数组
	img_array = np.frombuffer(data, np.uint8)  
	# 解码成图片矩阵（BGR格式）
	img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
	# 图片变成灰度图     
	img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	return img

# 拿到图片，不把图片保存到本地而是直接使用
def getimg(url):
        # url是图片的网址
        res = requests.get(url)
        return imgRead(res)

def _tran_canny(url):
        # """消除噪声"""
        image = cv2.GaussianBlur(getimg(url), (3, 3), 0)
        return cv2.Canny(image, 50, 150)
</pre>