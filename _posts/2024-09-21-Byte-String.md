---
layout: post
title: Python的Byte和string互转
---
<pre>
'''
python的bytes时字节串，str时字符串，相差一个字，意思不一样;
字节串（bytes）：字节串是由0-255范围内的整数构成的序列，用于在
程序中处理8位字节数据。字节串通常用于处理二进制数据，如文件、网
络数据等。字节串是不可变的，这意味着你不能更改字节串中的元素。在
Python中，你可以通过前缀b或B来表示一个字节串，例如b"Hello"。
但是如果字节串里有非ASCII字符则报错，比如含有汉字b'Hello 张'。
这时候可以使用encode函数来转换，包括对变量的转换，也可以使用encode
'''

s = 'zhangrongquan'

# 字符串转字节串，作用与b'zhangrongquan张'一样
s1 = s.encode()
# bytes
print(s1, type(s1))

print('-'*40)

s2 = b'zhangrongquan'

# bytes
print(s2, type(s2))

print('-'*40)

print(s1==s2)

print('-'*40)

# bytes转str
print(s1.decode(), s2.decode())

print('-'*40)

# 含有非ASCII字符的字符串
# b'zhang更改' 这种写法是错误的

r = 'zhang更改'

r1 = r.encode()  # 这才可以

# bytes
print(type(r1))

print('-'*40)

import base64

# 字符串不能进行base64加密，必须转成bytes字节串才可以
# r2 = base64.b64encode(r) 这是错误的
r2 = base64.b64encode(r.encode()) # 必须这么写

r3 = base64.b64encode(b'zhangrongquan')

# 结果是字节串
print(r2, r3)

print('-'*40)

r22 = r2.decode()

r33 = r3.decode()

# 转换后结果是字符串
print(r22, r33)

print('-'*40)

# 解密的时候字节串或字符串都可以，其结果都是bytes类型的

r222 = base64.b64decode(r2)

r333 = base64.b64decode(r3)

print(r222, r333)

print('-'*40)

r222 = base64.b64decode(r22)

r333 = base64.b64decode(r33)

print(r222, r333)

print('-'*40)

print(base64.b64decode('emhhbmfkvIrlh6E=').decode())
      
print('-'*40)    

print(base64.b64decode(b'emhhbmfkvIrlh6E=').decode())

print('-'*40)

print(base64.b64decode('emhhbmdyb25ncXVhbg==').decode())

print('-'*40)

print(base64.b64decode(b'emhhbmdyb25ncXVhbg==').decode())
</pre>
