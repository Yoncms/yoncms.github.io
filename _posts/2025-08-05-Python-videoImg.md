---
layout: post
title: "Python从视频里截取图片的方法"
date: 2025-08-04
categories: 技术
tags: [Python, 截取图片, 博客]
featured_image: /assets/images/article42.jpg
---
# Python从视频里截取图片的方法

<pre>
import os
import subprocess
import random
# 采用多进程
from concurrent.futures import ProcessPoolExecutor, as_completed

input_dir = "./videos"
output_dir = "./imgs"
screenshot_time = 100	# 截取第一百秒位置的帧
max_processes = 6  # 建议为物理核心数或略少一点

os.makedirs(output_dir, exist_ok=True)

def get_video_duration(filepath):
    try:
        result = subprocess.run(
            [
                "ffprobe", "-v", "error",
                "-select_streams", "v:0",
                "-show_entries", "format=duration",
                "-of", "default=noprint_wrappers=1:nokey=1",
                filepath
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            text=True
        )
        return float(result.stdout.strip())
    except:
        return 0

def process_video(filename):
    input_path = os.path.join(input_dir, filename)
    name_no_ext = os.path.splitext(filename)[0]
    output_path = os.path.join(output_dir, f"{name_no_ext}.jpg")

    duration = get_video_duration(input_path)
    if duration <= 0:
        return f"[跳过] {filename} 获取时长失败"

    if duration >= screenshot_time:
        ss = screenshot_time
    else:
        ss = round(random.uniform(60, duration * 0.9), 2)

    cmd = [
        "ffmpeg", "-ss", str(ss), "-accurate_seek",
        "-i", input_path,
        "-frames:v", "1", "-q:v", "1",
        "-s", "1920x1080", "-f", "mjpeg",
        output_path, "-y"
    ]

    # cmd = [
    #     "ffmpeg", "-accurate_seek",
    #     "-hwaccel", "dxva2",  # 使用 GPU 解码，可以这样做，但是速度提升不明显
    #     "-ss", str(ss),
    #     "-i", input_path,
    #     "-frames:v", "1",
    #     "-q:v", "1",
    #     "-s", "1920x1080",
    #     "-f", "mjpeg",
    #     output_path,
    #     "-y"
    # ]

    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return f"[完成] {filename} @ {ss:.2f}s"

def main():
    files = [f for f in os.listdir(input_dir) if f.lower().endswith(".mp4")]
    if not files:
        print("未找到 mp4 文件")
        return

    print(f"共 {len(files)} 个视频，使用 {max_processes} 个进程并发截图...")

    with ProcessPoolExecutor(max_workers=max_processes) as executor:
        futures = {executor.submit(process_video, f): f for f in files}

        for future in as_completed(futures):
            print(future.result())

    print("全部截图完成。")

if __name__ == "__main__":
    main()

</pre>