const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir)  // path.join 设置绝对路径
}

module.exports = {
    productionSourceMap:false,
    assetsDir: 'static',
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('@utils',resolve('./src/utils'))
            .set('@c',resolve('./src/components'))
            .set('@assets',resolve('./src/assets'))
            .set('@views',resolve('./src/views'))
            .set('@store', resolve('./src/store'))
    }
};
