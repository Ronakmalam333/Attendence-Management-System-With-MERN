import React, { createContext, useState } from 'react';

export const tokenContext = createContext();
export function Token() {
    const [token, setToken] = useState(0);
    return (
        <tokenContext.Provider value={{ token, setToken }}>
            {children}
        </tokenContext.Provider>
    )
}