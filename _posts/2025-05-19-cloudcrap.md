---
layout: post
title: "如何绕过cloudfire反爬"
date: 2025-05-19
categories: 学习
tags: [Python, 反爬, 博客]
featured_image: /assets/images/article5.jpg
---
# 如何绕过cloudfire反爬
<pre>
 import cloudscraper
# cloudscraper的使用

# 最简单：使用cloudscraper就不再需要User-Agent 伪装
 scraper = cloudscraper.create_scraper()

# 可以自定义User-Agent伪装成特定的浏览器（一般不需要）：
 self.csc = cloudscraper.create_scraper(
     browser={'browser': 'chrome', 'platform': 'windows', 'mobile': False}
 )

# 或者手动指定 User-Agent：
# self.csc.headers.update({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})

# 如果已经有一个 requests.Session，可以让 cloudscraper 兼容：

 import requests

 session = requests.Session()
 scraper = cloudscraper.create_scraper(sess=session)
 response = scraper.get("https://example.com")
 print(response.text)
</pre>