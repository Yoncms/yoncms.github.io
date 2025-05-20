---
layout: post
title: "Python搭建简易的服务器"
date: 2025-05-19
categories: 技术
tags: [Python, 静态网站, 博客]
featured_image: /assets/images/article2.jpg
---
# Python搭建简易的服务器
# 多线程WEB Server
<pre>
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

server_address = ('', 8000)

httpd = ThreadingHTTPServer(server_address, SimpleHTTPRequestHandler)

print('Starting server, listen at: %s:%s' % server_address)

httpd.serve_forever()
</pre>

# 单线程
<pre>
# import http.server
# import socketserver

# PORT = 8000

# Handler = http.server.SimpleHTTPRequestHandler

# with socketserver.TCPServer(("", PORT), Handler) as httpd:
#     print("serving at port", PORT)
#     httpd.serve_forever()
</pre>