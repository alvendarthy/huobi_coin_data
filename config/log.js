module.exports = {
    appenders: {
        default: {
            type: 'file',
            filename: 'logs/default.log'
        },
        kline : {
            type: 'file',
            filename: 'logs/kline.log'
        }
    },
    categories: {
        default: {
            appenders: ['default'],
            level: 'debug'
        },
        kline: {
            appenders: ['kline'],
            level: 'debug'
        }
    },

	tag : 'kline',
    level : 'debug'
}

