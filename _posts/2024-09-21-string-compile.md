---
layout: post
title:"通过为运算符的与或比较字符串"
---
s1 = '忽略大小写后字符串不相等'
s2 = '忽略大000小写后xx,字符串不相等'
s3 = '忽略大000a小写后xx,字符串不相等'

a = {
    '忽略大小写后字符串不相等':'ABC',
    '忽略大000小写后xx,字符串不相等':'BEF'
}

# print(set(s1) ^ set(s2))

def comstr(s1, s2, obj):
    if s1 not in obj and s2 not in obj:
        return None
    return obj[s1] if (set(s1) ^ set(s2)) == set() else obj[s1] if s1 in obj else obj[s2]

print(comstr(s3, s2, a))

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

