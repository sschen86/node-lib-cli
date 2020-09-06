# node-lib-cli

npm包开发脚手架，内置eslint，rollup，jest等相关组件，支持快速创建，开发，发布npm包

### 功能细节

+ 支持eslint代码格式化
+ 支持热更新调试代码
+ 支持快速创建单元测试

### 安装指南

```
npm install -g node-lib-cli
```

### 脚手架指令

```
node-lib init projectName   # 创建项目
cd projectName & npm install # 安装依赖包
```

### 项目脚本指令

```
dev: 在浏览器端进行开发调试
dev-node：在node端使用nodemon进行开发调试
build：构建输出文件，输出esm，cjs，umd三种格式的文件
deploy：发布新版本
```
