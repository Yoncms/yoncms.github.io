---
layout: post
title: "正则之前瞻后顾"
date: 2025-05-23
categories: 技术
tags: [正则, Python, 博客]
featured_image: /assets/images/article24.jpg
---
# 正则之前瞻后顾
<pre>
import re  
import random  

# 小写的a-z的ascii码是97-122，大写的A-Z的ASCII是65-90
<!--more-->
letters = [chr(i) for i in range(97, 123)]*3

# random.shuffle(letters)

letters = ''.join(letters)
print(letters)

# 非捕获组
r = re.findall(r'(?:x).{1,3}', letters)
print(r)

# 前瞻：匹配字母x前面的3个字符
r = re.findall(r'.{3}(?=x)', letters)
print(r)

# 后顾：匹配字母x后面的3个字符
r = re.findall(r'(?<=x).{3}', letters)
print(r)

# 负前瞻：匹配后面不是x的3个字符
r = re.findall(r'.{3}(?!x)', letters)
print(r)

# 负后顾：匹配前面不是x的3个字符
r = re.findall(r'(?<!x).{3}', letters)
print(r)
</pre>