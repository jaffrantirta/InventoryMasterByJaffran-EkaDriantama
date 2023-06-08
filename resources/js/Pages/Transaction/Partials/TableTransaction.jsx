import Paginate from '@/Components/Paginate';
import numeral from 'numeral';
import React, { useEffect } from 'react'
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';
import moment from 'moment';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';

export default function TableTransaction({ heads, contents, onClick }) {
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
                                <React.Fragment key={index}>
                                    <tr className={'border-b'}>
                                        <TableBody className={'text-center'} children={contents.from + index} />
                                        <TableBody children={item.reference_code} />
                                        <TableBody className={'text-center'} children={moment(item.date).format('LL')} />
                                        <TableBody children={item.grand_total} />
                                        <TableBody>
                                            <Link href={route('transaction.detail', { id: item.id })}>
                                                <PrimaryButton>Lihat detail</PrimaryButton>
                                            </Link>
                                        </TableBody>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>

                </table>
            </div>
            <Paginate contents={contents} />
        </div>
    )
}
