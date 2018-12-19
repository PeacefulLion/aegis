import { useState, useEffect } from 'react';

export function useSelectNav(value) {
    const [selectNav, setselectNav] = useState(null);

    return [
        selectNav,
        setselectNav
    ];
}