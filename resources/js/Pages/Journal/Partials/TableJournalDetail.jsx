import Paginate from '@/Components/Paginate';
import PrimaryButton from '@/Components/PrimaryButton';
import numeral from 'numeral';
import React, { useEffect } from 'react'
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';

export default function TableJournalDetail({ heads, contents, onClick }) {
    return (
        <div>
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
                                    <TableBody className={'text-center'} children={index + 1} />
                                    <TableBody children={item.account_code} />
                                    <TableBody children={item.account_name} />
                                    <TableBody className={'text-right'} children={numeral(item.debit).format('0,0.00')} />
                                    <TableBody className={'text-right'} children={numeral(item.credit).format('0,0.00')} />
                                    <TableBody className={'text-center'}>
                                        <PrimaryButton>Hapus</PrimaryButton>
                                    </TableBody>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
