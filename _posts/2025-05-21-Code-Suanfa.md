---
layout: post
title: "编程里的折中查找"
date: 2025-05-21
categories: 技术
tags: [Java, 查找, 博客]
featured_image: /assets/images/article14.jpg
---
# 编程里的折中查找
# 折中查找：前提是该数组是有序的。  
# 查找时每次都折中找，如果要查找的值大于折中的元素，继续往右找，否则网左找

<pre>
public int zzSearch(int[] arr, int key) {
        //数组先排序，折中查找的数组必须有顺序
        Arrays.sort(arr);
        int mid, minElem, maxElem;
        //最小的键值
        minElem = 0;
        //最大的键值
        maxElem = arr.length-1;

        while (maxElem >= minElem){
                //中间键值，就是每次猜的元素的键值
                mid = (minElem + maxElem) / 2;
                //如果要找的元素比猜的大，则在中间元素的右边，不包括猜的元素
                if(key > arr[mid])
                        minElem = mid + 1;
                //如果要找的元素比猜的小，则在左边，不包括所猜的元素
                else if(key < arr[mid])
                        maxElem = mid -1;
                    else return mid;
        }
        return -1;
}
</pre>