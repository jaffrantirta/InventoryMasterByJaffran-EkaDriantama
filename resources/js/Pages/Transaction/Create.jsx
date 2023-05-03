import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import TableTransactionDetail from './Partials/TableTransactionDetail';
import NavLink from '@/Components/NavLink';

export default function Create({ roles, auth, items, reference_code }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        date: new Date().toISOString().slice(0, 10),
        reference_code: `TR${reference_code}`,
        items_selected: [],
    });
    const [grandTotal, setGrandTotal] = useState(0)
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState(items);
    const handleChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        const matches = items.filter(item =>
            item.reference_code?.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.name?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(matches);
    };
    const onSubmit = () => {
        post(route('transaction.store'))
        reset()
    }
    return (
        <Authenticated
            roles={roles}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Buat Transaksi
            </h2>}
        >
            <Head title="Buat Transaksi" />
            <div className='p-5'>
                <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out bg-slate-200 p-3 rounded-3xl"
                >
                    <p className="text-slate-900 dark:text-slate-600 text-center font-bold text-xl">Sukses!</p>
                </Transition>
            </div>

            {errors && Object.keys(errors).length > 0 && (
                <div className='p-5'>
                    <Transition
                        show={Object.keys(errors).length > 0}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out bg-red-200 p-3 rounded-3xl"
                    >
                        <p className="text-red-900 dark:text-red-600 text-center font-bold text-xl">Gagal!</p>
                        {Object.keys(errors).map((key, index) => (
                            <p key={index} className="text-red-900 dark:text-red-600 text-center font-bold text-xl">{errors[key]}</p>
                        ))}
                    </Transition>
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                <div className='w-full'>
                    <InputLabel value={'Tanggal'} />
                    <TextInput
                        className='w-full'
                        name={'date'}
                        onChange={(e) => setData('date', e.target.value)}
                        value={data.date}
                        type={'date'} />
                    <InputError message={errors.date} />
                </div>
                <div className='w-full'>
                    <InputLabel value={'Barang'} />
                    <TextInput
                        className='w-full'
                        onChange={handleChange}
                        value={value}
                    />
                    <div className='px-10 p- rounded-3xl mt-5 bg-slate-100 dark:bg-slate-700'>
                        <ul className='dark:text-white overflow-scroll font-bold h-32'>
                            {suggestions.map((item) => (
                                <li className='cursor-pointer hover:text-slate-300' onClick={() => {
                                    let qty = 1
                                    let sub_total = qty * item.price
                                    setData('items_selected', [...data.items_selected, { ...item, qty: qty, item_id: item.id, price: item.price }])
                                    setGrandTotal(gt => (gt + sub_total))
                                }} key={item.id}>{item.reference_code} - {item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='w-full'>
                    <InputLabel value={'Kode'} />
                    <p className='text-6xl font-bold dark:text-white'>{data.reference_code}</p>
                </div>
                <div className='w-full'>
                    <InputLabel value={'Total'} />
                    <p className='text-6xl font-bold dark:text-white'>Rp.{grandTotal}</p>
                </div>

            </div>
            <div className='p-10 dark:text-slate-200'>
                <TableTransactionDetail
                    heads={['No.', 'Barang', 'Jumlah', 'Harga', 'Total', 'Aksi']}
                    contents={data.items_selected}
                // onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>

            <div className='p-10 flex gap-5'>
                <NavLink href={route('transaction.index')}>Kembali</NavLink>
                <PrimaryButton onClick={() => onSubmit()}>Simpan</PrimaryButton>
            </div>

        </Authenticated>
    )
}
