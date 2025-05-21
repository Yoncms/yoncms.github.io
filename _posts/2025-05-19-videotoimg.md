---
layout: post
title: "使用ffmpeg从视频里提取图片"
date: 2025-05-19
categories: 技术
tags: [ffmpeg, Python, 博客]
featured_image: /assets/images/article10.jpg
---
# 使用ffmpeg从视频里提取图片
<pre>
import os
import ffmpeg

def extract_first_frame(video_path, output_image_path):
<!--more--> 
    """
    从视频中提取第一帧并保存为图像文件
    :param video_path: 输入视频文件路径
    :param output_image_path: 输出图像文件路径（例如 'output_frame.png'）
    """
    (
        ffmpeg
        .input(video_path, ss=0)  # 从视频开始位置提取
        # 提取第一帧，y=None 表示覆盖输出文件，就是如果文件存在就覆盖
        .output(output_image_path, vframes=1, y=None)  
        .run()
    )

# 从视频里提取图片，并且提取的是所有的帧
def extract_all_frames(video_path, output_folder):
    """
    从视频中提取所有帧并保存为图像文件
    :param video_path: 输入视频文件路径
    :param output_folder: 输出图像文件夹路径（例如 'output_images/frame%03d.png'）
    """
    # 图像文件名模式，输出格式为 frame001.png, frame002.png 等
    output_pattern = f'{output_folder}/frame%03d.png'  
    
    (
        ffmpeg
        .input(video_path)
        # 提取所有帧，vsync=0 保证帧的正确顺序
        .output(output_pattern, vframes=None, vsync=0)  
        .run()
    )


def extract_frames_in_time_range(video_path, output_folder, start_time, duration):
    """
    从视频中提取指定时间段的所有帧并保存为图像文件
    :param video_path: 输入视频文件路径
    :param output_folder: 输出图像文件夹路径（例如 'output_images/frame%03d.png'）
    :param start_time: 提取开始的时间（秒）
    :param duration: 提取的持续时间（秒）
    """
    # 确保输出文件夹存在
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    output_pattern = f'{output_folder}/frame%03d.png'  # 图像文件名模式，输出格式为 frame001.png, frame002.png 等

    (
        ffmpeg
        .input(video_path, ss=start_time)  # 设置开始时间
        .output(output_pattern, t=duration, vsync=0)  # 提取指定持续时间的所有帧
        .run()
    )

def extract_specified_frames(video_path, output_folder, frames_to_extract):
    """
    从视频中提取指定的帧并保存为图像文件
    :param video_path: 输入视频文件路径
    :param output_folder: 输出图像文件夹路径（例如 'output_images/frame%03d.png'）
    :param frames_to_extract: 指定的帧数列表（例如 [5, 10]）
    """
    # 确保输出文件夹存在
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 生成提取帧的时间点或帧号
    frame_numbers = '|'.join([str(frame) for frame in frames_to_extract])  # 将帧号拼接成字符串，例如 "5|10"
    
    # 使用 select 滤镜提取指定帧
    output_pattern = f'{output_folder}/frame%03d.png'  # 输出格式，例如 frame001.png, frame002.png

    (
        ffmpeg
        .input(video_path)
        .filter('select', f'gte(n\,{frame_numbers})')  # 根据帧号选择特定的帧
        .output(output_pattern, vsync=0)
        .run()
    )

def extract_frames_in_range(video_path, output_folder, start_frame, end_frame):
    """
    从视频中提取指定范围的帧并保存为图像文件
    :param video_path: 输入视频文件路径
    :param output_folder: 输出图像文件夹路径（例如 'output_images/frame%03d.png'）
    :param start_frame: 起始帧
    :param end_frame: 结束帧
    """
    # 确保输出文件夹存在
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 使用 select 滤镜提取指定范围的帧
    output_pattern = f'{output_folder}/frame%03d.png'

    (
        ffmpeg
        .input(video_path)
        .filter('select', f'gte(n\,{start_frame})*lte(n\,{end_frame})')  # 提取从 start_frame 到 end_frame 的帧
        .output(output_pattern, vsync=0)
        .run()
    )

# # 示例调用：提取第 5 帧到第 10 帧
# extract_frames_in_range('a1.mkv', 'output_images', start_frame=5, end_frame=10) 

# # 示例调用：提取第 5 帧和第 10 帧
# extract_specified_frames('a1.mkv', 'output_images', frames_to_extract=[5, 10])    

# # 示例调用：提取从 10 秒到 20 秒之间的视频帧
# extract_frames_in_time_range('a1.mkv', 'output_images', start_time=10, duration=10)   

# # 示例调用
# extract_all_frames('a1.mkv', 'output_images')    

# 示例调用
extract_first_frame('a1.mkv', 'first_frame.png')
</pre>