export function firstUpperCase(str: String) {
    return str.replace(/^\S/, function (s) {
        return s.toUpperCase();
    });
}
