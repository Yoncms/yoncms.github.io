---
layout: post
title: "Chrome浏览器扩展v3的清单例子"
date: 2025-05-19
categories: 技术
tags: [manifest, Python, 博客]
featured_image: /assets/images/article7.jpg
---
# Chrome浏览器扩展v3的清单例子
<pre>
{
    "author": "Yoncms/ZhangRongQuan",
    "name": "扩展的名字",
    "version": "25.05.10",
    "manifest_version": 3,


    "description": "扩展的简单说明",
    "icons": {
        "16": "pp.png",
        "48": "pp.png",
        "128": "pp.png"
    },
    "*":"定义扩展的图标行为，包括默认图标、标题和弹出页面",
    "action": {
        "default_icon": {
            "16": "pt.png",
            "48": "pt.png",
            "128": "pt.png"
        },
        "/":"鼠标悬停时显示的标题",
        "default_title": "点击图标时弹出框的标题",

        "//":"点击图标时显示的弹出页面",
        "default_popup": "mpopup.htm"
    },
    "/":"定义后台（后台是指扩展本身的后台）脚本，使用 service worker 模式",
    "background": {
        "service_worker": "background.js",
        "type": "module"
    },
    "permissions": [
        "storage",
        "activeTab",
        "tabs",
        "notifications"
    ],
    "//":"指定扩展可以访问的域名",
    "host_permissions": [
        "xxxxxxx.com"
    ],
    "externally_connectable": {
        "matches": ["*://*/*"]
    },
    "web_accessible_resources": [
        {
            "//":"列出可访问的资源文件",
            "resources": [
                "selector.js",
                "login.js",
                "executex.js",
                "mpopup.js"
            ],
            "/":"指定资源可访问的 URL 模式",
            "matches": [
                "*://*/*"
            ],
            "*":"允许动态 URL",
            "use_dynamic_url": true
        }
    ],
    "content_scripts": [
        {
            "/":"指定脚本注入的页面URL模式",
            "matches": [
                "*://*/*"
            ],
            "js": [
                "inject.js",
                "executex.js"
            ]
        }
    ]
}
</pre>