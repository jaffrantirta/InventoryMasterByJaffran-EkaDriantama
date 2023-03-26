import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import Table from '@/Pages/Account/Partials/Table';
import ModalAccount from './Partials/ModalAccount';

export default function Show({ auth, status, accounts }) {
    const bodyRef = useRef(null)
    const [showModel, setShowModel] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [accoundId, setAccoundId] = useState(0)
    const { data, setData, post, patch, delete: destroy, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        code: '',
        classification: '',
    });
    const submit = (e) => {
        e.preventDefault()
        if (isUpdate) patch(route('account.update', { id: accoundId }))
        if (isDelete) destroy(route('account.destroy', { id: accoundId }))
        if (!isUpdate && !isDelete) post(route('account.store'))
        resetSetting()
    };
    const resetSetting = () => {
        reset()
        setShowModel(false)
        setIsUpdate(false)
        setIsDelete(false)
        setAccoundId(0)
        bodyRef.current.scrollTop = 0
    }
    const onClickHandle = (e, item) => {
        if (e === 'edit') {
            setData({
                name: item.name,
                code: item.code,
                classification: item.classification,
            });
            setAccoundId(item.id)
            setIsUpdate(true);
            setShowModel(true);
        }
        if (e === 'delete') {
            setIsDelete(true)
            setAccoundId(item.id)
            setShowModel(true)
        }
        if (e === 'cancel') {
            setShowModel(false)
            setIsDelete(false)
            setIsUpdate(false)
        }
    }

    const onChangeHandle = (e) => {
        if (e.field === 'name') setData('name', e.value)
        if (e.field === 'code') setData('code', e.value)
        if (e.field === 'classification') setData('classification', e.value)
    }
    return (
        <AuthenticatedLayout
            ref={bodyRef}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Akun</h2>}
        >
            <Head title="Akun" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
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

            <div className='p-10 dark:text-slate-200'>
                <div className='flex justify-end'>
                    <PrimaryButton className='my-5 w-full md:w-fit' onClick={() => setShowModel(true)}><p className='w-full text-center'>Tambah</p></PrimaryButton>
                </div>
                <Table
                    heads={['No.', 'Klasifikasi', 'Kode', 'Nama', 'Aksi']}
                    contents={accounts}
                    onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>
            <ModalAccount
                submit={e => submit(e)}
                data={data}
                errors={errors}
                isDelete={isDelete}
                processing={processing}
                setData={e => onChangeHandle(e)}
                showModel={showModel}
                onClick={e => onClickHandle(e)}
            />
            {accounts.data.length === 0 ? <p className='text-xl my-10 text-center dark:text-white'>Tidak ada data.</p> : <></>}
        </AuthenticatedLayout>
    );
}
