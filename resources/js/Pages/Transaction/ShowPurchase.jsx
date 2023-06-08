import PrimaryButton from '@/Components/PrimaryButton';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import TableTransaction from './Partials/TableTransaction';

export default function ShowPurchase({ auth, roles, transactions }) {
    const onClickHandle = (e, item) => {
        if (e === 'cancel') {
            setShowModel(false)
        }
    }
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const { url } = usePage();

    const searchUrl = search ? url.includes('?search') ? `${url.split('?search')[0]}?search=${encodeURIComponent(search)}` : `${url}?search=${encodeURIComponent(search)}` : url;
    return (
        <Authenticated
            roles={roles}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Transaksi Pembelian
            </h2>}
        >
            <Head title="Transaksi" />

            <div className='p-10 dark:text-slate-200'>
                <div className='flex justify-between'>
                    <div className='flex gap-5'>
                        <TextInput
                            className="my-4"
                            placeholder="pencarian..."
                            onChange={handleSearchChange}
                        />
                        <Link href={searchUrl}><PrimaryButton className='my-5 w-full md:w-fit'><p className='w-full text-center'>Cari</p></PrimaryButton></Link>
                    </div>
                    <Link href={route('transaction.create.purchase')}><PrimaryButton className='my-5 w-full md:w-fit'><p className='w-full text-center'>Tambah</p></PrimaryButton></Link>
                </div>
                <TableTransaction
                    heads={['No.', 'Kode ref.', 'Tanggal', 'Grand Total', 'Aksi']}
                    contents={transactions}
                    onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>

        </Authenticated>
    )
}
