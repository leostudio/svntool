##说明
这个是一个自定义的svn小工具。  

##主要功能
* 获取当前svn路径
* 获取具体log keyword对应的差异列表
* 获取具体log keyword对应的提交版本号

##安装
```shell
npm install -g leoliang-sh/svntool
```
##使用
###获取当前svn路径
```shell
svnp [-p path]
```  
p: svn路径，默认当前路径
###获取版本号
```shell
svnr [-p path] [-s keyword] [-l numOfLog]
```
p: svn路径，默认当前路径  
s: 过滤关键字  
l: 检索log数目，默认是20
###获取更新列表
```shell
svnc [-p path] [-s keyword] [-l numOfLog] [-f prefix]
```
p: svn路径，默认当前路径  
s: 过滤关键字  
l: 检索log数目，默认是20  
f: 需要去除的文件路径前缀。默认情况是使用`svn info`获取的relative url