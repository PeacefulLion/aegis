import * as React from 'react';

const {
    useState,
    useEffect
} = React;

export default function useSelectBuisness() {
    const [select, setSelect] = useState(null);

    return [
        select,
        setSelect
    ]
}
