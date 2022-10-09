module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '././' : '/',
    lintOnSave: false,
    devServer: {
        proxy: {
            '/qkys/api': {
                target: 'http://43.142.128.151:8070',
                changeOrigin: true,
            },
        },
        overlay: {
            warnings: false,
            errors: false,
        },
    },
};
