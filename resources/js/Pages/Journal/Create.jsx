import { Head, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect, useState } from 'react'
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import TableJournalDetail from './Partials/TableJournalDetail';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2';
import { Transition } from '@headlessui/react';
import InputError from '@/Components/InputError';
import NavLink from '@/Components/NavLink';

export default function Create({ roles, auth, accounts }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        date: '',
        description: '',
        journal_details: [],
    });

    const onSubmit = () => {
        post(route('journal.store'))
        reset()
    }


    const addJournalDetail = () => {
        const selectHtml = accounts
            .map((account) => `<option value="${account.id}-${account.code}-${account.name}">${account.code} - ${account.name}</option>`)
            .join('');
        Swal.fire({
            title: 'Masukan detail jurnal!',
            html:
                '<div class="flex flex-col text-left">' +
                '<label>Akun</label><br>' +
                `<select class="rounded-full">${selectHtml}</select><br>` +
                '</div>' +
                '<div class="flex flex-col text-left">' +
                '<label>Debet</label><br>' +
                '<input placeholder="masukan debet..." value="0" name="debit" type="number" class="rounded-full w-full"/><br>' +
                '</div>' +
                '<div class="flex flex-col text-left">' +
                '<label>Kredit</label><br>' +
                '<input placeholder="masukan kredit..." value="0" name="credit" type="number" class="rounded-full w-full"/>' +
                '</div>',
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            preConfirm: () => {
                const selectedAccount = Swal.getPopup().querySelector('select').value
                const splitAccount = selectedAccount.split("-");
                const debit = Swal.getPopup().querySelector('input[name="debit"]').value;
                const credit = Swal.getPopup().querySelector('input[name="credit"]').value;
                const account_id = splitAccount[0]
                const account_code = splitAccount[1]
                const account_name = splitAccount[2]

                return { debit, credit, account_id, account_code, account_name };
            },
        }).then(response => {
            if (response.isConfirmed) {
                const { debit, credit, account_id, account_code, account_name } = response.value
                setData('journal_details', [...data.journal_details, {
                    account_id: account_id,
                    account_name: account_name,
                    account_code: account_code,
                    debit: debit,
                    credit: credit
                }])
            }
        })
    }
    return (
        <AuthenticatedLayout
            roles={roles}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Buat Jurnal Umum
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

            <form className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
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
                    <InputLabel value={'Deskripsi'} />
                    <TextInput
                        className='w-full'
                        onChange={(e) => setData('description', e.target.value)}
                        name={'description'}
                        value={data.description} />
                    <InputError message={errors.description} />
                </div>
            </form>

            <div className='p-10 dark:text-slate-200'>
                <div className='flex justify-end'>
                    <PrimaryButton className='my-5 w-full md:w-fit' onClick={() => addJournalDetail()}><p className='w-full text-center'>Tambah Akun</p></PrimaryButton>
                </div>
                <InputError message={errors.journal_details} />
                <TableJournalDetail
                    heads={['No.', 'Kode Akun', 'Nama Akun', 'Debet', 'Kredit', 'Aksi']}
                    contents={data.journal_details}
                />
            </div>

            <div className='p-10 flex gap-5'>
                <NavLink href={route('journal.index')}>Kembali</NavLink>
                <PrimaryButton onClick={() => onSubmit()}>Simpan</PrimaryButton>
            </div>
        </AuthenticatedLayout>
    )
}
