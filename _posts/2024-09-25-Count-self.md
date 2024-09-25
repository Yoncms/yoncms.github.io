---
layout: post
title: 100以内的加减计算-出题
---
<pre>
import random
import json

arr = []

for i in range(1, 853):
    x = random.randint(2, 99)
    y = random.randint(1, 99)
    if x<10 and y<10:
        arr.append(f'{x}×{y}=')
    elif x > y:
        arr.append(f'{x}-{y}=')
    else:
        arr.append(f'{x}+{y}=')


for i in range(1, 249):
    x = random.randint(2, 9)
    y = random.randint(1, 9)
    arr.append(f'{x}×{y}=')

random.shuffle(arr)
string = ' '*32 +' 计  算\n'
n = 1
for x in arr:
    c = '' if n%5!=0 else '\n\n'
    l = len(x) if x.find('×')==-1 else len(x)+1
    bw = ' '*(13-l) if n%5!=0 else ''
    string+=f'{x}{bw}{c}'
    n+=1

string = string.strip('\n')
with open(f'count{str(random.random())[2:6]}.doc', 'w', encoding='utf-8')as f:
    f.write(string)

print('> 出题完成')
</pre>
