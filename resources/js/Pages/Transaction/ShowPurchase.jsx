import PrimaryButton from '@/Components/PrimaryButton';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import TableTransaction from './Partials/TableTransaction';

export default function ShowPurchase({ auth, roles, transactions }) {
    const onClickHandle = (e, item) => {
        if (e === 'cancel') {
            setShowModel(false)
        }
    }
    return (
        <Authenticated
            roles={roles}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Transaksi
            </h2>}
        >
            <Head title="Transaksi" />

            <div className='p-10 dark:text-slate-200'>
                <div className='flex justify-end'>
                    <PrimaryButton className='my-5 w-full md:w-fit'><p className='w-full text-center'><Link href={route('transaction.create.purchase')}>Tambah</Link></p></PrimaryButton>
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
