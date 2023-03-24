import Dropdown from '@/Components/Dropdown';
import Paginate from '@/Components/Paginate';
import { Link } from '@inertiajs/react';
import React from 'react'
import PrimaryButton from '../../../Components/PrimaryButton';
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';

export default function Table({ heads, contents, onClick }) {
    return (
        <div>
            <p className='font-bold text-lg text-center md:text-left my-3'>Total: {contents.total}</p>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className=''>
                        <tr className='text-center font-bold text-xl'>
                            {heads.map((item, index) => <TableHeader key={index} title={item} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {contents.data.map((item, index) => {
                            return (
                                <tr key={index} className={'border-b'}>
                                    <TableBody className={'text-center'} children={contents.from + index} />
                                    <TableBody children={item.name} />
                                    <TableBody children={item.type} />
                                    <TableBody className={'text-center p-0 grid cursor-pointer grid-cols-1 md:grid-cols-1 gap-2'}>
                                        <Dropdown>
                                            <Dropdown.Trigger>...</Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <PrimaryButton className='flex m-1 w-fit justify-center' onClick={() => onClick('edit', item)}>Edit</PrimaryButton>
                                                <PrimaryButton className='flex m-1 w-fit justify-center' onClick={() => onClick('delete', item)}>Hapus</PrimaryButton>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </TableBody>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Paginate contents={contents} />
        </div>
    )
}
