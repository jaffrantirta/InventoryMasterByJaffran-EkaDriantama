import Dropdown from '@/Components/Dropdown';
import Paginate from '@/Components/Paginate';
import { Link } from '@inertiajs/react';
import numeral from 'numeral';
import React from 'react'
import PrimaryButton from '../../../Components/PrimaryButton';
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';
import moment from 'moment';

export default function TableCash({ heads, contents, onClick }) {
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
                                    <TableBody children={moment(item.journal.date).format('LL')} />
                                    <TableBody children={item.journal.description} />
                                    <TableBody className={'text-right'} children={numeral(item.journal.journal_details[0].debit).format('0,0.00')} />
                                    {/* <TableBody className={'flex justify-center'}><PrimaryButton>Edit</PrimaryButton></TableBody> */}
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
