import Paginate from '@/Components/Paginate';
import numeral from 'numeral';
import React, { useEffect } from 'react'
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';

export default function TableJournal({ heads, contents, onClick }) {
    useEffect(() => {
        console.log(contents, 'kaka');
    }, [])

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
                            console.log(item);
                            return (
                                <tr key={index} className={'border-b'}>
                                    <TableBody className={'text-center'} children={contents.from + index} />
                                    <TableBody children={item.date} />
                                    <TableBody children={item.description} />
                                    <TableBody children={'101'} />
                                    <TableBody children={item.description} />
                                    <TableBody className={'text-right'} children={numeral(item.debit).format('0,0.00')} />
                                    <TableBody className={'text-right'} children={numeral(item.kredit).format('0,0.00')} />
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
