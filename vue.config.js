module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/qkys/api': {
                target: 'http://172.81.253.56:8070',
                changeOrigin: true,
                //pathRewrite: {
                // '^/api': ''    //代理的路径 //是否移除api三个字段,这里我不需要移除，所以注释，具体根据自己的项目前后端来看
                //}
            },
        },
        overlay: {
            warnings: false,
            errors: false,
        },
    },
};
