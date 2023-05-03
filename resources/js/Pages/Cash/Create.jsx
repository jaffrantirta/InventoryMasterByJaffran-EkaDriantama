import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

export default function Create({ roles, auth, accounts }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        date: new Date().toISOString().slice(0, 10),
        description: '',
        amount: 0,
        account_id: null,
        type: null
    });

    const onSubmit = (e) => {
        e.preventDefault()
        post(route('cash.store'))
        reset()
    }
    return (
        <Authenticated
            roles={roles}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Buat Kas
            </h2>}
        >
            <Head title="Kas" />
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

            <form onSubmit={onSubmit} className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
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
                    <InputLabel value={'Akun'} />
                    <select
                        onChange={e => setData('account_id', e.target.value)}
                        value={data.account_id}
                        required
                        className='rounded-full w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'>
                        <option value="">- Pilih akun -</option>
                        {accounts.map((item) => {
                            return <option key={item.id} value={item.id}>{item.code} - {item.name}</option>
                        })}
                    </select>
                    <InputError message={errors.date} />
                </div>
                <div className='w-full'>
                    <InputLabel value={'Tipe'} />
                    <select
                        onChange={e => setData('type', e.target.value)}
                        value={data.type}
                        required
                        className='rounded-full w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'>
                        <option value="">- Pilih tipe -</option>
                        <option value={'in'}>Kas masuk</option>
                        <option value={'out'}>Kas keluar</option>
                    </select>
                    <InputError message={errors.date} />
                </div>
                <div className='w-full'>
                    <InputLabel value={'Jumlah'} />
                    <TextInput
                        className='w-full'
                        onChange={(e) => setData('amount', e.target.value)}
                        name={'amount'}
                        value={data.amount} />
                    <InputError message={errors.amount} />
                </div>
                <div className='w-full'>
                    <InputLabel value={'Deskripsi'} />
                    <TextInput
                        className='w-full'
                        onChange={(e) => setData('description', e.target.value)}
                        name={'description'}
                        value={data.description} />
                    <InputError message={errors.description} />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <div className="ml-4 cursor-pointer text-slate-700 dark:text-slate-200" onClick={() => onClick('cancel')} disabled={processing}>
                        Batal
                    </div>
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Simpan
                    </PrimaryButton>
                </div>
            </form>

        </Authenticated>
    )
}
