---
layout: post
title: Python连接mysql数据库
---
<pre>
import pymysql

# pymysql库是非MySQL官方提供的第三方pymysql库
# 相对于MySQLdb库，pymysql库的运行速度会稍慢

# config = {
#     'host':'127.0.0.1',
#     'user':'root',
#     'password':'',
#     'database':'python',
#     'charset':'utf8',
#     'cursorclass':pymysql.cursors.DictCursor
# }
# db = pymysql.connect(**config)

class pmysql:
     def __init__(self, dn='python',chs='utf8'):
          self.db = pymysql.connect(host='127.0.0.1',
                              user='root',
                              password='',
                              charset= chs,
                              database=dn,
                              cursorclass=pymysql.cursors.DictCursor
                         )

          # 使用 cursor() 方法创建一个游标对象 cursor
          self.cursor = self.db.cursor()

     def query(self, sql, x=0):
          count = self.cursor.execute(sql)
          if sql.find('select')==-1:
               self.db.commit()
               return count
          else:
               if x==0:
                    res = self.cursor.fetchall()
                    self.db.close()
                    return res
               res = self.cursor.fetchone()
               self.db.close()
               return res
          

     def find(self, dct, x=0):
          sql = 'select '
          sql += dct['k'] + ' from ' + dct['t']
          if (w:=dct.get('w'))!=None:
               sql += ' where ' + w
          if dct.get('l')!=None:
               sql += ' limit ' + dct['l']
          # print(sql)
          return self.query(sql, x)
     

     def change(self, dct):
          sql = 'update ' + dct['t']
          sql += ' set ' + dct['kv']
          if (w:=dct.get('w'))!=None:
               sql += ' where ' + w
          print(sql)
          return self.query(sql)
     
</pre>
