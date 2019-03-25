import { useState } from 'react';

export enum CGI_STATUS {
    INIT,
    LOADING,
    SUCCESS,
    FAIL
}

export function useCGIStatus() {
    return useState(CGI_STATUS.INIT);
}