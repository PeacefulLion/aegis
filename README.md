# Aegis
基于 badjs 的前端监控体系平台

## 技术栈
- 语言 ts
- 构建 parcel
- UI框架 echarts + ant-design
- 架构 react hook


## 开发

### whistle 配置
```
/^https?://aegis\.ivweb\.io/(.*\.(js|css|png|jpg|gif|jpeg|svg|blob).*)$/ http://localhost:1234/$1
/^https?://aegis\.ivweb\.io\/?$/ http://localhost:1234/index.html

aegis.ivweb.io pac://网络代理配置文件URL
```

### 调试

1. 登录 https://aegis.ivweb.io 获取登录态

2. 切换至 Whistle 打开 https://aegis.ivweb.io 开始调试


