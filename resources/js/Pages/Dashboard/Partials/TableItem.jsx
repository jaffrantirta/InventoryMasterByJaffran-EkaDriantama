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
            <p className='font-bold text-lg text-center md:text-left my-3'>Saran untuk stok kembali</p>
            <p className='italic text-xs text-center md:text-left text-amber-600 dark:text-amber-200'>Perhitungan berdasarkan rata - rata penjualan dan lama pengiriman dari pemasok</p>
            <p className='font-bold text-lg text-center md:text-left my-3'>Total: {contents.length}</p>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className=''>
                        <tr className='text-center font-bold text-xl'>
                            {heads.map((item, index) => <TableHeader key={index} title={item} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {contents.length > 0 ? contents.map((item, index) => {
                            return (
                                <tr key={index} className={'border-b'}>
                                    <TableBody className={'text-center'} children={index + 1} />
                                    <TableBody children={item.reference_code} />
                                    <TableBody children={item.name} />
                                    <TableBody className={'text-right'} children={numeral(item.price).format('0,0.00')} />
                                    <TableBody className={'text-right'} children={item.stock} />
                                    <TableBody className={'text-right'} children={item.min_stock} />
                                    <TableBody className={'text-right'}>
                                        {item.stock === 0 ? <p className='text-red-500'>Stok habis</p> : item.min_stock === null ? <p className='text-gray-500'>Minimal stok tidak di set</p> : item.stock <= item.min_stock ? <p className='text-red-200'>Stok segera habis</p> : item.stock <= (item.min_stock * 1.25) ? <p className='text-amber-500'>Stok menipis</p> : <p className='text-green-500'>Stok aman</p>}
                                    </TableBody>
                                </tr>
                            )
                        }) : <p className='text-left font-bold text-green-700 dark:text-green-300'>Semua stok aman!</p>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
