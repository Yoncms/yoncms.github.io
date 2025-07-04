---
layout: post
title: "封装request库"
date: 2025-07-04
categories: 技术
tags: [python, requests, 博客]
featured_image: /assets/images/article30.jpg
---
<pre>
import requests
from fake_useragent import UserAgent

# 自定义封装的requests库<!--more-->

class Req:
    def __init__(self):
        self.scheme = "https://"
        self.session = requests.Session()
        self.headers = {
            'User-Agent': UserAgent().random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'zh-CN,zh;q=0.9'
        }
        self.cooks = {}

    def upHead(self, hd={}):
        if hd!={}:
            self.headers.update(hd)

    def upCook(self, ck={}):
        if ck!={}:
            self.cooks.update(ck)

    def query(self, url, data=None, params=None):
        session = self.session
        method = session.get if data==None else session.post
        urls = self.scheme + self.host + '/' + url
        requests_keys = {'url': urls}
        if data != None:
            if data.get('json')!= None:
                # 数据里的json是为了判断用的，判断完后就删除它
                data.pop('json')
                requests_keys['json'] = data
            else:
                requests_keys['data'] = data
        elif params:
            requests_keys['params'] = params
        else:
            pass
        requests_keys['headers'] = self.headers
        requests_keys['cookies'] = self.cooks
        response = method(**requests_keys)
        return self.process_response(response, urls)
    
    def process_response(self, response, urls):
        if (ress:=response.status_code) >= 400:
            print('httpcode:', response.status_code, urls)
            return None
        if ress!=200:
            return
        content_type = response.headers.get('Content-Type', '')
        # print('> content-type:', content_type)
        if 'text/' in content_type:
            try:
                response.encoding = 'utf-8'
                return response.text
            except:
                response.encoding = 'gbk'
                return response.text
        elif 'application/json' in content_type:
            response.encoding = 'utf-8'
            return response.json()
        else:
            return response.content

print('> 程序开始运行...')

</pre>
