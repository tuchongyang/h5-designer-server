# H5设计平台api文档

服务端代码仓库[](https://github.com/tuchongyang/h5-designer-server) https://github.com/tuchongyang/h5-designer-server

前台代码仓库[](https://github.com/huangwenxia/h5-designer) https://github.com/huangwenxia/h5-designer

[原型地址](https://modao.cc/app/0822f6ebdd7480fedad3defb5deadff1a72324c5?simulator_type=device&sticky)

项目地址 http://h5.tucy.top

api地址 http://h5.tucy.top/api

## 技术栈

### API服务端

![](https://img.shields.io/github/package-json/dependency-version/tuchongyang/h5-designer-server/egg)
![](https://img.shields.io/github/package-json/dependency-version/tuchongyang/h5-designer-server/egg-sequelize)
![](https://img.shields.io/github/package-json/dependency-version/tuchongyang/h5-designer-server/egg-jwt)
![](https://img.shields.io/github/package-json/dependency-version/tuchongyang/h5-designer-server/egg-blueprint)
![](https://img.shields.io/node/v/egg)


### WEB前台

![](https://img.shields.io/github/package-json/dependency-version/huangwenxia/h5-designer/vue)
![](https://img.shields.io/github/package-json/dependency-version/huangwenxia/h5-designer/ant-design-vue)
![](https://img.shields.io/node/v/egg)
- Node.js 8.x
- Typescript 2.8+

## 公共

### 接口对应状态

```
200=操作成功
400=操作失败
401=未登录
500=服务器错误

```

### 关于分页

```json
{
    "page": 1, //当前页数，从1开始
    "pageSize": 20  //每页大小
}
```

## 用户相关

### 登录
`post` `/api/system/user/login`

请求参数
```json
{
    "username": "tcy2",
    "password": "123456"
}
```
响应参数
```json
{
    "status": 200,
    "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2Mjk0Njc4MzMsImV4cCI6MTYzMDA3MjYzM30.1PVt10K4gPO8USjq91FnR9xD6g1rT9vKjNMn_blOJys"
}
```
登录后，将token加到api请求头中
```
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2Mjk0Njc4MzMsImV4cCI6MTYzMDA3MjYzM30.1PVt10K4gPO8USjq91FnR9xD6g1rT9vKjNMn_blOJys"
```

### 注册

`post` `/api/system/user/regist`
请求参数
```json
{
  "email":"779311998@qq.com",
  "code":"088276",
  "username":"tcy",
  "password":"123456"
}
```
响应参数
```json
{
"status": 200
}
```

### 获取注册验证码

`post` `/api/system/user/getcode`
请求参数
```json
{
  "email":"779311998@qq.com"
}
```
响应参数
```json
{
"status": 200
}
```


### 获取用户信息

`get` `/api/system/user/info`
响应参数
```json
{
    "status": 200,
    "result":{
        "id": 1,
        "username": "tcy",
        "email": "779311998@qq.com",
        "name": null,
        "sex": 1, //1、男，2、女
        "avatar": null,
        "type": 2,
        "phone": null,
        "status": 1,
        "lastLoginTime": "2021-08-20 20:18:10",
        "lastLoginIp": "::1",
        "createdAt": "2021-08-20 20:15:48",
        "updatedAt": "2021-08-20 20:18:10",
        "avatar": null
    }
}
```


### 修改个人资料

`post` `/api/system/user/update`
请求参数
```json
{
  "name": "cy",
  "avatar": "",
  "phone": "",
  "sex":1, //1、男，2、女
  "address": "湖北武汉",
  "birth": "1990-09-09"
}
```
响应参数
```json
{
"status": 200
}
```




## 文件

### 文件上传
`post` `/api/file/upload`

请求参数
```json
{
  "file": <File文件>
}
```
响应参数
```json
{
  "status": 200,
  "result":{
    "id": 88,
    "format": "image/jpeg",
    "url": "/public/uploads/2021/08/21/1629512866663871.7066668578337.jpg",
    "path": "app\\public\\uploads\\2021\\08\\21\\1629512866663871.7066668578337.jpg",
    "size": 63264,
    "name": "apic10294.jpg",
    "type": "image",
    "creator": 1,
    "updatedAt": "2021-08-21T02:27:46.669Z",
    "createdAt": "2021-08-21T02:27:46.669Z"
  }
}
```

### 我上传的文件列表
`post` `/api/file/list`

**查询参数**

```
page 当前页数
pageSize 每页大小
type 文件类型, 取值 image、video、audio
```

响应参数

```json
{
  "status": 200,
  "result": {
    "count": 3,
    "rows": [
      {
        "id": 85,
        "format": "video/mp4",
        "url": "/public/uploads/2021/08/21/1629511353604371.88404610484184.mp4",
        "path": "app\\public\\uploads\\2021\\08\\21\\1629511353604371.88404610484184.mp4",
        "size": 1223573,
        "name": "1629511353604371.88404610484184.mp4",
        "type": "video"
      },
      {
        "id": 86,
        "format": "audio/mpeg",
        "url": "/public/uploads/2021/08/21/1629511368048600.1502574126158.mp3",
        "path": "app\\public\\uploads\\2021\\08\\21\\1629511368048600.1502574126158.mp3",
        "size": 3769789,
        "name": "1629511368048600.1502574126158.mp3",
        "type": "audio"
      },
      {
        "id": 87,
        "format": "image/jpeg",
        "url": "/public/uploads/2021/08/21/1629512389496130.82495695257035.jpg",
        "path": "app\\public\\uploads\\2021\\08\\21\\1629512389496130.82495695257035.jpg",
        "size": 71862,
        "name": "apic21188.jpg",
        "type": "image"
      }
    ]
  }
}
```


### 文件删除

`delete` `/api/file/<file_id>`

此方法为硬删除，会同时删除服务器上的文件。


## 场景

### 首页场景列表

`get` `/api/scene/homelist`

请求参数
```json
{
  "page": 1,
  "pageSize": 20
}
```
响应参数
```json
{
  "status": 200,
  "result": {
    "count": 1,
    "rows": [
      {
        "id": 2,
        "title": "我的第一个场景1",
        "desc": "这是描述",
        "cover": "cover url",
        "music": "音乐url",
        "status": 1,
        "properties": "{}",
        "viewCount": 0,
        "creator": 1,
        "createdAt": "2021-08-21 17:22:33",
        "updatedAt": "2021-08-21 17:22:33",
        "user":{
          "name": "cy",
          "avatar": null,
          "username": "tcy2"
        }
      }
    ]
  }
}
```
### 我的场景列表

`get` `/api/scene/list`
请求参数
```json
{
  "page": 1,
  "pageSize": 20
}
```
响应参数
```json
{
  "status": 200,
  "result": {
    "count": 1,
    "rows": [
      {
        "id": 2,
        "title": "我的第一个场景1",
        "desc": "这是描述",
        "cover": "cover url",
        "music": "音乐url",
        "status": 1,
        "properties": "{}",
        "viewCount": 0,
        "creator": 1,
        "createdAt": "2021-08-21 17:22:33",
        "updatedAt": "2021-08-21 17:22:33"
      }
    ]
  }
}
```

### 添加场景

`post` `/api/scene/save`

请求参数
```json
{
  "title":"我的第一个场景1",
  "desc":"这是描述",
  "cover":"cover url",
  "music": "音乐url",
  "properties":"{}"
}
```
响应参数
```json
{
  "status": 200
}
```

### 修改场景

`post` `/api/scene/update/2`

请求参数
```json
{
  "title":"我的第一个场景1",
  "desc":"这是描述",
  "cover":"cover url",
  "music": "音乐url",
  "properties":"{}"
}
```
响应参数
```json
{
  "status": 200
}
```

### 发布场景

`post` `/api/scene/publish/2`
请求参数
```json
{
  "title":"我的第一个场景1",
  "desc":"这是描述",
  "cover":"cover url",
  "music": "音乐url",
  "properties":"{}"
}
```
响应参数
```json
{
  "status": 200
}
```

### 场景详情

`get` `/api/scene/2`
响应参数
```json
{
  "status": 200,
  "result": {
    "id": 2,
    "title": "我的第一个场景1",
    "desc": "这是描述",
    "cover": "cover url",
    "music": "音乐url",
    "status": 1,
    "properties": "{}",
    "viewCount": 0,
    "creator": 1,
    "createdAt": "2021-08-21 17:22:33",
    "updatedAt": "2021-08-21 17:22:33"
  }
}
```

### 场景删除

`delete` `/api/scene/2`
响应参数
```json
{
  "status": 200
}
```
### 添加场景访问记录

`get` `/api/scene/visit/2`

### 场景统计汇总

`get` `/api/scene/stat/total/2`

响应参数
```json
{
  "status": 200,
  "result":{
    "todayNum": 7,
    "yestodayNum": 1,
    "weekNum": 9,
    "monthNum": 9,
    "totalNum": 9
  }
}
```

### 场景统计趋势

`get` `/api/scene/stat/trend/2?startTime=2021-08-19&endTime=2021-08-30`

响应参数
```json
{
    "status": 200,
    "result": {
        "times": [
            "2021-08-16",
            "2021-08-17",
            "2021-08-18",
            "2021-08-19",
            "2021-08-20",
            "2021-08-21",
            "2021-08-22"
        ],
        "pv": [ 0, 0, 0, 0, 1, 1, 0],
        "uv": [ 0, 0, 0, 0, 1, 1, 0],
        "ip": [ 0, 0, 0, 0, 1, 1, 0]
    }
}
```


## 场景页面

### 页面列表

`get` `/api/scene/page/list?sceneId=1`

响应参数
```json
{
    "status": 200,
    "result": [
        {
            "id": 2,
            "name": "页面2",
            "sortIndex": 3,
            "cover": "",
            "elements": "[]",
            "elementsPublish": "[]",
            "properties": "",
            "sceneId": 2,
            "createdAt": "2021-08-21 17:39:07",
            "updatedAt": "2021-08-21 20:36:18",
            "scene_id": 2
        }
    ]
}
```

### 添加页面

`post` `/api/scene/page/save`
请求参数
```json
{
  "name":"页面1",
  "sortIndex": 1,
  "cover":"",
  "properties":"",
  "elements":"",
  "sceneId": 1
}
```
响应参数
```json
{
  "status": 200
}
```
### 修改页面

`post` `/api/scene/page/update/2`
请求参数
```json
{
  "name":"页面2",
  "sortIndex": 3,
  "cover":"",
  "properties":"",
  "elements":""
}
```
响应参数
```json
{
  "status": 200
}
```


### 页面详情

`get` `/api/scene/page/2`
响应参数
```json
{
  "status": 200,
  "result": {
    "id": 2,
    "name": "页面2",
    "sortIndex": 3,
    "cover": "",
    "elements": "[]",
    "elementsPublish": "[]",
    "properties": "",
    "sceneId": 2,
    "createdAt": "2021-08-21 17:39:07",
    "updatedAt": "2021-08-21 20:36:18",
    "scene_id": 2
  }
}
```

### 页面删除

`delete` `/api/scene/page/2`
响应参数
```json
{
  "status": 200
}
```

## 收藏


### 我的收藏列表

`get` `/api/scene/fav/list`
响应参数
```json
{
  "status": 200,
  "result": {
    "count": 1,
    "rows": [
      {
        "id": 2,
        "sceneId": 2,
        "userId": 1,
        "createdAt": "2021-08-22 08:42:40",
        "updatedAt": "2021-08-22 08:42:40",
        "scene": {
            "id": 2,
            "title": "我的第一个场景1",
            "desc": "这是描述",
            "cover": "cover url",
            "music": "音乐url",
            "status": 2,
            "properties": "{}",
            "viewCount": 0,
            "creator": 1,
            "createdAt": "2021-08-21 17:22:33",
            "updatedAt": "2021-08-21 20:36:18"
        }
      }
    ]
  }
}
```

### 添加收藏

`post` `/api/scene/fav/save`

请求参数
```json
{ "sceneId": 2 }
```

响应参数
```json
{
  "status": 200
}
```


### 取消收藏

`post` `/api/scene/fav/cancel`

请求参数
```json
{ "sceneId": 2 }
```

响应参数
```json
{
  "status": 200
}
```