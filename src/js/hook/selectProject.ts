import * as React from 'react';
import { Business} from './businessList';

const {
    useState,
    useEffect
} = React;

export function useSearchResult(list: Business[], value: string) {
    const [dataSource, setDataSource] = useState([] as string[]);
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