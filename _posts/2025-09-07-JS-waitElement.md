---
layout: post
title: "JS等待获取/查找元素"
date: 2025-09-01
categories: 技术
tags: [JavaScript, DOM, 博客]
featured_image: /assets/images/article45.jpg
---
# JavaScript等待获取/查找元素

<pre>
&lt;div id='dv'&gt;
	&lt;div class='abc'&gt;1&lt;/div&gt;&lt;!--more--&gt;
	&lt;div class='abd'&gt;2&lt;/div&gt;
	&lt;div class='adc'&gt;3&lt;/div&gt;
	&lt;div class='abe'&gt;4&lt;/div&gt;
	&lt;div class='aec'&gt;5&lt;/div&gt;
	&lt;div class='afc'&gt;6&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
// 等待获取元素
function $y(selector, fn, single=0) {

	const $$ = (args, single)=>{
		if(
			(args.includes('#') && 
			((args.includes('\\ ')) || 
			!args.includes(' '))) || 
			single==1
			){
			return document.querySelector(args);
		}
		return document.querySelectorAll(args);   
	};
	// Promise 包装逻辑，是为了支持异步等待
	return new Promise((resolve) => {
		const el = $$(selector, single);
		// 如果调用 $y(selector) 的时候，元素已经在DOM里，就直接返回，不必等待。
		if (el) return resolve(el);
		// 可以监听 DOM 树的变化（比如新增节点、删除节点、属性变化等）。
		const observer = new MutationObserver(() => {
			// 查找目标元素
			const el = $$(selector);
			if (el) {
				// 如果找到了停止继续监听，节省性能。
				observer.disconnect();
				// resolve(el) 把找到的元素返回给调用方。
				resolve(el);
			}
		});
		// observer.observe(target, options) 表示从某个目标节点开始监听 DOM 变化。
		// document.body：从整个页面的 body 节点开始监听
		// childList: true → 监听子节点的添加/删除。
		// subtree: true → 监听后代所有层级，而不仅仅是第一层。
		observer.observe(document.body, { childList: true, subtree: true });
	}).then(fn);
}

//调用方法
$y("#dv", function(el){
    el.addEventListener('mouseover', (e)=>{
        const em = e.target;
        console.log('className', em.className); 
    });
});
&lt;/script&gt;
</pre>