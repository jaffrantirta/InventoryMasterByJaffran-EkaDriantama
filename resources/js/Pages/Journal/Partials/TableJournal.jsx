import Paginate from '@/Components/Paginate';
import numeral from 'numeral';
import React, { useEffect } from 'react'
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';

export default function TableJournal({ heads, contents, onClick }) {
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
                                        <TableBody children={item.date} />
                                        <TableBody children={item.description} />
                                        <TableBody children={''} />
                                        <TableBody children={''} />
                                        <TableBody children={''} />
                                        <TableBody children={''} />
                                    </tr>
                                    {item.journal_details.map((detail, indexDetail) => {
                                        return (
                                            <tr key={indexDetail} className={'border-b'}>
                                                <TableBody children={''} />
                                                <TableBody children={''} />
                                                <TableBody children={''} />
                                                <TableBody children={detail.account.code} />
                                                <TableBody children={detail.account.name} />
                                                <TableBody className={'text-right'} children={numeral(detail.debit).format('0,0.00')} />
                                                <TableBody className={'text-right'} children={numeral(detail.credit).format('0,0.00')} />
                                            </tr>
                                        )
                                    })}
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
