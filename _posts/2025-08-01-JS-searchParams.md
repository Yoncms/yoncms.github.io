---
layout: post
title: "JS获取URL里参数的方法"
date: 2025-08-01
categories: 技术
tags: [JavaScript, Params, 博客]
featured_image: /assets/images/article41.jpg
---
# JS获取URL里参数的方法

<pre>
使用new URL(location.href).searchParams<!--more-->返回的是一个 URLSearchParams 对象，它提供了一系列用于
操作 URL 查询参数（即 ?key=value）的方法。
常用方法列表：
get(name)			获取指定参数名的第一个值。
getAll(name)			获取指定参数名的所有值（数组）。
set(name, value)		设置指定参数名的值（会替换原来的值）。
append(name, value)		追加一个参数名和值（不删除已有值）。
has(name)			判断是否存在某个参数名。
delete(name)			删除指定参数名的所有值。
toString()			序列化参数为字符串（即 key1=value1&key2=value2 形式）。
sort()				按照键名排序参数。

示例：
const url = new URL("https://example.com/page?tag=js&tag=html&lang=zh");

// 获取所有 tag
console.log(url.searchParams.getAll("tag")); // ["js", "html"]

// 获取第一个 tag
console.log(url.searchParams.get("tag")); // "js"

// 获取第一个 lang
console.log(url.searchParams.get("lang")); // "zh"

// 添加新参数
url.searchParams.append("tag", "css");
console.log(url.searchParams.getAll("tag")); // ["js", "html", "css"]

// 删除参数
url.searchParams.delete("lang");

// 判断参数是否存在
console.log(url.searchParams.has("tag")); // true

// 遍历所有参数
for (const [key, value] of url.searchParams) {
  console.log(key, value);
}

如果知道顺序，并且 getAll() 返回固定数量的值（比如三个），你可以使用 数组解构：
const [a, b, c] = new URL(location.href).searchParams.getAll("key");

全部参数一次性解构成对象
const params = Object.fromEntries(new URL(location.href).searchParams.entries());
const { a, b, c } = params;
但请注意：如果某个参数有多个值，getAll() 才能拿到全部，entries() 只会取第一个值。

</pre>
