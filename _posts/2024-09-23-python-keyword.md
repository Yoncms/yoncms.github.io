---
layout: base
title: Python的35个关键字说明
---
<pre>
<h2>Python 中共有 35 个关键字</h2>

import keyword
# 获取关键字列表
print(keyword.kwlist)

> and
布尔运算符，如果两个表达式均为 True，则返回 True，否则返回 False。
x = 9
y = 3
if x > 0 and y > 0:
    print("x 和 y 都是正数。")

> as
用于导入模块或包时并为其指定别名。
import numpy as np

> assert
用于测试，如果条件为 False，则引发异常。
x = -3
assert x > 0, "x 必须是一个正数。"

> async
用于定义异步函数。

async def fetch_data():
    # 函数代码
    pass

> await
用于等待异步函数完成。
async def main():
    data = await fetch_data()
    # 其他代码
    pass

> break
用于跳出循环。
for i in range(10):
    if i == 5:
        break
    print(i)

> class
用于定义类。
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

> continue
用于跳过循环的当前迭代的其余部分，然后继续进行下一次迭代。
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)

> def
用于定义函数。
def greet(name):
    print("Hello, " + name + "!")

> del
用于删除对象或元素。
x = 10
del x

> elif
在 if 语句中用于指定要测试的其他条件。
x = -3
if x > 0:
    print("x 是正数。")
elif x < 0:
    print("x 是负数。")
else:
    print("x 是零。")

> else
在 if 语句中，如果上述所有条件都是 False 时要执行的代码块。if
x = -5
if x > 0:
    print("x 是正数。")
else:
    print("x 不是正数。")

> except
在 try 语句中用于指定引发异常时要执行的代码块。
try:
    # 可能引发异常的代码
    pass
except SomeException:
    # 处理异常的代码
    pass

> False
表示布尔值。
x = False
if x == False:
    print("x is False.")

> finally
在 try 语句中用于指定将始终执行的代码块，无论是否引发异常。
try:
    # 可能引发异常的代码
    pass
except SomeException:
    # 处理异常的代码
    pass
finally:
    # 将始终执行的代码
    pass

> for
用于创建访问一系列元素的循环。
for i in range(10):
    print(i)

> from
用于从包或模块导入特定模块。
from math import pi

> global
用于将变量声明为全局变量。
x = 10
def increment():
    global x
    x += 1
print(X)

> if
选择结构，用于指定条件为 True 时要执行的代码块。
x = 9
if x > 0:
    print("x 是正数。")

> import
用于导入模块或包。
import math

> in
用于测试序列中是否包含元素。
my_list = [1,2,3,4,5,6,7]
x = 5
if x in my_list:
    print("x 在列表中。")

> is
用于测试两个对象是否相等。
x = None
if x is None:
    print("x is None.")

> lambda
用于创建匿名函数。
double = lambda x: x * 2

> None
表示 null 值。
x = None

> nonlocal
用于将变量声明为非局部变量。
def outer():
    x = 10
    def inner():
        nonlocal x
        x += 1
    inner()
    return x

> not
布尔运算符，用于否定布尔表达式。
x = False
if not x:
    print("x is False.")

> or
布尔运算符，用于组合两个布尔表达式。如果任一表达式为 True，则返回 True，否则返回 False。
x = 3
y = -5
if x > 0 or y > 0:
    print("x 或 y 或两者是正数。")

> pass
用作不执行任何操作的代码块的占位符。
def do_nothing():
    pass

> raise
用于引发异常。
raise ValueError("无效值。")

> return
用于退出函数并返回值。
def double(x):
    return x * 2

> True
表示布尔值。
x = True
if x == True:
    print("x is True.")

> try
用于指定要测试异常的代码块。
try:
    # 可能引发异常的代码
    pass
except SomeException:
    # 处理异常的代码
    pass

> while
用于创建循环，只要条件表达式为 True，继续循环。
x = 10
while x > 0:
    print(x)
    x -= 1

> with
用于创建管理代码块执行的上下文管理器。
with open("file.txt", "r") as f:
    data = f.read()

> yield
用于返回值并暂停函数的执行。该功能可以稍后从中断的地方恢复。
def infinite_sequence():
    i = 0
    while True:
        yield i
        i += 1
</pre>
