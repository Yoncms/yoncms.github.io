---
layout: base
title: Apache httpd.conf配置文件参数解释
---
**Apache配置中的内容均不区分大小写**
<pre>
1、ServerRoot 配置（如：ServerRoot “C:/Apache”）
ServerRoot "" 主要用于指定Apache的安装路径，此选项参数值在安装Apache时系统会自动把Apache的路径写入。Windows安装时，
该选项的值为Windows安装的路径，Linux安装时该选项值为编译时选择的路径。
2、Mutex default:logs
互斥：允许你为多个不同的互斥对象设置互斥机制【mutex mechanism】和互斥文件目录，或者修改全局默认值如果互斥对象是基于文
件的以及默认的互斥文件目录不在本地磁盘或因为其它原因而不适用，那么取消注释并改变目录。
3、Listen 配置（如：Listen 80）
Listen主要侦听web服务端口状态，默认为：80，即侦听所有的地址的80端口，注意这里也可以写成IP地址的侦听形式，不写即默认的地址：0.0.0.0。
4、Dynamic Shared Object (DSO) Support(动态共享对象支持)
主要用于添加Apache一些动态模块，比如php支持模块。重定向模块，认证模块支持，注意如果需要添加某些模块支持，只需把相关模块前面注释符
号取消掉。如图所示，要对Apache添加某个功能模块，把前面的注释符号去掉就行。
5、Apache运行用户配置
此选项主要用指定Apache服务的运行用户和用户组，默认为：daemon。
6、Apache服务默认管理员地址设置
此选项主要用指定Apache服务管理员通知邮箱地址，选择默认值即可，如果有真实的邮箱地址也可以设置此值。
7、Apache的默认服务名及端口设置
此选项主要用指定Apache默认的服务器名以及端口，默认参数值设置为：ServerName localhost:80即可。
8、Apache的根目录访问控制设置（如： # AllowOverride None # Require all denied）
此选项主要是针对用户对根目录下所有的访问权限控制，默认Apache对根目录访问都是拒绝访问。
9、Apache的默认网站根目录设置及访问控制(...)
此区域的配置文件，主要是针对Apache默认网站根目录的设置以及相关的权限访问设置，默认对网站的根目录具有访问权限，此选项默认值即可，
即后面3句：Options Indexes FollowSymLinks //// AllowOverride None //// Require all granted
10、Apache的默认首页设置（...）
此区域文件主要设置Apache默认支持的首页，默认只支持:index.html首页，如要支持其他类型的首页，需要在此区域添加:如index.php表示支
持index.php类型首页。
11、Apache关于.ht文件访问配置（...）
此选项主要是针对.ht文件访问控制，默认为Require all denied具有访问权限，Require all granted是允许的。
12、Apache关于日志文件配置（...）
此区域文件主要是针对Apache默认的日志级别，默认的访问日志路径，默认的错误日志路径等相关设置，此选项内容默认即可
13、URL重定向，cgi模块配置说明（... //// ...//// ...）
此区域文件主要包含一些URL重定向，别名，脚本别名等相关设置，以及一些特定的处理程序，比如cgi设置说明。
14、MIME媒体文件，以及相关http文件解析配置说明（...）
此区域文件主要包含一些mime文件支持，以及添加一些指令在给定的文件扩展名与特定的内容类型之间建立映射关系，比如添加对php文件扩展名映射关系。
15、服务器页面提示设置（
如：#ErrorDocument 500 "The server made a boo boo."
#ErrorDocument 404 /missing.html
#ErrorDocument 404 "/cgi-bin/missing_handler.pl"
#ErrorDocument 402 http://www.example.com/subscription_info.html）
此区域可定制的访问错误响应提示，支持三种方式：1明文 ，2本地重定向 3，外部重定向；另外还包括内存映射或“发送文件系统调用”可被用于分发文件等配置
16、Apache服务器补充（扩展）设置（如：Include...）
此区域主要包括：服务器池管理，多语言错误消息，动态目录列表形式配置，语言设置，用户家庭目录，请求和配置上的实时信息，虚拟主机，Apache
Http Server手册，分布式创作和版本控制，多种类默认设置，mod_proxy_html，使其支持HTML4/XHTML1等等补充配置的补充
17、Apache服务器安全连接设置（...）
此区域主要是关于服务器安全连接设置，用于使用https连接服务器等设置的地方
18、AllowOverride：允许覆盖的意思，即Apache允许另一配置文件覆盖现有配置文件。
利用Apache的rewrite模块可以对URL进行重写，rewrite规则会写在 .htaccess 文件里。但要使 apache 能够正常的读取.htaccess 文件的内容，就必
须对.htaccess 所在目录进行配置。从安全性考虑，根目录的AllowOverride属性一般都配置成不允许任何Override，即：< Directory />
AllowOverride None
< /Directory>
在 AllowOverride 设置为 None 时， .htaccess 文件将被完全忽略。当此指令设置为 All 时，所有具有 “.htaccess” 作用域的指令都允许出现在
.htaccess 文件中。而对于 URL rewrite 来说，至少需要把目录设置为：
< Directory /myblogroot/>
AllowOverride FileInfo
< /Directory>
19、Allow和Deny可以用于apache的conf文件或者.htaccess文件中（配合Directory, Location, Files等），用来控制目录和文件的访问授权。最常用的是：
Order Deny,Allow
Allow from All
Deny,Allow”中间只有一个逗号，也只能有一个逗号，有空格都会出错；单词的大小写不限。上面设定的含义是先设定“先检查禁止设定，没有禁止的全部允许”，
而第二句没有Deny，也就是没有禁止访问的设定，直接就是允许所有访问了。这个主要是用来确保或者覆盖上级目录的设置，开放所有内容的访问权。下面的设
定是无条件禁止访问：
Order Allow,Deny
Deny from All
如果要禁止部分内容的访问，其他的全部开放：
Order Deny,Allow
Deny from ip1 ip2
或
Order Allow,DenyAllow from allDeny from ip1 ip2apache会按照order决定最后使用哪一条规则，比如上面的第二种方式，虽然第二句allow允许了访问，
但由于在order中allow不是最后规则，因此还需要看有没有deny规则，于是到了第三句，符合ip1和ip2的访问就被禁止了。所以，order决定的“最后”规则非常重要。
20、Options指令的主要作用是控制特定目录将启用哪些服务器特性，Options指令后可以附加指定多种服务器特性，特性选项之间以空格分隔。Options指令语法允
许在配置选项前加上符号"+"或者"-"，是Apache允许在一个目录配置中设置多个Options指令。如果一个目录被多次设置了Options，则指定特性数量最多的一
个Options指令会被完全接受(其它的被忽略)，而各个Options指令之间并不会合并。但是如果我们在可选配置项前加上了符号"+"或"-"，那么表示该可选项将
会被合并。所有前面加有"+"号的可选项将强制覆盖当前的可选项设置，而所有前面有"-"号的可选项将强制从当前可选项设置中去除。
21、Require:访问控制
Require all granted #允许所有来源访问
Require all denied #拒绝所有来源访问
Require expr expression #允许表达式为true时访问
Require ip 10 172.20 192.168.2 #允许 特定IP段访问，多个段之前用空格隔开。每个段使用开头几项表示
Require host splaybow.com #只允许来自域名splaybow.com的主机访问
</pre>
