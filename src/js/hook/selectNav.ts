import * as React from 'react';;

const {
    useState,
    useEffect
} = React;

export function useSelectNav(value) {
    const [selectNav, setselectNav] = useState(null);

    return [
        selectNav,
        setselectNav
    ];
}