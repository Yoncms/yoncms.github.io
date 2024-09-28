---
layout: base
title: JS的原型
---
<pre>
//*****************************************************************************************
//JS构造函数里有个属性prototype，而prototype属性是个对象，并且这个对象里又有个constructor的属性，
//constructor的值就是这个构造函数。构造函数本身也有一个constructor属性，该属性与prototype里
//并不一样，默认值也是函数本身，但是可以自定义，通过自定义就会发现它跟prototype里的不同。
//构造函数new出来的对象里有个__proto__属性，而__proto__属性也是
//个对象，并且这个对象里又有个constructor属性，属性值还是这个构造函数。
//*******************************************************************************************

var $ = function (args) {
  return new $.fn(args);
};

$.fn = function (args) {
  //alert(this.constructor);//construtor指向的就是$.fn函数本身
  if(typeof(args) == 'function'){
    var n = 0;
    var timer = setInterval(function () {
      if(n == 1){clearInterval(timer); return ;}
      if(/loaded|complete/.test(document.readyState)){
        args(); n = 1;
      }
    }, 1);
  }else {
    this.name = 'zhangrongquan';
  }
};
//console.log($().__proto__.constructor);//实例化对象里的__proto__属性里的constructor，指向构造函数
//console.log($().constructor);//构造函数本身有constructor，默认指向构造函数 
//console.log($.fn.prototype.constructor);//原型里的constructor，指向构造函数
//上面三行代码运行的结果一样 

//$.fn.prototype = $().__proto__.constructor;//构造函数new出来的对象里有个__proto__属性
//$.fn.prototype = $.fn.prototype.constructor;//构造函数里有个属性prototype
$.fn.prototype = $.fn; //把$.fn赋值给原型
//上面的三行代码的效果是相同的

$.fn.show = function () {
  alert(this.name);
};

$(function () {
  $().show();
});
*/

/*
var $ = function (args) {
  return new F(args);
};

F= function (args) {
  if(typeof(args) == 'function'){
    var n = 0;
    var timer = setInterval(function () {
      if(n == 1){clearInterval(timer); return ;}
      if(/loaded|complete/.test(document.readyState)){
        args(); n = 1;
      }
    }, 1);
  }else {
    this.name = 'zhangrongquan';
  }
};

F.prototype = F;//把F赋给F的原型，这样后面F里添加的方法就会被添加到原型里
F.show = function () {//这里添加的show方法就会被添加到原型里
  alert(this.name);
};
//如果没有前面的赋值，这里只是往F里添加了一个show方法，而原型里并没有show

$(function () {
  $().show();
});
*/
/*
function FN() {
  this.user = 'zhangyichen';
}

FN.prototype = {
  constructor: FN,//强制指向FN，否则默认是Object
  user: 'zhangrongquan',
  show: function () {
    alert('I am ' + this.user);
    //这里的user会先调用构造函数里的user，如果没有再调用原型里的user
  }
};
var F = new FN();
alert(F.constructor == FN);//true，F.constructor得到的就是FN函数
//如果没有前面的强制指向，这里就是false
F.show();
*/
//继承，通过原型链完成
function person(user) {
  this.user = user;
}
function son() {
  this.num = 88888;
  this.show = function () {
    alert(this.user + ' ' + this.num);
  };
}
son.prototype = new person('超类');//通过原型把user属性赋给son
var S = new son();
S.show();
</pre>
