import * as React from 'react';
import './index.less';
const { useState, useEffect } = React;
import mdContent from '../../../../CHANGELOG.md';
export default function ChangeLog() {

    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: mdContent}} />
        </div>
    )
}
