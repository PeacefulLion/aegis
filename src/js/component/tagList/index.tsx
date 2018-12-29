import * as React from 'react'; 
import {
    Tag, Input, Tooltip, Icon,
} from 'antd';

const { useState, useEffect, useRef, useImperativeMethods, forwardRef } = React;

interface TagListProps {
    color?: string
    text?: string
}

const TagList = forwardRef((props: TagListProps, ref) => {
    const [tags, setTags]: [string[], Function] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const inputRef: any = useRef(null);

    function showInput() {
        setInputVisible(true);
    }

    useEffect(() => {
        inputVisible && inputRef.current && inputRef.current.focus();
    }, [inputVisible]);


    function handleInputChange(e: any) {
        setInputValue(e.target.value);
    }

    function handleInputConfirm() {
        if (inputValue && tags.indexOf(inputValue) ===  -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);

        setInputValue('');
    }

    function handleClose (removedTag: string) {
        const _tags = tags.filter(tag => tag !== removedTag);

        setTags(_tags);
    }

    useImperativeMethods(ref, () => ({
        getTags: () => {
            return tags
        }    
    }));

    return (
        <div>
            {
                tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag color={props.color} key={tag} closable={true} afterClose={(e) => {console.log(e); handleClose(tag)}}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })
            }
            {
                inputVisible ? (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                ) : null
            }
            {
                !inputVisible ? (
                    <Tag
                        onClick={showInput}
                        color={'blue'}
                    >
                        <Icon type="plus" /> {props.text || '添加关键字'}
                    </Tag>
                ) : null
            }
        </div>
    );
});

export default TagList;