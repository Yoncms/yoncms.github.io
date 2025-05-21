---
layout: post
title: "使用GitHub Pages搭建个人博客"
date: 2025-05-18
categories: 教程
tags: [GitHub Pages, 博客, 网站搭建]
featured_image: /assets/images/article2.jpg
excerpt: "GitHub Pages是一个免费的静态网站托管服务，非常适合用来搭建个人博客。本文将介绍如何使用GitHub Pages和Jekyll搭建个人博客。"
---

# 使用GitHub Pages搭建个人博客
<pre>
GitHub Pages是GitHub提供的一项免费静态网站托管服务，它允许用户直接从GitHub仓库生成网站。<!--more--> 结合Jekyll静态网站生成器，GitHub Pages成为了开发者搭建个人博客的理想选择。

## 为什么选择GitHub Pages？  

1. **完全免费**：不需要支付任何托管费用  
2. **易于使用**：直接从GitHub仓库部署  
3. **版本控制**：网站内容受Git版本控制  
4. **自定义域名**：支持绑定自己的域名  
5. **HTTPS支持**：自动提供HTTPS加密  

## 开始使用GitHub Pages  

### 第一步：创建GitHub仓库  

1. 登录您的GitHub账户  
2. 创建一个新的仓库，命名为`username.github.io`（将username替换为您的GitHub用户名）  
3. 这个特殊的仓库名称告诉GitHub这是一个GitHub Pages站点  

### 第二步：选择Jekyll主题  

GitHub Pages原生支持Jekyll，您可以：  

1. 在仓库设置中选择一个内置主题  
2. 使用现有的Jekyll主题  
3. 创建自己的主题  

### 第三步：添加内容  

在仓库中创建以下文件：  

1. `_config.yml`：Jekyll配置文件  
2. `index.md`或`index.html`：网站首页  
3. `_posts/`目录：存放博客文章  

### 第四步：编写博客文章  

在`_posts`目录下创建Markdown文件，文件名格式为`YYYY-MM-DD-title.md`：  

```markdown
---
layout: post
title: "我的第一篇博客"
date: 2025-05-10
---

这是我的第一篇博客内容。
```

### 第五步：本地预览（可选）

如果您想在本地预览网站：

1. 克隆仓库到本地
2. 安装Jekyll：`gem install jekyll bundler`
3. 运行：`bundle exec jekyll serve`
4. 在浏览器中访问：`http://localhost:4000`

### 第六步：推送到GitHub

将您的更改推送到GitHub仓库：

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

几分钟后，您的网站将在`https://username.github.io`上线。

## 自定义您的博客

### 自定义域名

1. 在DNS提供商处添加CNAME记录，指向`username.github.io`
2. 在仓库中创建一个名为`CNAME`的文件，内容为您的域名
3. 在仓库设置中配置自定义域名

### 添加评论系统

由于GitHub Pages只支持静态内容，您需要使用第三方评论系统：

1. **Giscus**：基于GitHub Discussions的评论系统
2. **Utterances**：基于GitHub Issues的评论系统
3. **Disqus**：独立的评论服务

### 添加分析工具

添加Google Analytics或百度统计等分析工具，了解访问情况：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_TRACKING_ID');
</script>
```

## 常见问题解决

### 网站未更新

- 确保推送到正确的分支（通常是`main`或`master`）
- 检查GitHub Actions构建日志是否有错误
- 等待几分钟，GitHub Pages可能需要时间来构建

### 自定义域名问题

- 确保DNS记录正确配置
- 检查CNAME文件是否正确
- 在仓库设置中验证自定义域名配置

## 结论

GitHub Pages结合Jekyll是搭建个人博客的强大组合，它不仅免费，而且易于使用和维护。通过本文的指导，您应该能够快速搭建自己的个人博客，开始分享您的知识和经验。

祝您博客之旅愉快！
</pre>