module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: `https://todex.netlify.app`,
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': `/` }
            }
        }
    }
}