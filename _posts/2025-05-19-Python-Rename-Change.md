---
layout: post
title: "Python把webp文件转成jpg并重新命名"
date: 2025-05-19
categories: 技术
tags: [图片转换, 批量命名, 博客]
featured_image: /assets/images/article16.jpg
---
# Python把webp文件转成jpg并重新命名
<pre>
import os  
from PIL import Image
# 定义函数，把所有webp图片转换为png格式，并且删除原webp图片
<!--more-->
def convert_all_webp_to_png(folder_path):
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(".webp"):
            webp_path = os.path.join(folder_path, filename)
            png_path = os.path.splitext(webp_path)[0] + ".jpg"
            try:
                with Image.open(webp_path) as img:
                    img.save(png_path, "PNG")
                    print(f"✅ 已转换: {filename} → {os.path.basename(png_path)}")
                os.remove(webp_path)
                print(f"🗑️ 已删除: {filename}")
            except Exception as e:
                print(f"❌ 转换失败: {filename}, 原因: {e}")

# 示例
# convert_all_webp_to_png("文件目录")

# 定义函数，将文件夹内的所有文件重命名为指定格式，并按顺序编号

def rename_to_index(folder, prefix="file_", ext_filter=None, start=1):
    files = sorted(os.listdir(folder))
    count = start
    for filename in files:
        old_path = os.path.join(folder, filename)
        if os.path.isfile(old_path):
            name, ext = os.path.splitext(filename)
            if ext_filter and ext.lower() != ext_filter.lower():
                continue
            new_name = f"{prefix}{count:03d}{ext}"
            new_path = os.path.join(folder, new_name)
            os.rename(old_path, new_path)
            print(f"✅ {filename} → {new_name}")
            count += 1

# 示例：将 PNG 文件重命名为 file_001.png, file_002.png, ...
rename_to_index("文件目录", prefix="前缀_", ext_filter=".jpg")
</pre>