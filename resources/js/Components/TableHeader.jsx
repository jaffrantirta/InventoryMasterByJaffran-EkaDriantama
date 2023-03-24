import React from 'react'

export default function TableHeader({ title }) {
    return (
        <td className='p-1'>
            <div className='rounded-full p-5 bg-slate-600 dark:bg-slate-300 text-slate-100 dark:text-slate-900'>
                {title}
            </div>
        </td>
    )
}
