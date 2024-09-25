---
layout: post
title: Chrome浏览器扩展
---
**manifest.json**  
<pre>
{
    "author": "Yoncms/ZhangRongQuan",
    "name": "测试",
    "version": "2024.08.09",
    "manifest_version": 3,
    "description": "测试",
    "icons": {
        "16": "pp.png",
        "48": "pp.png",
        "128": "pp.png"
    },
    "action": {
        "default_icon": {
            "16": "pt.png",
            "48": "pt.png",
            "128": "pt.png"
        },
        "default_title": "测试",
        "default_popup": "mpopup.htm"
    },
    "background": {
        "service_worker": "background.js"
    },
    "permissions": [
        "storage",
        "activeTab",
        "tabs",
        "notifications"
    ],
    "host_permissions": [
        "https://............/*"
    ],
    "web_accessible_resources": [
        {
            "resources": [
                "e1.js",
                "e2.js",
                "mpopup.js"
            ],
            "matches": [
                "https://............../*"
            ],
            "use_dynamic_url": true
        }
    ],
    "content_scripts": [
        {
            "matches": [
                "https://................./*"
            ],
            "js": [
                "inject.js"
            ]
        }
    ]
}
</pre>
**inject.js**  
<pre>
/**
 * 这是清单里的content-scripts的js，是content的js，也就是当前所访问的页面的js
 */
// 向background或popup发送当前页面的数据，并接受返回的数据
chrome.runtime.sendMessage({ url: 'URL' }, (response) => {
    console.log('收到来自后台的回复：' + response);
});
// content-script.js接收
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('sender', JSON.stringify(sender));
    console.log('request', request.value);
    sendResponse('我收到了你的消息！');
});
// chrome.runtime.sendMessage({greeting: '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
//     console.log('收到来自后台的回复：' + response);
// });
var getnode = document.querySelector('body');
((files) => {
    for (var i in files) {
        var createnode = document.createElement('script');
        createnode.setAttribute('type', 'text/javascript');
        createnode.setAttribute('src', chrome.runtime.getURL(files[i]));
        getnode.appendChild(createnode);
    }
})(['e1.js', 'e2.js']);
window.addEventListener("message", (e) => {
    console.log(e.data);
}, false);
</pre>
**popup.html**  
<pre>
&lt;meta charset="utf-8" &gt;
&lt;div style="width:200px">
    &lt;h4>XXXXXX &lt;/h4>
    Author：Yoncms/ZhangRongQuan &lt;/p>
    &lt;p>Version：2024.07.23 &lt;/p>
    &lt;p>XXXXXX &lt;/p>
    &lt;p id="pp"> &lt;/p>
&lt;/div>
<script src="mpopup.js"></script>
</pre>
**popup.js**  
<pre>
/**
 * 这是后台的js，也就是插件本身的js
 */
var dt = new Date();
var y = dt.getFullYear();
var m = dt.getMonth() + 1;
var d = dt.getDate();
var s = dt.getHours();
var f = dt.getMinutes();
var w = dt.getSeconds();
m = m < 10 ? "0" + m : m;
f = f < 10 ? "0" + f : f;
w = w < 10 ? "0" + w : w;
var content = "现在是：" + y + "-" + m + "-" + d + " " + s + ":" + f + ":" + w;
document.querySelector("#pp").innerHTML = content;
setTimeout(function () {
    window.close();
}, 150000);
// popup向content主动发送消息
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { cmd: 'test', value: '你好，我是popup！' }, (response) => {
        console.log('来自content的回复：' + response);
    });
});
// chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
//     console.log('> ', req, JSON.stringify(sender));
//     document.onclick = () => { document.querySelector('#pp').innerHTML = sender.url };
//     sendRes('> 后台收到了！');
// });
// console.log(chrome.extension.getBackgroundPage());
// console.log(1001000)
// chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     let url = tabs[0].url;
//     if (url.indexOf('fj.rcpxpt.com/classPackage/classPackageDetail') != -1) {
//         console.log('url--', url);
//         chrome.action.setBadgeText({ text: '1' });
//         chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
//         chrome.action.setBadgeTextColor({ color: 'black' });
//     } else {
//         chrome.action.setBadgeText({ text: '' });
//     }
// });
// 这里需要点击图标才会显示1
// chrome.action.setBadgeText({text: '1'});
// chrome.action.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
// chrome.action.setBadgeTextColor({color: 'black'});
// console.log(chrome.tabs);
// chrome.tabs.get(null, function (tab) {
//   console.log(tab.url);
// });
// 插件自带的与alert不同的弹窗
// (() => {
//     chrome.notifications.create(
//     {
//         type: "basic",
//         title: "Yoncms",
//         message: content,
//         iconUrl: "pp.png"
//     },
//     (notificationId) => {
//         console.log('notificationId-->', notificationId, chrome);
//     });
// })();
// var currentUrl = window.location.href;
// console.log(currentUrl);
//chrome.windows.getCurrent 获取当前视窗是指包含当前正在执行的代码的视窗 及popup.html
// chrome.windows.getCurrent(function (tab){
//     console.log(tab.id, tab.url);

// })
// chrome.tabs.getCurrent((tab)=>{document.getElementById("pp").innerHTML = tab.url;})
// "//":"如果涉及跨域请求，需要在 host_permissions 里面配置域名，当然你也可以用 <all_urls>",
</pre>
**background.js**    
<pre>
/**
 * 这是后台的js，也就是插件本身的js
 */
// 监听来自当前网页content-script发来的数据，并向网页发送信息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    (() => {
        chrome.notifications.create(
            {
                type: "basic",
                title: "当前访问的Url是：",
                message: sender.url,
                iconUrl: "../pp.png"
            },
            (notificationId) => {
                console.log('notificationId-->', notificationId, JSON.stringify(chrome));
            });
    })();

    // request是前台发送来的字符串信息， sender是前台当前页面的信息，包括url
    console.log('>', '收到来自content-script的消息：', JSON.stringify(sender));
    if (sender.url.indexOf('rcpxpt') != -1) {
        chrome.action.setBadgeText({ text: '1' });
        chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
        chrome.action.setBadgeTextColor({ color: 'white' });
    } else {
        chrome.action.setBadgeText({ text: '' });
    }
    // sendResponse是要向前台返回数据的方法
    sendResponse('> 我是后台，我已收到你的消息，这是我的回复：' + JSON.stringify(sender));
});
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
// {
//     console.log('收到来自content-script的消息：');
//     // request是前台发送来的字符串信息， sender是前台当前页面的信息，包括url
//     console.log('>', request, sender, sender.url);
//     // sendResponse是要向前台返回数据的方法
//     sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
// });

// 插件自带的与alert不同的弹窗
// (() => {
//     chrome.notifications.create(
//     {
//         type: "basic",
//         title: "Notifications Title",
//         message: "Notifications message to display",
//         iconUrl: "../pp.png"
//     },
//     (notificationId) => {
//         console.log('notificationId-->', notificationId, chrome);
//     });
// })();
</pre>
**e1.js**  
<pre>
console.log('xxxxxxxxx');
</pre>
**e2.js**  
<pre>
conosle.log('xxxxxxxxxx');
</pre>
