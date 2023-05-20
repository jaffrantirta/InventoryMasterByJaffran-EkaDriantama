import PrimaryButton from '@/Components/PrimaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Transition } from '@headlessui/react'
import { Head, Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import TableCash from './Partials/TableCash'
import ModalCash from './Partials/ModalCash'

export default function Show({ auth, cashes_in, cashes_out, roles }) {
    const [cashStatus, setCashStatus] = useState(true)
    const [cashList, setCashList] = useState(cashes_in)
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        price: 0,
        stock: 0,
    });
    const submit = (e) => {
        e.preventDefault()
        post(route('journal.store'))
        resetSetting()
    };
    const resetSetting = () => {
        reset()
        setShowModel(false)
        bodyRef.current.scrollTop = 0
    }
    const onClickHandle = (e, item) => {
        if (e === 'cancel') {
            setShowModel(false)
        }
    }

    const onChangeHandle = (e) => {
        if (e.field === 'name') setData('name', e.value)
        if (e.field === 'price') setData('price', e.value)
        if (e.field === 'stock') setData('stock', e.value)
    }
    const handleSwitchButton = (type) => {
        setCashStatus(type)
        setCashList(type ? cashes_in : cashes_out)
    }
    return (
        <Authenticated
            roles={roles}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Kas
            </h2>}
        >
            <Head title="Jurnal Umum" />

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

            <div className='flex justify-center gap-5'>
                <PrimaryButton onClick={() => handleSwitchButton(true)} className={!cashStatus ? 'dark:bg-slate-600 bg-slate-500' : ''}>Kas Masuk</PrimaryButton>
                <PrimaryButton onClick={() => handleSwitchButton(false)} className={cashStatus ? 'dark:bg-slate-600 bg-slate-500' : ''}>Kas Keluar</PrimaryButton>
            </div>

            <div className='p-10 dark:text-slate-200'>
                <div className='flex justify-end'>
                    <PrimaryButton className='my-5 w-full md:w-fit'><p className='w-full text-center'><Link href={route('cash.create')}>Tambah</Link></p></PrimaryButton>
                </div>
                <TableCash
                    heads={['No.', 'Tanggal', 'Deskripsi', 'Jumlah']}
                    contents={cashList}
                    onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>
            <ModalCash
                submit={e => submit(e)}
                data={data}
                errors={errors}
                processing={processing}
                setData={e => onChangeHandle(e)}
                // showModel={showModel}
                onClick={e => onClickHandle(e)}
            />
            {cashList.data.length === 0 ? <p className='text-xl my-10 text-center dark:text-white'>Tidak ada data.</p> : <></>}

        </Authenticated>
    )
}
