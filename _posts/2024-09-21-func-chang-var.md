---
layout: post
title: "函数能改变函数外的列表或字典等类型的数据"
---

# 在函数里能改变函数外的字典和列表的数据
# 但是不能改变普通变量的值

arr = []
s = 10
def st(a):
    # 这里会往列表里添加元素
    arr.append(a)
    # 这里不会改变函数外s的值
    s = 345

def ss(a, b):
    arr[a] = b

st(100)
print(arr)

st(122)
print(arr)

st(102)
print(arr)

st(110)
print(arr)

ss(1, 23232)
print(arr)

print(s)

{% comment %}
Might you have an include in your theme? Why not try it here!
{% include my-themes-great-include.html %}
{% endcomment %}

