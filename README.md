# CarStore
## 二手车售卖管理系统
------

### 主要技术栈

> * 前端： `Vue` `vuex` `iview`
> * 后端： `NodeJS` `express` `mockjs` `mongoose`
> * 数据库： `MongoDB`
> * 打包工具： `webpack`
> * 应用的依赖： `vue2-dropzone` `vue-draggable` `moment` `axios` `gm` `less`

### 项目总结

> * 部署模拟接口：基础数据导入MongoDB数据库中，使用NodeJS、express搭建后端框架，开启后端服务。其中结合mockjs编写查询接口，利用GraphicsMagick处理图片文件。
> * 路由： `vue-router` （应用路由守卫全局后置钩子`router.afterEach`进行登陆检测）
> * 状态管理： `vuex` 在stores文件夹中
> * components： 全局通用组件
> * filters： 全局过滤器
> * views： 视图文件
> * 样式： 采用css预处理器less编写

### 项目展示

<img src="https://github.com/Chzfly/projectBT/blob/master/capture/show.gif"/>
