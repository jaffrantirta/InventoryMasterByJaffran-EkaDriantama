import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import TableJournal from '@/Pages/Journal/Partials/Tablejournal';
import ModalItem from './Partials/ModalJournal';

export default function Show({ auth, status, journals, roles }) {
    console.log(journals);
    const bodyRef = useRef(null)
    const [showModel, setShowModel] = useState(false)
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
    return (
        <AuthenticatedLayout
            roles={roles}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Jurnal Umum
            </h2>}
        >
            <Head title="Jurnal Umum" />
            <div ref={bodyRef}></div>

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
                <TableJournal
                    heads={['No.', 'Tanggal', 'Deskripsi', 'Kode akun', 'Reff', 'Debit', 'Kredit']}
                    contents={journals}
                    onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>
            <ModalItem
                submit={e => submit(e)}
                data={data}
                errors={errors}
                processing={processing}
                setData={e => onChangeHandle(e)}
                showModel={showModel}
                onClick={e => onClickHandle(e)}
            />
            {journals.data.length === 0 ? <p className='text-xl my-10 text-center dark:text-white'>Tidak ada data.</p> : <></>}
        </AuthenticatedLayout>
    );
}
