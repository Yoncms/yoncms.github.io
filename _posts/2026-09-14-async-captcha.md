---
layout: post
title: "封装DDDDOCR库进行滑块验证或验证码识别"
date: 2026-09-14
categories: 技术
tags: [ddddocr, 验证码, 博客]
featured_image: /assets/images/article3.jpg
---
# 封装DDDDOCR库进行滑块验证或验证码<!--more-->识别
# 通用版
# 用于图片验证，包括滑块验证和文本识别验证
# 使用异步多并发
# 使用curl_cffi库发送http请求
<pre>
from ascurl import ascurl
from PIL import Image
from io import BytesIO
from ddddocr import DdddOcr
import json
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5

Docr = DdddOcr(det=False, ocr=True)
Hocr = DdddOcr(det=False, ocr=False)

class Captcha(ascurl):
    def __init__(self):
        super().__init__()

    # 工具方法：统一转成 RGB bytes
    def convert_to_rgb_bytes(self, img_data):
        """
        将图片数据转换为 RGB bytes
        支持: bytes 或 PIL Image
        """
        # 如果是 bytes，先转为 PIL Image
        if isinstance(img_data, bytes):
            img = Image.open(BytesIO(img_data))
        elif hasattr(img_data, 'mode'):  # 如果是 PIL Image
            img = img_data
        else:
            raise TypeError(f"不支持的类型: {type(img_data)}")
        
        # 转为 RGB
        img = img.convert('RGB')
        
        # 转为 bytes
        with BytesIO() as buf:
            img.save(buf, format='PNG')
            return buf.getvalue()
    
    # 截取滑块拼图块
    def crop_sprite_piece(self, sprite_bytes):
        """
        从精灵图中截取指定区域，返回 bytes
        x, y: 起始坐标（左上角）
        w, h: 截取宽度和高度
        """
        # 1. bytes -> PIL Image
        sprite_img = Image.open(BytesIO(sprite_bytes)).convert('RGBA')
        
        # 2. 裁剪: (left, top, right, bottom)
        # 140, 490, 260, 610 对应 x=140, y=490, w=120, h=120
        cropped = sprite_img.crop((140, 490, 260, 610))
        # 截取完返回的仍然是二进制数据
        # 3. PIL Image -> bytes（关键：这里要转回 bytes）
        with BytesIO() as buf:
            cropped.save(buf, format='PNG')
            return buf.getvalue()
    
    # 计算缩放比例
    def get_scale(self):
        """返回缩放比例 (scale_x, scale_y)"""
        raw_width, raw_height = 672, 480
        display_width, display_height = 360, 360
        scale_x = display_width / raw_width
        scale_y = display_height / raw_height
        return scale_x, scale_y
    
    # 缩放拼图块（如果需要对拼图块做缩放）
    def resize_piece_bytes(self, piece_bytes, scale_x, scale_y):
        """缩放拼图块并返回 bytes"""
        img = Image.open(BytesIO(piece_bytes))
        new_w = int(img.width * scale_x)
        new_h = int(img.height * scale_y)
        resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        with BytesIO() as buf:
            resized.save(buf, format='PNG')
            return buf.getvalue()
    
    def getPos(self, bBg, bSld):
        """
        获取滑块目标位置
        bBg: 背景图 bytes
        bSld: 精灵图 bytes
        """
        # 1. 截取拼图块（返回 bytes）
        slider_bytes = self.crop_sprite_piece(bSld)
        # print(slider_bytes)
        # 2. 背景图转为 RGB bytes（已经是 bytes 则无需转换）
        if isinstance(bBg, bytes):
            bg_bytes = Image.open(BytesIO(bBg))
        else:
            bg_bytes = bBg
        
        bg = bg_bytes.convert('RGBA').resize((360, 360))
        # 将处理好的背景转回 bytes 传给 ddddocr
        with BytesIO() as buf:
            bg.save(buf, format='PNG')
            bg_bytes = buf.getvalue()

        # 3. 计算缩放比例
        scale_x, scale_y = self.get_scale()
        print(f"缩放比例: x={scale_x:.4f}, y={scale_y:.4f}")
        
        # 4. 缩放拼图块（可选，根据实际需要）
        slider_bytes = self.resize_piece_bytes(slider_bytes, scale_x, scale_y)
        
        # 5. ddddocr 匹配
        # 注意：参数顺序是 slide_match(背景图, 拼图块)
        result = Hocr.slide_match(slider_bytes, bg_bytes)
        # result = Hocr.slide_match(bg_bytes, slider_bytes)
        # print("ddddocr 匹配结果:", result)
        # return
        if result and 'target' in result:
            x, y, w, h = result['target']
            return {'x': x, 'y': y}
        return None

    # 获取滑块的left和top的值    
    async def getImg(self, bgUrl=None, sliderUrl=None, yUrl=None):
        #   "bgUrl": 背景图地址, "sliderUrl": 滑块图地址, "yUrl": 滑块的 y 值地址
        if yUrl!=None:
            # 取背景图、y 值、滑块图
            bg = self.convert_to_rgb_bytes(await self.query(bgUrl))
            slider = self.convert_to_rgb_bytes(await self.query(sliderUrl))
            y = await self.query(yUrl, data=1)
            return bg, slider, y
        else:
            # 识别验证码文字
            # print(bgUrl)
            return await self.query(bgUrl)

    async def getX(self, **urlDict):
        # 拿到 (x, y) 坐标
        # urlDict 是一个字典，包含三个参数：
        # {
        #   "bgUrl": 背景图地址,
        #   "sliderUrl": 滑块图地址,
        #   "yUrl": 滑块的 y 值地址
        # }
        retry = 0
        while retry < 5:
            bg, slider, y= await self.getImg(**urlDict)

            # 计算 x
            x = Hocr.slide_match(slider, bg)['target'][0]

            if x == 0:
                print('■', end='', flush=True)
                retry += 1
            else:
                # print('🌟 拼图的xy坐标值：', x, y)
                return int(x), y
        return None, None

    # 非滑块验证：识别验证码文字
    async def getOcr(self, imgUrl):
        retry = 0
        while retry < 5:
            img = await self.getImg(imgUrl)
            if res:=Docr.classification(img):
                return res
            else:
                print('■', end='', flush=True)
                retry += 1
        return None

    # 密码的加密使用的RSA加密
    async def encrypt(self, pw):
        # 获取到的公钥时byte类型的，需要转成str
        gkey = await self.query('login/key/public', data=1)
        if isinstance(gkey, bytes):
            gkey = gkey.decode()
        rkey = '-----BEGIN PUBLIC KEY-----\n'
        rkey += gkey
        rkey += '\n-----END PUBLIC KEY-----'
        # 注意：这里使用PKCS1_v1_5，不能使用PKCS1_OAEP，否则与后端无法匹配
        # 虽然PKCS1_OAEP是更新的版本，但是有的网站并不使用
        res=PKCS1_v1_5.new(RSA.importKey(rkey)).encrypt(pw.encode('utf-8')).hex()
        return res
</pre>
