import React from 'react'

export default function TableBody({ children, className }) {
    return <td className='p-3'>
        <div className={`p-1 text-center ${className}`}>
            {children}
        </div>
    </td>
}
