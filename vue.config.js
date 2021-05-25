module.exports = {
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            stylus: {
                stylusOptions: {
                    // Specify the path. where to find files
                    resolveURL: true,
                },
            }
        }
    }

}
