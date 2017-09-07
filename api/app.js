/*
* app升级管理
* */

// 1. app 列表  app_list
// request
+{
    "startPage": number,     // 查询页  默认值1
    "pageSize": number       // 每页数目 默认15
}

// response
+{
    "apps": [
        {
            "app": {                            // app信息
                "appID": "@string",             // appID varchar(32)
                "app_name": "@string",          // app名称 varchar(128)
                "app_desp": "@string",          // app描述 varchar(128)
                "app_status": "@string",        // app状态 varchar(16) 枚举 ["active","inactive","invalid"]
            }
            "app_version": "@string",           // 最新版本版本号 varchar(128)
        },
        ...
    ]
}


// 2. 新增app(修改和新增)
// request
+{
    "app": {                        // app信息
        "appID": "@string",             // appID varchar(32)
        "app_name": "@string",          // app名称 varchar(128)
        "app_desp": "@string",          // app描述 varchar(128)
        "app_status": "@string",        // app状态 varchar(16) 枚举 ["active","inactive","invalid"]
    },
    "getui": {
        "getui_appid": "@string",       // 个推appid varchar(32)
        "getui_appkey": "@string",      // 个推appkey varchar(32)
        "getui_status": "@string"       // 个推状态 varchar(16)
    }
}

// response
+{
    "code": 200           // 新增成功
}

// 3. app详情
// request
+{
    "appID": "@string"      // appID: varchar(32)
}
// response
+{
    "app": {                        // app信息
        "appID": "@string",             // appID varchar(32)
        "app_name": "@string",          // app名称 varchar(128)
        "app_desp": "@string",          // app描述 varchar(128)
        "app_status": "@string",        // app状态 varchar(16) 枚举 ["active","inactive","invalid"]
    },
    "getui": {
        "getui_appid": "@string",       // 个推appid varchar(32)
        "getui_appkey": "@string",      // 个推appkey varchar(32)
        "getui_status": "@string"       // 个推状态 varchar(16)
    },
    "app_versions":[
        {                                   // 版本列表
            "version": "@string",           // 版本号 varchar(128)
            "version_desp": [               // 版本描述 varchar(1024) 多语言
                {"cn": "@string"},
                {"en": "@string"},
                ...
            ],
            "update_address": "@string",    // 版本下载地址 varchar(128)
            "app_size": "@string",          // 文件大小 varchar(32)
            "version_date": "@date"         // 版本日期 bigint
        },
        ...
    ]
}

// 4. 新增、修改版本信息

// 4.1 上传app TODO

// request

// response
+{
    "code": 200,                // 上传成功
    "update_address": "@string" // 升级地址: varchar(32)
}

// 4.2 新增、修改版本信息
// request
+{
    "appID": "@string",                 // appID varchar(32) 新增没有appID
    "app_version": "@string",           // app版本(根据版本判断新增还是修改)
    "version_desp": [                   // 版本描述多语言列表
        {"cn": "@string"},
        {"en": "@string"},
        ...
    ],
    "update_address": "@string",        // 下载地址 人工输入 TODO 自动生成或人工输入
    "app_size": "@string",              // 文件大小 人工输入
}

// response
+{
    "code": 200,                        // 修改/新增成功
    "update_address": "@string"         // app下载地址(url/null)
}