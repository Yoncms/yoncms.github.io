---
layout: post
title: "Python模拟滑块验并且证密码加密登录"
date: 2025-05-26
categories: 技术
tags: [Python, RSA, 博客]
featured_image: /assets/images/article27.jpg
---
# Python模拟滑块验并且证密码加密登录
<pre>
import requests
import random
import time
import json<!--more-->
import cv2
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
from fake_useragent import UserAgent

# 登录时需要滑块验证，密码加密使用到python的RSA加密

class seetv:
    bg = 'bg.png'
    slider = 'slider.png'
    trr = []
    vt = {}

    def __init__(self):
        # self.cpid = 28501    
        scheme = 'https://'
        self.host = host= f'{scheme}fj.rcpxpt.com/'
        self.url = f'{host}usersFront/userInfo'
        self.session = requests.session()

    @staticmethod
    def fwrite(fn, data):
        with open(fn, 'wb') as f:
            f.write(data)

    # 只有1个参数是没有参数的post，参数2是get的是get，否则是带参数的post
    def query(self, url, data=None, isjson=None):
        self.hd = {
            'Host': 'fj.rcpxpt.com',
            'User-Agent':UserAgent().random
        }
        ck = {'account_token_':''}
        if data != 'get':
            if data == None:
                res = self.session.post(url, headers=self.hd, cookies=ck)
            else:
                if isjson=='json':
                    res = self.session.post(url, headers=self.hd, json=data, cookies=ck)
                else:
                    res = self.session.post(url, headers=self.hd, data=data, cookies=ck)
        else:
            res = self.session.get(url, headers=self.hd, cookies=ck)
        res.encoding='utf-8'
        return res

    # 拿到背景图片，用来计算切块的left
    def getbg(self):
        t = int(time.time()*1000)
        url = f'{self.host}captcha/index/getImageCaptchaBase?dt={t}'
        res = self.query(url, 'get').content
        seetv.fwrite(self.bg, res)
    
    # 拿到滑块图片
    def getslider(self):
        t = int(time.time()*1000)
        url = f'{self.host}captcha/index/getImageCaptchaTar?dt={t}'
        res = self.query(url, 'get').content
        seetv.fwrite(self.slider, res)
    
    # 拿到top的值
    def getY(self):
        url = f'{self.host}captcha/index/getImgPositonY'
        res = self.query(url).text
        return res
    
    @staticmethod
    def _tran_canny(image):
        """消除噪声"""
        image = cv2.GaussianBlur(image, (3, 3), 0)
        return cv2.Canny(image, 50, 150)

    # 拿到left的值
    def getX(self):
        self.getbg()
        self.getslider()
        # # 参数0是灰度模式
        image = cv2.imread(self.slider, 0)
        template = cv2.imread(self.bg, 0)
        # 寻找最佳匹配
        res = cv2.matchTemplate(seetv._tran_canny(image), seetv._tran_canny(template), cv2.TM_CCOEFF_NORMED)
        # 最小值，最大值，并得到最小值, 最大值的索引  
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
        top_left = max_loc[0]  # 横坐标
        if top_left==0:
            self.getX()
        else:
            print('>> 拼图的x坐标值：', top_left)
            json = {
                'x': int(top_left),
                'y': self.getY()
            }
            return json
        
    # 密码的加密
    def encrypt(self, pw):
        # 这里使用的是JS的方法，需要先下载本地的js文件，并且要使用execjs模块
        # with open('jsrsasign.js', 'r', encoding='utf-8')as f:
        #     js = f.read()
        # ej = execjs.compile(js)
        # return ej.call('encryptDataKey', pw)
        # 这里使用的是Python公钥加密，公钥是固定的，不需要每次都获取
        gkey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNJ87EyNNhzGxhNHcUFtm7YeYnbpFBJWh34L2OQhyHksF1bkXkMMePBzSWj0KkSRaee4HkbxzymXr7LiXEXOCC8W78PjLeB89AbleMeXhnN5dTrXmjQ1o0123kZBjr7aE1HCXxquxziFAT11EpkhHHmr2GTOqMcxPxKPZTfPIrpwIDAQAB'
        rkey = '-----BEGIN PUBLIC KEY-----\n'
        rkey += gkey
        rkey += '\n-----END PUBLIC KEY-----'
        # 注意：这里使用PKCS1_v1_5，不能使用PKCS1_OAEP，否则与后端无法匹配
        # 虽然PKCS1_OAEP是更新的版本，但是有的网站并不使用
        res=PKCS1_v1_5.new(RSA.importKey(rkey)).encrypt(pw.encode('utf-8')).hex()
        return res

    # 判断滑块验证是否正确，并生成login的url
    def submit(self, userinfo):
        url = f'{self.host}captcha/index/checkImgPositon'
        data = self.getX()
        res = self.query(url, data)
        if res.text=='true':
            user = {
                'account': userinfo['user'],
                'password':self.encrypt(userinfo['psw']),
                'remeberMe':'false',
                'type':1
            }
            url = f'{self.host}login/{data["x"]}_{data["y"]}'
            res = self.query(url, user)
            self.account = {'account_token_':res.cookies['account_token_']}
            res = res.json()['user']
            self.stuId = res['stuId']
            print('>>', res['username'], res['nickName'], )

if __name__ == '__main__':
    user = [{'user':'xxxxxxx', 'psw':'xxxxxxx'}]
    # print(user)
    for x in user:
        st = seetv()
        st.submit(x)

</pre>
