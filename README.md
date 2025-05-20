# Jekyll GitHub个人主页模板使用说明

## 概述

这是一个基于Jekyll的GitHub个人主页模板，保留了原HTML/CSS版本的美观布局和视觉效果，同时增加了Jekyll的强大功能。该模板具有以下特点：

- 科技感蓝色风格设计
- 支持文章发布功能
- 集成Giscus评论系统（基于GitHub Discussions）
- 响应式设计，适配各种设备
- 完整的Jekyll目录结构（_data、_layouts、_posts、_includes等）
- 数据驱动的内容管理
- 清晰的结构和易于维护的代码

## 目录结构

```
jekyll-html-template/
├── _config.yml           # 主配置文件
├── _data/                # 数据文件目录
│   ├── navigation.yml    # 导航菜单数据
│   ├── projects.yml      # 项目展示数据
│   └── skills.yml        # 技能数据
├── _includes/            # 可重用组件目录
│   ├── about.html        # 关于我组件
│   ├── articles.html     # 文章列表组件
│   ├── contact.html      # 联系方式组件
│   ├── footer.html       # 页脚组件
│   ├── header.html       # 页头组件
│   ├── hero.html         # 英雄区域组件
│   ├── projects.html     # 项目展示组件
│   └── skills.html       # 技能展示组件
├── _layouts/             # 页面布局目录
│   ├── blog.html         # 博客列表页布局
│   ├── default.html      # 默认布局（基础框架）
│   ├── home.html         # 首页布局
│   └── post.html         # 文章详情页布局
├── _posts/               # 博客文章目录
│   ├── 2025-05-15-jekyll-blog-guide.md          # 示例文章1
│   ├── 2025-05-10-github-pages-blog.md          # 示例文章2
│   └── 2025-05-05-responsive-design-practices.md # 示例文章3
├── assets/               # 静态资源目录
│   ├── css/              # CSS样式文件
│   │   └── style.css     # 主样式文件
│   ├── js/               # JavaScript文件
│   │   └── main.js       # 主脚本文件
│   └── images/           # 图片资源目录
├── blog/                 # 博客列表页
│   └── index.html        # 博客列表页入口
└── index.html            # 网站首页
```

## 使用方法

### 1. 安装Jekyll

首先，确保您的系统已安装Ruby和RubyGems，然后安装Jekyll：

```bash
gem install jekyll bundler
```

### 2. 部署到GitHub Pages

1. 创建一个新的GitHub仓库，命名为`username.github.io`（将username替换为您的GitHub用户名）
2. 将模板文件上传到该仓库
3. GitHub会自动构建并部署您的网站到`https://username.github.io`

### 3. 本地预览

如果您想在本地预览网站：

1. 克隆仓库到本地：
   ```bash
   git clone https://github.com/username/username.github.io.git
   cd username.github.io
   ```

2. 安装依赖：
   ```bash
   bundle install
   ```

3. 启动本地服务器：
   ```bash
   bundle exec jekyll serve
   ```

4. 在浏览器中访问`http://localhost:4000`预览网站

### 4. 自定义网站配置

编辑`_config.yml`文件，修改以下内容：

```yaml
# 网站基本配置
title: 您的网站标题
description: 您的网站描述
baseurl: "" # 如果您的网站托管在子目录中，请在此处设置
url: "" # 您的网站URL，例如 https://username.github.io

# 作者信息
author:
  name: 您的名字
  tagline: 您的职位/标语
  bio: 在这里介绍您自己，包括您的背景、兴趣和专业领域。

# 社交链接
social_links:
  github: https://github.com/yourusername
  github_username: yourusername
  linkedin: https://linkedin.com/in/yourprofile
  linkedin_username: yourprofile
  twitter: https://twitter.com/yourusername
  twitter_username: yourusername
  email: your.email@example.com

# 英雄区域设置
hero:
  title: 欢迎来到我的个人空间
  description: 这里是我分享技术、思考和创意的地方
  button_text: 阅读我的文章
  button_link: "#articles"

# 关于我设置
about:
  - 在这里介绍您自己，包括您的背景、兴趣和专业领域。这段文字应该能够让访问者快速了解您是谁，您做什么，以及您的价值观。
  - 您可以分享您的职业经历、教育背景、个人成就或任何您认为重要的信息。这是展示您个性和专业能力的好地方。

# 联系方式设置
contact:
  description: 如果您有任何问题、合作意向或者只是想打个招呼，欢迎通过以下方式联系我：
```

