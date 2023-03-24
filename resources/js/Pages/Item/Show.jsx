import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import Table from '@/Pages/Item/Partials/Table';
import ModalItem from './Partials/ModalItem';

export default function Show({ auth, status, items }) {
    const bodyRef = useRef(null)
    const [showModel, setShowModel] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [id, setId] = useState(0)
    const { data, setData, post, patch, delete: destroy, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        price: 0,
        stock: 0,
    });
    const submit = (e) => {
        e.preventDefault()
        if (isUpdate) patch(route('item.update', { id: id }))
        if (isDelete) destroy(route('item.destroy', { id: id }))
        if (!isUpdate && !isDelete) post(route('item.store'))
        resetSetting()
    };
    const resetSetting = () => {
        reset()
        setShowModel(false)
        setIsUpdate(false)
        setIsDelete(false)
        setId(0)
        bodyRef.current.scrollTop = 0
    }
    const onClickHandle = (e, item) => {
        if (e === 'edit') {
            setData({
                name: item.name,
                price: item.price,
                stock: item.stock
            });
            setId(item.id)
            setIsUpdate(true);
            setShowModel(true);
        }
        if (e === 'delete') {
            setIsDelete(true)
            setId(item.id)
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
        if (e.field === 'price') setData('price', e.value)
        if (e.field === 'stock') setData('stock', e.value)
    }
    return (
        <AuthenticatedLayout
            ref={bodyRef}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Barang</h2>}
        >
            <Head title="Barang" />

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
                    heads={['No.', 'Nama', 'Harga (Rp.)', 'Stok', 'Aksi']}
                    contents={items}
                    onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>
            <ModalItem
                submit={e => submit(e)}
                data={data}
                errors={errors}
                isDelete={isDelete}
                processing={processing}
                setData={e => onChangeHandle(e)}
                showModel={showModel}
                onClick={e => onClickHandle(e)}
            />
            {items.data.length === 0 ? <p className='text-xl my-10 text-center dark:text-white'>Tidak ada data.</p> : <></>}
        </AuthenticatedLayout>
    );
}
