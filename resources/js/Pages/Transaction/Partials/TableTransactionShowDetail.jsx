import Paginate from '@/Components/Paginate';
import numeral from 'numeral';
import React, { useEffect } from 'react'
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';
import moment from 'moment';

export default function TableTransactionShowDetail({ heads, contents, onClick }) {
    console.log(contents);
    return (
        <div>
            {/* <p className='font-bold text-lg text-center md:text-left my-3'>Total: {contents.total}</p> */}
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className=''>
                        <tr className='text-center font-bold text-xl'>
                            {heads.map((item, index) => <TableHeader key={index} title={item} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {contents.transaction_details.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr className={'border-b'}>
                                        <TableBody className={'text-center'} children={1 + index} />
                                        <TableBody children={item.item.reference_code} />
                                        <TableBody children={item.item.name} />
                                        <TableBody children={item.qty} />
                                        <TableBody children={item.total} />
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>

                </table>
            </div>
            {/* <Paginate contents={contents} /> */}
        </div>
    )
}
