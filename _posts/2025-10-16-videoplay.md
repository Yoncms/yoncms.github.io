---
layout: post
title: "本地音视频播放器"
date: 2025-10-16
categories: 技术
tags: [JavaScript, HTML, 博客]
featured_image: /assets/images/article46.jpg
---
# 本地音视频播放器

<pre>
&lt;!DOCTYPE html&gt;
&lt;html lang="zh-CN"&gt;<!--more-->
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;本地音视频播放器 - 浏览器&lt;/title&gt;
    &lt;style&gt;
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
            min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px;
        }
        .container {
            width: 100%; max-width: 900px; background-color: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px); border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            overflow: hidden; border: 1px solid rgba(255,255,255,0.2);
        }
        .header { background-color: rgba(0,0,0,0.4); padding: 20px; text-align: center; }
        h1 { color: white; font-size: 2.2rem; margin-bottom: 10px; }
        .subtitle { color: rgba(255,255,255,0.8); font-size: 1rem; }
        .content { padding: 30px; }
        .file-selector {
            background-color: rgba(255,255,255,0.1); border: 2px dashed rgba(255,255,255,0.3);
            border-radius: 15px; padding: 40px 20px; text-align: center; margin-bottom: 30px;
        }
        .file-selector p { color: white; margin-bottom: 20px; font-size: 1.1rem; }
        .file-input { display: none; }
        .file-label {
            display: inline-block; background: linear-gradient(to right, #4facfe, #00f2fe); color: white;
            padding: 12px 30px; border-radius: 50px; cursor: pointer; font-weight: 600;
            transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .media-container { display: none; margin-bottom: 20px; border-radius: 10px; overflow: hidden; position: relative; }
        video { width: 100%; display: block; }
        .audio-visualizer { width: 100%; height: 200px; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden; }
        .audio-title { color: white; font-size: 1.5rem; z-index: 2; }
        .visualizer-bars { position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: space-around; align-items: flex-end; padding: 0 10px; }
        .bar { width: 10px; background: linear-gradient(to top, #4facfe, #00f2fe); border-radius: 5px 5px 0 0; transition: height 0.2s ease; }
        .controls { display: none; background-color: rgba(0, 0, 0, 0.6); padding: 15px; border-radius: 10px; }
        .progress-container { margin-bottom: 15px; }
        .progress-bar { width: 100%; height: 8px; background-color: rgba(255,255,255,0.2); border-radius: 4px; overflow: hidden; cursor: pointer; position: relative; }
        .progress { height: 100%; background: linear-gradient(to right, #4facfe, #00f2fe); width: 0%; border-radius: 4px; transition: width 0.1s; }
        .buffer-bar { position: absolute; height: 100%; background-color: rgba(255,255,255,0.1); width: 0%; border-radius: 4px; top: 0; left: 0; z-index: -1; }
        .time-display { display: flex; justify-content: space-between; color: white; font-size: 0.9rem; margin-top: 5px; }
        .buttons { display: flex; justify-content: space-between; align-items: center; }
        .play-pause, .fullscreen-btn {
            background: linear-gradient(to right, #4facfe, #00f2fe); color: white; border: none; width: 50px; height: 50px;
            border-radius: 50%; font-size: 1.2rem; cursor: pointer; display: flex; justify-content: center; align-items: center;
            transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .volume-container { display: flex; align-items: center; color: white; width: 150px; }
        .volume-slider { width: 100px; margin-left: 10px; }
        .file-info { color: white; text-align: center; margin-top: 15px; font-size: 0.9rem; opacity: 0.8; }
        video:fullscreen { width: 100vw; height: 100vh; object-fit: contain; background-color: black; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class="container"&gt;
    &lt;div class="header"&gt;
        &lt;h1&gt;本地音视频播放器&lt;/h1&gt;
        &lt;p class="subtitle"&gt;支持 MP3 音频与视频文件，无需上传&lt;/p&gt;
    &lt;/div&gt;

    &lt;div class="content"&gt;
        &lt;div class="file-selector"&gt;
            &lt;p&gt;选择您要播放的音频或视频文件&lt;/p&gt;
            &lt;input type="file" id="fileInput" class="file-input" accept="video/*, audio/*"&gt;
            &lt;label for="fileInput" class="file-label"&gt;选择音视频文件&lt;/label&gt;
        &lt;/div&gt;

        &lt;div class="media-container" id="mediaContainer"&gt;
            &lt;video id="videoPlayer"&gt;&lt;/video&gt;
            &lt;div class="audio-visualizer" id="audioVisualizer"&gt;
                &lt;div class="audio-title" id="audioTitle"&gt;正在播放音频&lt;/div&gt;
                &lt;div class="visualizer-bars" id="visualizerBars"&gt;&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="media-type-indicator" id="mediaTypeIndicator"&gt;&lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="controls" id="controls"&gt;
            &lt;div class="progress-container"&gt;
                &lt;div class="progress-bar" id="progressBar"&gt;
                    &lt;div class="buffer-bar" id="bufferBar"&gt;&lt;/div&gt;
                    &lt;div class="progress" id="progress"&gt;&lt;/div&gt;
                &lt;/div&gt;
                &lt;div class="time-display"&gt;
                    &lt;span id="currentTime"&gt;0:00&lt;/span&gt;
                    &lt;span id="duration"&gt;0:00&lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;div class="buttons"&gt;
                &lt;button class="play-pause" id="playPause"&gt;▶&lt;/button&gt;
                &lt;div class="volume-container"&gt;
                    &lt;span&gt;音量:&lt;/span&gt;
                    &lt;input type="range" min="0" max="1" step="0.1" value="1" class="volume-slider" id="volumeSlider"&gt;
                &lt;/div&gt;
                &lt;button class="fullscreen-btn" id="fullscreenBtn"&gt;⛶&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="file-info" id="fileInfo"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const videoPlayer = document.getElementById('videoPlayer');
    const mediaContainer = document.getElementById('mediaContainer');
    const audioVisualizer = document.getElementById('audioVisualizer');
    const audioTitle = document.getElementById('audioTitle');
    const visualizerBars = document.getElementById('visualizerBars');
    const mediaTypeIndicator = document.getElementById('mediaTypeIndicator');
    const controls = document.getElementById('controls');
    const playPauseBtn = document.getElementById('playPause');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volumeSlider');
    const fileInfo = document.getElementById('fileInfo');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
	
	// 默认音频或视频在浏览器播放是要手动点击播放的，这里是为了在选择文件时就触发
	// 自动播放；也就是当点击选择文件按钮时触发事件，相对于点击了播放视频或音频，
	// 以便视频或者音频能自动播放
	fileInput.addEventListener('click',(e)=&gt;{
		console.log('e', e);
		userInteracted = true;
		if (fileInput.files[0]) fileInput.dispatchEvent(new Event('change'));
	});


    let audioPlayer = null; // 当前播放的 audio 元素
    let audioContext = null;
    let analyser = null;
    let source = null;
    let bars = [];
    let userInteracted = false; // 用户是否点击过播放按钮

    function initVisualizer() {
        visualizerBars.innerHTML = '';
        bars = [];
        for (let i = 0; i &lt; 50; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = '5px';
            visualizerBars.appendChild(bar);
            bars.push(bar);
        }
    }

    function updateVisualizer() {
        if (!analyser) return;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i &lt; bars.length; i++) {
            const value = dataArray[Math.floor(i * bufferLength / bars.length)];
            bars[i].style.height = `${Math.max(5, value / 2)}px`;
        }
        requestAnimationFrame(updateVisualizer);
    }

    function destroyAudioPlayer() {
        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.src = '';
            audioPlayer.load();
            audioPlayer.remove();
            audioPlayer = null;
        }
        if (source) { source.disconnect(); source = null; }
        if (analyser) { analyser.disconnect(); analyser = null; }
        if (audioContext) { audioContext.close().catch(() =&gt; {}); audioContext = null; }
    }

    function setupAudioAnalysis() {
        if (!audioPlayer) return;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source = audioContext.createMediaElementSource(audioPlayer);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        initVisualizer();
        updateVisualizer();
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s &lt; 10 ? '0' : ''}${s}`;
    }

    function updateProgress(player) {
        if (player.duration) {
            const percent = (player.currentTime / player.duration) * 100;
            progress.style.width = `${percent}%`;
            currentTimeEl.textContent = formatTime(player.currentTime);
            durationEl.textContent = formatTime(player.duration);
        }
    }

    progressBar.addEventListener('click', e =&gt; {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        let player = (mediaTypeIndicator.textContent === '视频') ? videoPlayer : audioPlayer;
        if (player) player.currentTime = percent * player.duration;
    });

    playPauseBtn.addEventListener('click', () =&gt; {
        userInteracted = true;
        let player = (mediaTypeIndicator.textContent === '视频') ? videoPlayer : audioPlayer;
        if (!player) return;

        if (player.paused) {
            if (mediaTypeIndicator.textContent === '音频' && audioContext && audioContext.state === 'suspended') {
                audioContext.resume().then(() =&gt; player.play().catch(() =&gt; {}));
            } else {
                player.play().catch(() =&gt; {});
            }
            playPauseBtn.textContent = '❚❚';
        } else {
            player.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    fullscreenBtn.addEventListener('click', () =&gt; {
        if (!document.fullscreenElement && mediaTypeIndicator.textContent === '视频') {
            mediaContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    document.addEventListener('keydown', e =&gt; {
        let player = (mediaTypeIndicator.textContent === '视频') ? videoPlayer : audioPlayer;
        if (!player) return;
        switch (e.code) {
            case 'ArrowRight': player.currentTime += 60; break;
            case 'ArrowLeft': player.currentTime -= 60; break;
			case 'Numpad6': player.currentTime += 5; break;
            case 'Numpad4': player.currentTime -= 8; break;
            case 'Space': e.preventDefault(); playPauseBtn.click(); break;
            case 'ArrowUp': player.volume = Math.min(1, player.volume + 0.1); volumeSlider.value = player.volume; break;
            case 'ArrowDown': player.volume = Math.max(0, player.volume - 0.1); volumeSlider.value = player.volume; break;
        }
    });

    fileInput.addEventListener('change', async e =&gt; {
        const file = e.target.files[0];
        if (!file) return;

        const isVideo = file.type.startsWith('video/');
        const isAudio = file.type.startsWith('audio/') || file.name.endsWith('.mp3');

        const wasPlaying = (isVideo ? !videoPlayer.paused : (audioPlayer && !audioPlayer.paused));

        // 停止所有播放
        videoPlayer.pause();
        videoPlayer.removeAttribute('src');
        videoPlayer.load();
        destroyAudioPlayer();

        const url = URL.createObjectURL(file);

        if (isVideo) {
            videoPlayer.src = url;
            videoPlayer.style.display = 'block';
            audioVisualizer.style.display = 'none';
            mediaTypeIndicator.textContent = '视频';

            videoPlayer.onloadedmetadata = async () =&gt; {
                mediaContainer.style.display = 'block';
                controls.style.display = 'block';
                durationEl.textContent = formatTime(videoPlayer.duration);
                fileInfo.textContent = `文件名: ${file.name} | 大小: ${(file.size / 1024 / 1024).toFixed(2)} MB`;

                if ((wasPlaying || userInteracted) && videoPlayer.paused) {
                    try { await videoPlayer.play(); await fullscreenBtn.click();} catch {}
                    playPauseBtn.textContent = '❚❚';
                } else {
                    playPauseBtn.textContent = '▶';
                }
            };

            videoPlayer.ontimeupdate = () =&gt; updateProgress(videoPlayer);
            videoPlayer.onended = () =&gt; playPauseBtn.textContent = '▶';

        } else {
            // 新建 audio 元素播放 MP3
            audioPlayer = document.createElement('audio');
            audioPlayer.style.display = 'none';
            document.body.appendChild(audioPlayer);
            audioPlayer.src = url;

            audioPlayer.style.display = 'block';
            videoPlayer.style.display = 'none';
            audioVisualizer.style.display = 'block';
            mediaTypeIndicator.textContent = '音频';
            audioTitle.textContent = file.name;

            audioPlayer.onloadedmetadata = async () =&gt; {
                mediaContainer.style.display = 'block';
                controls.style.display = 'block';
                durationEl.textContent = formatTime(audioPlayer.duration);
                fileInfo.textContent = `文件名: ${file.name} | 大小: ${(file.size / 1024 / 1024).toFixed(2)} MB`;

                setupAudioAnalysis();
                if (audioContext.state === 'suspended') await audioContext.resume();

                if ((wasPlaying || userInteracted) && audioPlayer.paused) {
                    try { await audioPlayer.play(); } catch {}
                    playPauseBtn.textContent = '❚❚';
                } else {
                    playPauseBtn.textContent = '▶';
                }
            };

            audioPlayer.ontimeupdate = () =&gt; updateProgress(audioPlayer);
            audioPlayer.onended = () =&gt; playPauseBtn.textContent = '▶';
        }
    });

    initVisualizer();
});
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>
