---
layout: post
title: "Excel表格转换"
categories: misc
---

<pre>
import random
import re
from openpyxl import Workbook, load_workbook, utils
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side

# Version:24.8.31
# 
# 把整个操作封装成类

class zhangyichen():
    dctw = {}
    dcth = {}
    def __init__(self):
        # 先拿到要操作的表格的数据
        lw = load_workbook('kebiao.xlsx', read_only=True)
        ws = lw['Sheet2']
        row = ws.max_row - 1
        self.lt = [ws[f'c{x+2}'].value for x in range(row)]
        lw.close()
        self.align = Alignment(horizontal='center',vertical='center',wrapText=True)

    @staticmethod
    def cffoo(x):
        em = x.split('-')
        em = list(range(int(em[0]), int(em[1])+1))
        return em

    # 设置周数，把周数转成一个列表返回
    def chaif(self, val):
        # 有,号表示哪周和哪周的意思
        if val.find(',')!=-1:
            val = val.split(',')
            arr = []
            for x in val:
                # 有-号表示联系几周都有课
                if x.find('-')!=-1:
                    arr += zhangyichen.cffoo(x)
                else:
                    arr += [int(x)]
        else:
            if val.find('-')!=-1:
                arr = zhangyichen.cffoo(val)
            else:
                arr = [int(val)]
        return arr            

    # 把周和地点的数据加入字典
    def setzhou(self, arg):
        obj = {'name':arg[0]}
        val = arg[1].replace('周','')
        arr = self.chaif(val)
        obj['weeknum'] = arr
        # 上课的校区
        obj['adree'] = arg[2]
        # 上课的教室代码
        obj['class'] = arg[3]
        # print(obj)
        return obj

    # 处理数据
    def changedata(self):
        arr = []
        for x in self.lt:
            if x != None:
                data = x.split('教师')[0]
                data = data.replace('：',': ')
                # 通过空白符分割成的列表会有很多的空白元素必须删除
                data = list(filter(None, (data.split(' '))))
                val = data[1:len(data)]
                val = (data[0], val[1], val[3], val[5])
            else:
                val = (0,'0',0,0)
            dt = self.setzhou(val)
            arr.append(dt)
        return arr
    
    # 设置星期的哪一天
    def setweek(self):
        arg = self.changedata()
        # arr里的元素是星期每一天的包含几行数据，不同的表格需要修改
        arr = (1, 5, 2, 4)
        for k, v in enumerate(arg):
            if k<arr[0]:
                v['week']=1
            elif k<sum(arr[:2]):
                v['week']=2
            elif k<sum(arr[:3]):
                v['week']=3
            elif k<sum(arr[:4]):
                v['week']=4
            else:
                v['week']=5
        # print(arg)
        return arg
    
    # 获取原表的数据
    def getdata(self):
        self.data = data = self.setweek()
        self.wmax = max([max(x['weeknum']) for x in data])

    # 创建要写入数据的excel表格
    def createExcel(self):
        self.getdata()
        try:
            lws = load_workbook('demo.xlsx')
        except:      
            wks = Workbook('demo.xlsx')
            wks.save('demo.xlsx')
            lws = load_workbook('demo.xlsx')
        self.lws = lws
        # rage = lws.worksheets[0] # 获取到的是表对象
        sheet = lws.sheetnames[0] # 获取到的是表名
        self.wb = wb = lws[sheet]
        zhangyichen.deldata(wb, 3, self.wmax+3, 2, 7)
        wb.merge_cells('a1:f1')

    # 清空单元格数据
    @staticmethod
    def deldata(rg, r1, r2, c1, c2):
        for x in range(r1, r2):
            for i in range(c1, c2):
                rg.cell(row=x, column=i, value='')

    # 设置表头
    def sethead(self):
        self.createExcel()
        wb = self.wb
        A1 = wb['A1']
        A1.value = '产品2302课程表'
        A1.alignment = self.align
        A1.font = Font(size=18, bold=True)
        wb.row_dimensions[1].height = 30
        wb.row_dimensions[2].height = 26
        hrr = ['周次', '星期一', '星期二', '星期三', '星期四', '星期五']
        for k,v in enumerate(hrr):
            rg = wb.cell(row=2,column=k+1)
            rg.value=v
            rg.alignment = self.align
            rg.font = Font(size=11,bold=True)
        for x in range(1, self.wmax+1):
            rw = wb.cell(row=x+2, column=1)
            rw.value = x
            rw.alignment = self.align
            rw.font = Font(size=12,bold=False)

    # 设置宽度
    def setwh(self, string, col):
        gc = self.dctw.get(col)
        ls = len(re.findall('[A-Z0-9-]+',string)[0])
        ln = len(string.encode())-len(string) + ls
        if gc==None or ln>gc:
            self.dctw[col] = ln

    # 设置行高
    def setht(self, val, row):
        gc = self.dcth.get(row)
        h = 16
        n = len(re.findall(r'\n', val))
        if n == 0:
            n = 1
        if gc==None or n * h + 10 >gc:
            self.dcth[row] = n * h + 10

    # 设置单元格样式
    def filldata(self):
        for x in self.data:
            em = x['weeknum']
            adr, wk, nm, cs = x['adree'], x['week'], x['name'], x['class']
            for i in em:
                if type(adr)==str:
                    string = nm + '【' + adr + cs +'】\n'
                    wcl = self.wb.cell(row=i+2, column=wk+1)
                    if wcl.value == None:
                        wcl.value = string
                    else:
                        wcl.value += string
                    # 单元格的数据靠左对齐、垂直居中、自动换行
                    wcl.alignment = Alignment(horizontal='left',vertical='center',wrapText=True)
                    self.setwh(string, wk+1)
                    self.setht(wcl.value, i+2)
        for k, v in self.dctw.items():
            self.wb.column_dimensions[utils.get_column_letter(k)].width = v
        for kk, vv in self.dcth.items():
            self.wb.row_dimensions[kk].height = vv


    # 删除单元格里数据最后的换行符
    @staticmethod
    def stripn(rg, r1, r2, c1, c2):
        for x in range(r1, r2):
            for i in range(c1, c2):
                rag = rg.cell(row=x, column=i)
                rag.value = rag.value.strip('\n')

    def empty(self):
        maxrow, maxcol = self.wb.max_row, utils.get_column_letter(self.wb.max_column)
        x = f'A3:{maxcol}{maxrow}'
        for c in self.wb[x]:
            for cl in c:
                # 判断是否为空单元格
                if cl is None or cl.value=='':
                    cl.alignment = self.align
                    cl.value = '——'

    # 为整个表格添加边框
    def addBorder(self):
        maxrow, maxcol = self.wb.max_row, utils.get_column_letter(self.wb.max_column)
        x = f'A1:{maxcol}{maxrow}'
        bd = Side(style='thin',color='FFFFFF')
        for r in self.wb[x]:
            for c in r:
                c.border = Border(left=bd,right=bd,top=bd,bottom=bd)

    # 生成随机颜色
    @staticmethod
    def setcolor():
        s = list('ABCDEF0123456789'*6)
        random.shuffle(s)
        f = ''.join(s[:6])
        b = ''.join(s[2:8])
        return f, b

    # 填充颜色
    def fillcolor(self, c2):
        r2 = self.wmax+3
        zhangyichen.stripn(self.wb, 3, r2, 2, c2)
        for x in range(1, r2):
            for i in range(1, c2):
                rag = self.wb.cell(row=x, column=i)
                clor = zhangyichen.setcolor()
                if x==1:
                    rag.font = Font(size=18, bold=True, color='000000')
                    rag.fill = PatternFill(patternType='solid', fgColor='FFFF00')
                else:
                    rag.font = Font(color=clor[0])
                    rag.fill = PatternFill(patternType='solid', fgColor=clor[1])

    def execute(self):
        # 设置表头的样式，写入数据
        self.sethead()

        # 往表格添加数据
        self.filldata()

        # 给整个表格添加边框
        self.addBorder()

        # 空白单元格（就是没有功课的），添加标识符
        # empty()

        # 填充颜色
        self.fillcolor(7)

        print('> 操作完成！')

        # 保存表格
        self.lws.save('demo.xlsx')

zyc = zhangyichen()

zyc.execute()
</pre>
