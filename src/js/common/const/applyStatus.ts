export const STATUS_CHECK = 0;
export const STATUS_PASS = 1;
export const STATUS_REJECT = 2;
export const STATUS_ALL = 3;

enum APPLY_STATUS {
    STATUS_CHECK,
    STATUS_PASS,
    STATUS_REJECT,
    STATUS_ALL
}

interface IKeyValueMap {
    [key: string]: { key: string; value: APPLY_STATUS; text: string };
}

export const APPLY_STATUS_MAP: IKeyValueMap = {
    STATUS_CHECK: {
        key: 'STATUS_CHECK',
        value: APPLY_STATUS.STATUS_CHECK,
        text: '待审核'
    },
    STATUS_PASS: {
        key: 'STATUS_PASS',
        value: APPLY_STATUS.STATUS_PASS,
        text: '已通过'
    },
    STATUS_REJECT: {
        key: 'STATUS_REJECT',
        value: APPLY_STATUS.STATUS_REJECT,
        text: '已拒绝'
    },
    STATUS_ALL: {
        key: 'STATUS_ALL',
        value: APPLY_STATUS.STATUS_ALL,
        text: '全部'
    }
};

export default APPLY_STATUS;
