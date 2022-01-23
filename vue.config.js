module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '././' : '/',
    lintOnSave: false,
    devServer: {
        proxy: {
            '/qkys/api': {
                target: 'http://172.81.253.56:8070',
                changeOrigin: true,
            },
        },
        overlay: {
            warnings: false,
            errors: false,
        },
    },
};
