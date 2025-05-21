---
layout: post
title: "Jekyll博客入门指南"
date: 2025-05-15
categories: 技术
tags: [Jekyll, 静态网站, 博客]
featured_image: /assets/images/article1.jpg
excerpt: "Jekyll是一个简单的静态网站生成器，非常适合用来搭建个人博客。本文将介绍Jekyll的基本概念和使用方法。"
---

# Jekyll博客入门指南
<pre>
Jekyll是一个简单的静态网站生成器，它可以将纯文本转换成静态网站和博客。由于GitHub Pages原生支持Jekyll，<!--more--> 因此它成为了许多开发者搭建个人博客的首选工具。

## Jekyll的优势

1. **简单易用**：不需要数据库，只需要文本文件
2. **静态网站**：加载速度快，安全性高
3. **Markdown支持**：使用Markdown编写内容，专注于写作
4. **GitHub Pages集成**：可以免费托管在GitHub Pages上
5. **主题丰富**：有大量的主题可供选择

## 安装Jekyll

首先，确保您的系统已安装Ruby和RubyGems，然后安装Jekyll：

```bash
gem install jekyll bundler
```

## 创建新站点

使用以下命令创建一个新的Jekyll站点：

```bash
jekyll new myblog
cd myblog
```

## 目录结构

Jekyll站点的基本目录结构如下：

```
myblog/
├── _config.yml          # 配置文件
├── _data/               # 数据文件
├── _drafts/             # 草稿
├── _includes/           # 可重用的HTML片段
├── _layouts/            # 布局模板
├── _posts/              # 博客文章
├── _sass/               # SASS样式
├── _site/               # 生成的静态站点
├── assets/              # 静态资源
└── index.html           # 首页
```

## 创建博客文章

在`_posts`目录下创建一个新的Markdown文件，文件名格式为`YYYY-MM-DD-title.md`：

```markdown
---
layout: post
title: "我的第一篇博客"
date: 2025-05-15
categories: 博客
---

这是我的第一篇博客内容。
```

## 本地预览

运行以下命令在本地预览您的网站：

```bash
bundle exec jekyll serve
```

然后在浏览器中访问`http://localhost:4000`。

## 部署到GitHub Pages

1. 创建一个名为`username.github.io`的GitHub仓库（将username替换为您的GitHub用户名）
2. 将您的Jekyll站点推送到该仓库
3. 几分钟后，您的网站将在`https://username.github.io`上线

## 自定义主题

Jekyll支持多种方式自定义主题：

1. 使用现有主题
2. 修改HTML、CSS和JavaScript
3. 创建自己的主题

## 添加评论系统

Jekyll是静态网站，不支持原生评论，但可以集成第三方评论系统：

1. Disqus
2. Utterances（基于GitHub Issues）
3. Giscus（基于GitHub Discussions）

## 结论

Jekyll是一个强大而简单的博客平台，特别适合开发者使用。通过本文的介绍，您应该已经了解了Jekyll的基本概念和使用方法。开始使用Jekyll，享受简单高效的博客体验吧！
</pre>