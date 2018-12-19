import { useState, useEffect } from 'react';

export function useSearchResult(list, value) {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        setDataSource(!value ? dataSource : (list.filter((item) => {
            return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        })).map((item) => {
            return item.name
        }));
    }, [value]);

    return dataSource;
}

export function useSelectProject(value = null) {
    const [selectProject, setselectProject] = useState(value);

    return [
        selectProject,
        setselectProject
    ];
}