---
layout: post
title: Python删除空格符的方法
---
<pre>
import re

s = 'slsdfda  kfw       		wasdf'

# 删除字符串力的空白时，要使用\s，而不是直接使用键盘打个空格符，
# 这样制表符Tab空格符才能被删除

# s = re.sub(' +', '', s)   # 这样是无法彻底删除掉字符串里的空白的

s = re.sub('\s+','',s)      # 这种方法才能彻底删除掉字符串里的空白

print(s)
</pre>
