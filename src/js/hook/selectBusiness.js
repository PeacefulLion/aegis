import { useState, useEffect } from 'react';

export default function useSelectBuisness() {
    const [select, setSelect] = useState;

    return [
        select,
        setSelect
    ]
}