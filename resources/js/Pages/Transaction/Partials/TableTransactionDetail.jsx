import Paginate from '@/Components/Paginate';
import numeral from 'numeral';
import React, { useEffect } from 'react'
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';

export default function TableTransactionDetail({ heads, contents = [], onClick }) {
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
                        {contents.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr className={'border-b'}>
                                        <TableBody className={'text-center'} children={index + 1} />
                                        <TableBody children={item?.name} />
                                        <TableBody className='text-right' children={item?.qty} />
                                        <TableBody className='text-right' children={item?.price} />
                                        <TableBody className='text-right' children={item?.qty * item?.price} />
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
