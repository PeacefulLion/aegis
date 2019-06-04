import * as React from 'react';

const {
    useState,
    useEffect
} = React;

export function useSelectNav(value: number) {
    const [selectNav, setselectNav] = useState(value);

    return [
        selectNav,
        setselectNav
    ];
}
