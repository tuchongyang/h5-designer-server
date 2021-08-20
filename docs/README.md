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
        "sex": 1,
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