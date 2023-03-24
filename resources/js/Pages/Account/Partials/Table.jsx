import React from 'react'
import PrimaryButton from '../../../Components/PrimaryButton';
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';

export default function Table({ heads, contents, onClick }) {
    return (
        <div className='overflow-x-auto'>
            <table className='w-full'>
                <thead className=''>
                    <tr className='text-center font-bold text-xl'>
                        {heads.map((item, index) => <TableHeader key={index} title={item} />)}
                    </tr>
                </thead>
                <tbody>
                    {contents.map((item, index) => {
                        return (
                            <tr key={index} className={'border-b'}>
                                <TableBody children={index + 1} />
                                <TableBody children={item.name} />
                                <TableBody children={item.type} />
                                <TableBody className={'p-0 grid grid-cols-1 md:grid-cols-2 gap-2'}>
                                    <PrimaryButton className='flex justify-center' onClick={() => onClick('edit', item)}>Edit</PrimaryButton>
                                    <PrimaryButton className='flex justify-center' onClick={() => onClick('delete', item)}>Hapus</PrimaryButton>
                                </TableBody>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
