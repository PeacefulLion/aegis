module.exports = {
    env: {
        "es6": true,
        "browser": true,
        "node": true
    },
    extends: ['ivweb'],
    plugins: [
        "class-property",
        "react-hooks"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    rules: {
        'no-mixed-operators': 0,
        'brace-style': [1, '1tbs'],
        'camelcase': 0,
        "eqeqeq": 0,
        "spaced-comment": 0,
        "react-hooks/rules-of-hooks": "error",
        "react/jsx-first-prop-new-line": 0,
        "react/jsx-closing-bracket-location": 0,
        "padding-line-between-statements": 0
    },
    globals: {
        GDTINCO: true,
        GDT: true,
        define: true,
        plug: true,
        window: true,
        mqq: true,
        navigator: true,
        process: true,
        AlloyReport: true,
        IS_SERVER: true,
        GDTMOD: true
    }
};
