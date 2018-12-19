const regexp = [
    [ 'iOS', /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/, 2],
    [ 'android', /\bAndroid\s*([^;]+)/ ],
    [ 'qqBrowser', /\bMQQBrowser\/([\d\.]+)/ ],
    [ 'nowSDK', /\bNowSDK\/([\d\.]*)/i ], // now结合版
    [ 'QQ', /\bQQ\/([\d\.]+)/ ],
    [ 'wechat', /\bMicroMessenger\/([\d\.]*)/ ],
    [ 'now', /\bNow\/([\d\._]+|LocalCompiled)/ ],
    [ 'nowDev', /\bNow\/([\d\._]+|LocalCompiled)\s*tnowDailybuild/ ],
    [ 'jiaoyou', /\bODApp\/([\d\.]+|LocalCompiled)/ ],
    [ 'jiaoyouDev', /\bODApp\/LocalCompiled/ ],
    [ 'huayang', /\bhuayangapp\/([\d\.]*)/ ],
    [ 'qzone', /\bQzone\/\w*_([\d\.]+)/ ],
    [ 'pcQQBrowser', /\bQQBrowser\/([\d\.]+)/ ], // PC 的 QQ
    [ 'nowOpenSDK', /\bNowOpenSdk\/([\d\.]*)/i], // 百万闯关
    [ 'comicReader', /\bQQAC_Client(_\w+)?\/([\d\.]*)/i ], // 动漫
    [ 'weibo', /\bweibo/i], //微博
    [ 'yyb', /\/qqdownloader\/(\d+)(?:\/(appdetail|external))?/] //应用宝
];

function getUa() {
    return typeof navigator !== 'undefined' && navigator && navigator.userAgent || '';
}

function Up(str) {
    return str.replace(/^./, (ch) => ch.toUpperCase());
}

class Device {
    constructor(ua = getUa()) {
        regexp.forEach((args) => {
            this.addItem.apply(this, args);
        });

        this.platform = this.isIOS ? 'ios' : (this.isAndroid ? 'android' : 'pc');

        regexp.forEach((args) => {
            const [ name ] = args;
            if (this['is' + Up(name)]) {
                this.type = name;
            }
        });

        // 网络类型
        this.netType = getUa().match(/NetType\/(\w+)/i) && RegExp.$1.toUpperCase();

        // 机型，主要是安卓机型，例如 HUAWEI C8825D，SAMSUNG-GT-I9308_TD 等
        this.model = getUa().match(/\(.*;\s?(\S*?\s?\S*?)\s?(Build)?\//i) && RegExp.$1;
    }

    addItem(name, exp, verPos = 1) {
        const match = getUa().match(exp);
        const version = (match && match[verPos] || '').replace(/_/g, '.') || null;
        this['is' + Up(name)] = !!match;
        this[name + 'Version'] = version;
    }

    version(name) {
        return this[name + 'Version'] || null;
    }
}

export default Device;
