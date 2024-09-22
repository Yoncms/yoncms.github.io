---
layout: post
title: 手动往session添加cookies信息
---
<pre>
'''
不是通过用户信息登录时，session不能加载相关的cookies，
可以通过以下方法，手动把cookies添加到session里
'''
# 先创建对象
ck = requests.cookies.RequestsCookieJar()
  
# 往对象里添加一个元素
ck.set('键名', 键值)

# 创建session对象
ses = requests.session()

# 把ck对象添加到session对象里
ses.cookies.update(ck)
#这时的session对象里就包含了我们所需要的信息了

> 或者如下方法：
# 将CookieJar转为字典：
cookies_dict = requests.utils.dict_from_cookiejar(resp.cookies)

# 将字典转为CookieJar：
cookies = requests.utils.cookiejar_from_dict(cookie_dict, cookiejar=None, overwrite=True)
# 其中cookie_dict是要转换字典

# 转换完之后就可以把它赋给cookies 并传入到session中了：
session = requests.Session()
session.cookies = cookies
</pre>
