const regexp = [
    [ 'iOS', /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/, 2],
    [ 'android', /\bAndroid\s*([^;]+)/ ],
    [ 'windows', /\bWindows\sNT\s([\d\.*]*)/i],
    [ 'mac', /\bMac\sOS\sX\s\/([\d\.]*)/i],
    [ 'qqBrowser', /\bMQQBrowser\/([\d\.]+)/ ],
    [ 'nowSDK', /\bNowSDK\/([\d\.]*)/i ], // now结合版
    [ 'qq', /\bQQ\/([\d\.]+)/ ],
    [ 'wechat', /\bMicroMessenger\/([\d\.]*)/ ],
    [ 'now', /\bNow\/([\d\._]+|LocalCompiled)/ ],
    [ 'huayang', /\bhuayangapp\/([\d\.]*)/ ],
    [ 'qzone', /\bQzone\/\w*_([\d\.]+)/ ],
    [ 'pcQQBrowser', /\bQQBrowser\/([\d\.]+)/ ], // PC 的 QQ
    [ 'qqcomic', /\bQQAC_Client(_\w+)?\/([\d\.]*)/i ], // 动漫
    [ 'weibo', /\bweibo/i], //微博
    [ 'yyb', /\/qqdownloader\/(\d+)(?:\/(appdetail|external))?/], //应用宝
    [ 'sougou', /\bmetasr\/([\d\.]*)/i], //搜狗,
    [ 'maxthon', /\bmaxthon\/([\d\.]*)/i],
    [ '360', /\b360se\/([\d\.]*)/i],
    [ 'edge', /\bedge\/([\d\.]*)/i],
    [ 'chrome', /\bChrome\/([\d\.]*)/i],
    [ 'ie', /\bmsie\/([\d\.]*)/i],
    [ 'firefox', /\bfirefox\/([\d\.]*)/i],
    [ 'safari', /bsafari\/([\d\.]*)/i],
];

function getUa() {
    return typeof navigator !== 'undefined' && navigator && navigator.userAgent || '';
}

export function Up(str) {
    return str.replace(/^./, (ch) => ch.toUpperCase());
}

class Device {
    constructor(ua = getUa()) {
        this.ua = ua;

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
        this.netType = ua.match(/NetType\/(\w+)/i) && RegExp.$1.toUpperCase();

        // 机型，主要是安卓机型，例如 HUAWEI C8825D，SAMSUNG-GT-I9308_TD 等
        this.model = ua.match(/\(.*;\s?(\S*?\s?\S*?)\s?(Build)?\//i) && RegExp.$1;
    }

    addItem(name, exp, verPos = 1) {
        const match = this.ua.match(exp);
        const version = (match && match[verPos] || '').replace(/_/g, '.') || null;
        this['is' + Up(name)] = !!match;
        this[name + 'Version'] = version;
    }

    version(name) {
        return this[name + 'Version'] || null;
    }
}

export default Device;
