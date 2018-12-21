import React, { useState, useEffect, useRef, useImperativeMethods, forwardRef } from 'react'; 
import {
    Tag, Input, Tooltip, Icon,
} from 'antd';

function TagList(props, ref) {
    const [tags, setTags] = useState([]);

    const [inputVisible, setInputVisible] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const inputRef = useRef(null);

    function showInput(e) {
        setInputVisible(true);
        inputRef.current.focus();
    }
    
    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    function handleInputConfirm(e) {
        if (inputValue && tags.indexOf(inputValue) ===  -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);

        setInputValue('');
    }

    function handleClose (removedTag) {
        const tags = tags.filter(tag => tag !== removedTag);

        setTags(tags);
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
                        <Tag color={props.color} key={tag} closable={index !== 0} afterClose={() => handleClose(tag)}>
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
}

export default forwardRef(TagList);