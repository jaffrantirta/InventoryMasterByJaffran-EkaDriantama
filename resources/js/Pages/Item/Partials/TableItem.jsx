import Dropdown from '@/Components/Dropdown';
import Paginate from '@/Components/Paginate';
import { Link } from '@inertiajs/react';
import numeral from 'numeral';
import React from 'react'
import PrimaryButton from '../../../Components/PrimaryButton';
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';

export default function TableItem({ heads, contents, onClick }) {
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
                                    <TableBody children={item.reference_code} />
                                    <TableBody>
                                        {item.categories.length > 0 ? item.categories.map((category, indexCat) => {
                                            return <p key={indexCat}>{category.name}</p>
                                        }) : <p className='font-light text-xs text-amber-400'>tidak memiliki kategori</p>}
                                    </TableBody>
                                    <TableBody children={item.name} />
                                    <TableBody className={'text-right'} children={numeral(item.price).format('0,0.00')} />
                                    <TableBody className={'text-right'} children={item.stock} />
                                    <TableBody className={'text-right'} children={item.min_stock} />
                                    <TableBody className={'text-right'}>
                                        {item.stock === 0 ? <p className='text-red-500'>Stok habis</p> : item.min_stock === null ? <p className='text-gray-500'>Minimal stok tidak di set</p> : item.stock <= item.min_stock ? <p className='text-red-600 dark:text-red-200'>Stok segera habis</p> : item.stock <= (item.min_stock * 1.25) ? <p className='text-amber-600'>Stok menipis</p> : <p className='text-green-500'>Stok aman</p>}
                                    </TableBody>

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
