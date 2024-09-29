---
layout: base
title: 小学元角分计算出题
---
<pre>
import random

end = 20

l = [0]

# 在数字后面加上单位元或角
def fo(w, f=0):
    ar = (('元', '角'), ('角','分'))
    # 角不能大于9
    x = 0 if end==20 else 1
    s = ar[x][0] if f==0 else ar[x][1]
    ss = str(w)+s
    z = ss if w!=0 else ''
    l[0] += 0 if z=='' else len(ss)+2
    return z

def setarr(arr):
    lt = []
    for i in range(4):
        x = arr[i]
        if i>1:
            x = 0 if x>9 else x
        lt.append(x)
    # print(lt)
    return lt

def res(arr):
    a,b,c,d = arr[0], arr[1], arr[2], arr[3]
    # 钱多的可以减少的，少的不能减多的，所以使用加法
    fh = '－' if a*10+c>b*10+d else '＋'
    l[0] = 0
    sr = fo(a)+fo(c,1)+fh+fo(b)+fo(d,1)+'='
    l[0] += 2
    return sr

stts = ''
for _ in range(129):
    arr = list(range(1, end))
    random.shuffle(arr)
    arr = arr[:4]
    arr = setarr(arr)
    stts += res(arr)
    #单个式子最长位18个字符，为了对齐统一增加到26个字符
    i = 24 - l[0]
    if (_+1) % 3 !=0:
        stts += ' ' * i
    if (_+1) % 3 == 0 and _ != 0:
        stts += '\n\n'

strs = stts.strip('\n')
with open(str(random.randint(10000,99999))+'.doc','w') as f:
    f.write(stts)
</pre>
