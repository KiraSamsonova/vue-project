const path = require('path')

module.exports = {
    outputDir: path.resolve('../public'),

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080'
            }
        }
    }

};