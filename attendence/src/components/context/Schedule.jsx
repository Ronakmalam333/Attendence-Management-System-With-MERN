import React, { createContext } from 'react'

export const scheduleContext = createContext()
export function Schedule({ children }) {
    const schedule = [{
        "FERAJ": {
            "start": "09:15 AM",
            "end": "10:15 AM",
            "faculty": "Adil Ahmed"
        },
        "BENJ": {
            "start": "10:15 AM",
            "end": "11:15 AM",
            "faculty": "Adil Ahmed"
        },
        "ND": {
            "start": "11:15 AM",
            "end": "12:15 AM",
            "faculty": "Sakshi Kasera"
        },
        "OOPIC": {
            "start": "01:00 PM",
            "end": "03:00 PM",
            "faculty": "Adil Ahmed"
        },
        "ND": {
            "start": "03:00 PM",
            "end": "04:00 PM",
            "faculty": "Sakshi Kasera"
        }
    }]
    return (
        <scheduleContext.Provider value={schedule}>
            {children}
        </scheduleContext.Provider>
    )
}