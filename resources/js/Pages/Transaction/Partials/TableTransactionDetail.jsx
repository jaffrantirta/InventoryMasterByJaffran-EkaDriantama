import React, { useEffect, useState } from 'react';
import TableBody from '../../../Components/TableBody';
import TableHeader from '../../../Components/TableHeader';
import TextInput from '@/Components/TextInput';
import numeral from 'numeral';

export default function TableTransactionDetail({ heads, contents, onClick, listenGrandTotal }) {
    const [items, setItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        setItems(contents);
    }, [contents]);

    useEffect(() => {
        calculateGrandTotal();
    }, [items]);

    const handleQuantityChange = (index, qty) => {
        const updatedItems = [...items];
        updatedItems[index].qty = qty;
        updatedItems[index].subTotal = qty * updatedItems[index].price;
        setItems(updatedItems);
    };

    const calculateGrandTotal = () => {
        let total = 0;
        items.forEach((item) => {
            total += item.subTotal || 0;
        });
        listenGrandTotal(total);
        setGrandTotal(total);
    };

    return (
        <div>
            <p className='font-bold text-lg text-center md:text-left my-3'>Total: {contents.total}</p>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className=''>
                        <tr className='text-center font-bold text-xl'>
                            {heads.map((item, index) => (
                                <TableHeader key={index} title={item} />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            console.log(item);
                            return (
                                <React.Fragment key={index}>
                                    <tr className='border-b'>
                                        <TableBody className='text-center' children={index + 1} />
                                        <TableBody children={item?.name} />
                                        <TableBody className='text-center'>
                                            <TextInput
                                                className='text-center'
                                                value={numeral(item?.qty).format('0,0')}
                                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            />
                                        </TableBody>
                                        <TableBody className='text-right' children={numeral(item?.price).format('0,0')} />
                                        <TableBody className='text-right' children={numeral(item?.subTotal).format('0,0')} />
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='text-right mt-4'>
                <p className='font-bold'>Total: {numeral(grandTotal).format('0,0')}</p>
            </div>
        </div>
    );
}
