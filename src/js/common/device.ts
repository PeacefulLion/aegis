const regexp: [string, RegExp, number][] = [
    [ 'iOS', /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/, 2],
    [ 'android', /\bAndroid\s*([^;]+)/, 1],
    [ 'windows', /\bWindows\sNT\s([\d\.*]*)/i, 1],
    [ 'mac', /\bMac\sOS\sX\s\/([\d\.]*)/i, 1],
    [ 'qqBrowser', /\bMQQBrowser\/([\d\.]+)/ , 1],
    [ 'nowSDK', /\bNowSDK\/([\d\.]*)/i , 1], // now结合版
    [ 'qq', /\bQQ\/([\d\.]+)/ , 1],
    [ 'wechat', /\bMicroMessenger\/([\d\.]*)/ , 1],
    [ 'now', /\bNow\/([\d\._]+|LocalCompiled)/ , 1],
    [ 'huayang', /\bhuayangapp\/([\d\.]*)/ , 1],
    [ 'qzone', /\bQzone\/\w*_([\d\.]+)/ , 1],
    [ 'pcQQBrowser', /\bQQBrowser\/([\d\.]+)/ , 1], // PC 的 QQ
    [ 'qqcomic', /\bQQAC_Client(_\w+)?\/([\d\.]*)/i , 1], // 动漫
    [ 'weibo', /\bweibo/i, 1], //微博
    [ 'yyb', /\/qqdownloader\/(\d+)(?:\/(appdetail|external))?/, 1], //应用宝
    [ 'sougou', /\bmetasr\/([\d\.]*)/i, 1], //搜狗,
    [ 'maxthon', /\bmaxthon\/([\d\.]*)/i, 1],
    [ '360', /\b360se\/([\d\.]*)/i, 1],
    [ 'edge', /\bedge\/([\d\.]*)/i, 1],
    [ 'chrome', /\bChrome\/([\d\.]*)/i, 1],
    [ 'ie', /\bmsie\/([\d\.]*)/i, 1],
    [ 'firefox', /\bfirefox\/([\d\.]*)/i, 1],
    [ 'safari', /bsafari\/([\d\.]*)/i, 1]
];

const webviewCoreRegExp: [string, RegExp][] = [
    ['X5', /tbs/i],
    ['UIWebview', /Core\/UIWebView/i],
    ['WKWebview', /Core\/WKWebView/i]
]

function getUa(): string {
    return typeof navigator !== 'undefined' && navigator && navigator.userAgent || '';
}

export function Up(str: string): string {
    return str.replace(/^./, (ch) => ch.toUpperCase());
}

interface Device {
    [index: string]: string | boolean | null
    ua: string
}

export function getDevice(ua: string): Device {
    const device: Device = {
        ua: ua
    }

    // 网络类型
    if(ua.match(/NetType\/(\w+)/i)) {
        device.netType = RegExp.$1.toUpperCase();
    }

    // 机型，主要是安卓机型，例如 HUAWEI C8825D，SAMSUNG-GT-I9308_TD 等
    if(ua.match(/\(.*;\s?(\S*?\s?\S*?)\s?(Build)?\//i)) { 
        device.model = RegExp.$1;
    }

    regexp.forEach(([name, exp, verPos]) => {
        const match = ua.match(exp);
        const version = (match && match[verPos] || '').replace(/_/g, '.') || null;
        device['is' + Up(name)] = !!match;
        device[name + 'Version'] = version;
    });

    webviewCoreRegExp.forEach(([name, exp]) => {
        if(exp.test(ua)) {
            device['is' + Up(name)] = true;
        }
    });
    
    return device;
}
