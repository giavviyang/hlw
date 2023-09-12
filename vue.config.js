module.exports = {
    // 1，关闭eslint
    // 2，配置代理
    devServer: {
        proxy: {
            '/api': {     //这里最好有一个 /
                target: 'http://127.0.0.1:8081',  // 后台接口域名
                // target: 'http://localhost:7071/',  // 后台接口域名
                // target: 'http://192.168.0.13:8881',  // 后台接口域名
                changeOrigin: true,  //是否跨域
                pathRewrite:{
                    '^/api':''// 重写路径
                }
            }
        }
    }
}