### 5. 自定义导航菜单

编辑`_data/navigation.yml`文件：

```yaml
- name: 首页
  link: /#
- name: 关于我
  link: /#about
- name: 技能
  link: /#skills
- name: 项目
  link: /#projects
- name: 文章
  link: /#articles
- name: 联系我
  link: /#contact
```

### 6. 自定义技能展示

编辑`_data/skills.yml`文件：

```yaml
- name: 编程语言
  items:
    - name: JavaScript
      level: 90
    - name: Python
      level: 85
    - name: Java
      level: 75
- name: 前端技术
  items:
    - name: HTML/CSS
      level: 95
    - name: React
      level: 80
    - name: Vue
      level: 70
```

### 7. 自定义项目展示

编辑`_data/projects.yml`文件：

```yaml
- title: 项目名称1
  description: 项目简短描述，介绍这个项目的主要功能和特点。
  image: /assets/images/project1.jpg
  tags:
    - React
    - Node.js
    - MongoDB
  demo_url: https://example.com/demo1
  github_url: https://github.com/yourusername/project1
  featured: true
```

### 8. 发布新文章

在`_posts`目录下创建新的Markdown文件，文件名格式为`YYYY-MM-DD-title.md`：

```markdown
---
layout: post
title: "文章标题"
date: 2025-05-15
categories: 分类
tags: [标签1, 标签2]
featured_image: /assets/images/article1.jpg
excerpt: "文章摘要，会显示在文章列表中。"
---

这里是文章内容，使用Markdown格式编写。
```

### 9. 设置评论系统

本模板使用Giscus作为评论系统，它基于GitHub Discussions功能。设置步骤：

1. 确保您的GitHub仓库已启用Discussions功能
2. 访问[Giscus官网](https://giscus.app/)
3. 按照指引配置您的Giscus
4. 获取配置参数（repo、repo_id、category、category_id等）
5. 将这些参数更新到`_config.yml`文件中的comments部分

```yaml
# 评论系统设置 (Giscus - 基于GitHub Discussions)
comments:
  provider: giscus
  giscus:
    repo: yourusername/yourrepo
    repo_id: your_repo_id
    category: Announcements
    category_id: your_category_id
```

## 自定义样式

### 修改颜色主题

主要颜色变量定义在`assets/css/style.css`文件的`:root`选择器中：

```css
:root {
    --primary-color: #0366d6;
    --secondary-color: #2188ff;
    --accent-color: #79b8ff;
    /* 其他颜色变量 */
}
```

修改这些变量可以轻松更改整个网站的配色方案。

### 添加自定义CSS

如果您想添加自定义样式，可以在`assets/css/style.css`文件末尾添加，或创建新的CSS文件并在`_layouts/default.html`中引用。

## 响应式设计

本模板已内置响应式设计，可以在不同设备上正常显示：

- 桌面电脑
- 平板电脑
- 移动手机

无需额外配置，模板会自动适应不同屏幕尺寸。

## 常见问题

### 如何添加新页面？

1. 在根目录或创建一个新目录
2. 添加`index.html`文件，包含前置数据：

```html
---
layout: default
title: 页面标题
---

<div class="your-page-container">
  <!-- 页面内容 -->
</div>
```

### 如何更改网站图标？

将您的图标文件放在`assets/images/`目录下，然后在`_layouts/default.html`中更新引用。

### 如何添加Google Analytics？

在`_layouts/default.html`中的`</head>`标签前添加Google Analytics代码：

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

### 如何添加自定义域名？

1. 在GitHub仓库设置中添加自定义域名
2. 在域名注册商处添加相应的DNS记录
3. 在仓库根目录创建一个名为`CNAME`的文件，内容为您的域名

## 技术支持

如有任何问题或需要帮助，请通过GitHub Issues联系我们。

---

祝您使用愉快！
