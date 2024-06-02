import React from 'react';
import "./style.css";

export const Stepper = (count: number, complete: boolean) => {
  return (
    <div>
        <div className='circle' style={{ border: complete ? "2px solid green": "2px solid rgb(98, 75, 255)" }}>
            <div className='stepCount'>{count}</div>
        </div>
    </div>
  )
}

export const Line = (complete: boolean) => {
    return (
        <div>
            <div className='h_line' style={{ borderBottom: complete ? "2px solid green":"2px solid rgb(98, 75, 255)" }}></div>
        </div>
    )
}
