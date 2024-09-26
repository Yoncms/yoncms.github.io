---
layout: base
title: 网络人才培训利用playwright登录答题
---
## getimgleft.py
<pre>
import cv2

def show(name):
    '''展示圈出来的位置'''
    cv2.imshow('Show', name)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def _tran_canny(image):
    """消除噪声"""
    image = cv2.GaussianBlur(image, (3, 3), 0)
    return cv2.Canny(image, 50, 150)

def detect_displacement(img_slider_path, image_background_path):
    """detect displacement"""
    # # 参数0是灰度模式
    image = cv2.imread(img_slider_path, 0)
    template = cv2.imread(image_background_path, 0)

    # 寻找最佳匹配
    res = cv2.matchTemplate(_tran_canny(image), _tran_canny(template), cv2.TM_CCOEFF_NORMED)
    # 最小值，最大值，并得到最小值, 最大值的索引
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
    top_left = max_loc[0]  # 横坐标
    # # 展示圈出来的区域！如果不需要展示图片，只是要获取left的位置，下面几句代码就注释掉
    # x, y = max_loc  # 获取x,y位置坐标
    #
    # w, h = image.shape[::-1]  # 宽高
    # cv2.rectangle(template, (x, y), (x + w, y + h), (7, 249, 151), 2)
    # show(template)
    return int(top_left)
</pre>
## playwrightExam.py
<pre>
from playwright.sync_api import sync_playwright
from PIL import Image
from getimgleft import detect_displacement
from fake_useragent import UserAgent
import json
import requests
import random
import re
from threading import Thread
import time

print('>>>>程序开始运行......')

#参数args=['--start-maximized']和no_viewport=True是使浏览器打开时最大化
bsr = sync_playwright().start().chromium
'''
playwright可以指定开启什么浏览器，添加参数executable_path来指定
'''
maxStart = '--start-maximized'  # 与启动时最大化窗口有关
'''
# appPath = 'H:\chrome\chrome.exe'  # chromiun纯净，但是有些功能无法使用，比如有些在线的视频
'''
appPath = 'H:\Chrome\chrome.exe'
bsr = bsr.launch(channel='chrome', headless=True, args=[maxStart], executable_path=appPath)
# 窗口最大化还须加上参数no_viewport=True
content = bsr.new_context(no_viewport=True)

# 截图方法
def get_img(page, display, n):
    page.evaluate('document.querySelector("#dragBoxRegist > div > div.ui-slider-img-panel\
        > img.ui-slider-img-drag").style.display="' + display + '"')
    img = page.locator('//*[@id="dragBoxRegist"]/div/div[1]/img[' + str(n) + ']')
    if n == 2:
        paths = 'background.png'
    else:
        paths = 'target.png'
    img.screenshot(path = paths)
    Image.open(paths).convert('RGB')

while True:
    page = content.new_page()

    page.goto('https://fj.rcpxpt.com/singleLoginPage?id=yongchun')

    print('>>>>正在登录......')

    with open('peixun/user.json', 'r', encoding='utf-8') as f:
        userInfo = json.load(f)

    rand = random.randint(0, len(userInfo)-1)

    userInfo = userInfo[rand]

    print('>>>>', userInfo)

    page.fill('//*[@id="login_account"]', userInfo['user'])
    page.fill('[name="password"]', userInfo['psw'])

    page.wait_for_timeout(800)

    drag = page.locator('//*[@id="dragBoxRegist"]/div/div[4]')

    drag = drag.bounding_box()

    x, y = int(drag['x']), int(drag['y'])

    page.mouse.move(x, y)

    page.mouse.down()

    page.wait_for_timeout(800)

    # 截取背景图时要把目标图块隐藏
    get_img(page, 'none', 2)

    # 背景图截取完后，再打开目标图进行截取
    get_img(page, 'block', 3)

    page.wait_for_timeout(100)

    top_left = detect_displacement("target.png", "background.png")

    print('>>>>Left：', top_left)

    if top_left == 0:
        page.close()

    x += top_left
    page.wait_for_timeout(500)
    page.mouse.move(x, y)
    page.wait_for_timeout(200)
    page.mouse.up()

    if (page.locator(r'//*[@id="dragBoxRegist"]/div/div[3]/div').inner_text() == '验证成功'):
        page.locator(r'//*[@id="login_submit"]').click()
        print('>>>>程序正在继续，请稍等...')
        page.wait_for_timeout(3000)
        break
    else:
        page.close()

# #######################################################################################  
# 重要提示：
# #######################################################################################  
# 登录完成之后，在获取cookies之前必须延时几秒钟，否则获取不到accout_token，只能获取到部分cookie  
# #######################################################################################   
storage = content.storage_state(path='peixun/cook.json')

cook = {x['name']:x['value'] for x in storage['cookies']}

print('>>>>开始答题......')

hd = {'Host': 'fj.rcpxpt.com','User-Agent':UserAgent().random}

host = 'https://fj.rcpxpt.com/tikuUserBatch/'
url = f'{host}toCourseChaTopic/19202/1327924'

# 获取答题的信息：
res = requests.get(url, headers=hd, cookies=cook)

res.encoding='utf-8'

res = res.text

exerid = re.findall('var exerciseId = (\d+);', res)

if exerid != []:
    exerid = exerid[0]
else:
    exit('>>>>信息有误，停止运行！')

topid = re.findall('<strong topicId="(\d+)" class=', res)

# 答题
url = f'{host}submitAnswer'

with open('peixun/result_id.json', encoding='utf-8')as fid:
    asw = json.load(fid)

data = {'id':'', 'userExerciseId':exerid}

def foo(x):
    data['topicId'] = x
    data['userAnswer'] = asw[x]
    print(x)
    requests.post(url, headers=hd, cookies=cook, data=data)

trr = []
for x in topid:
    t = Thread(target=foo, args=(x,))
    t.start()
    trr.append(t)
    time.sleep(0.01)
[x.join() for x in trr]
print('>>>> 等待结果......')

# 交卷   

url = f'{host}topicSuccess?id={exerid}&usedTime=100&testId=19202&commid=1327924&examId=0&paperId=56341'
res = requests.get(url, headers=hd, cookies=cook)
res.encoding='utf-8'
res = res.text
res = re.findall('本次您的测验得分是： <span>(.+?)</span>', res)[0]
exit(f'>>>>本次测试得分是：{res}')
</pre>
