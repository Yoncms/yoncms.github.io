---
layout: base
title: Python+Selenium
---
<pre>
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json

options = webdriver.ChromeOptions()

# 如果报错：unknown error: cannot find Chrome binary
# 就是打不开浏览器就加上下面一句代码，指定浏览器的路径
options.binary_location = r'D:\ChromeBin\chrome.exe'

options.add_experimental_option('excludeSwitches', ['enable-logging'])

#隐藏浏览器
options.add_argument('--headless')

# 创建对象，参数options=options是用来屏蔽一个消息的
driver = webdriver.Chrome(options=options)

# 浏览器打开后自动全屏
driver.maximize_window()

driver.get('https://XXXXXXXX')

time.sleep(0.5)

# 用户名和密码，从文件里读取
with open('user.json', 'r', encoding='utf-8') as f:
    userPsw = json.load(f)

driver.find_element_by_id('login_account').send_keys(userPsw['user3'])
driver.find_element_by_id('login_password').send_keys(userPsw['psw3'])
</pre>
