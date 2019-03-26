export type QueryObj = {
    [key: string]: string | number
}

export type QueryStringObj = {
    [key: string]: string
}

/**
 * 对象转为查询字符串 {a:1, b: 2} => a=1&b=2
 * @param o
 */
export function queryStringify(o: QueryObj): string {
    return Object.keys(o).map(key => {
        const val = encodeURIComponent(
            o[key].toString()
        );

        return `${key}=${val}`;
    }).join('&');
}

/**
 * 查询字符串化为对象 a=1&b=2 => {a:'1', b: '2'}
 * @param str
 */
export function queryParse(str: string): QueryStringObj {
    return str.split('&').reduce((acc, e) => {
        const [k, v] = e.split('=');
        acc[k] = decodeURIComponent(v);

        return acc;
    }, {} as QueryStringObj);
}

/**
 * 设置最后选中的项目ID
 * @param last
 */
export function setLastSelect(last :string): void {
    localStorage.setItem('last_select', last);
}

/**
 * 获取最后选中的项目ID
 */
export function getLastSelect(): string {
    return localStorage.getItem('last_select');
}
