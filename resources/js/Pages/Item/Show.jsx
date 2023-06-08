import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import TableItem from '@/Pages/Item/Partials/TableItem';
import ModalItem from './Partials/ModalItem';
import TextInput from '@/Components/TextInput';

export default function Show({ auth, items, roles, categories }) {
    const bodyRef = useRef(null)
    const [showModel, setShowModel] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [id, setId] = useState(0)
    const { data, setData, post, patch, delete: destroy, processing, errors, reset, recentlySuccessful, hasErrors } = useForm({
        name: '',
        price: 0,
        stock: 0,
        min_stock: 0,
        reference_code: '',
        categories: '',
        shipping_day: null,
        unit_name: '',
        unit_price: 0,
        unit_sum: 0,
        is_wholesale: false,
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
                reference_code: item.reference_code,
                categories: item.categories,
                name: item.name,
                price: item.price,
                stock: item.unit !== null ? item.stock / item.unit?.sum : item.stock,
                min_stock: item.min_stock,
                shipping_day: item.shipping_day,
                unit_name: item.unit?.name,
                unit_price: item.unit?.price,
                unit_sum: item.unit?.sum,
                is_wholesaler: item.unit === null ? false : true,
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
        if (e.field === 'reference_code') setData('reference_code', e.value)
        if (e.field === 'categories') setData('categories', e.value)
        if (e.field === 'name') setData('name', e.value)
        if (e.field === 'price') setData('price', e.value)
        if (e.field === 'stock') setData('stock', e.value)
        if (e.field === 'min_stock') setData('min_stock', e.value)
        if (e.field === 'shipping_day') setData('shipping_day', e.value)
        if (e.field === 'unit_name') setData('unit_name', e.value)
        if (e.field === 'unit_price') setData('unit_price', e.value)
        if (e.field === 'unit_sum') setData('unit_sum', e.value)
        if (e.field === 'is_wholesaler') setData('is_wholesaler', e.value)
    }

    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const { url } = usePage();

    const searchUrl = search ? url.includes('?search') ? `${url.split('?search')[0]}?search=${encodeURIComponent(search)}` : `${url}?search=${encodeURIComponent(search)}` : url;
    return (
        <AuthenticatedLayout
            roles={roles}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Barang</h2>}
        >
            <Head title="Barang" />
            <div ref={bodyRef}></div>

            {hasErrors && (
                <div className='p-5'>
                    <Transition
                        show={hasErrors}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out bg-red-200 p-3 rounded-3xl"
                    >
                        <p className="text-red-900 dark:text-red-600 text-center font-bold text-xl">Oops! Ada kesalahan</p>
                    </Transition>
                </div>
            )}
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
                <div className='flex justify-between'>
                    <div className='flex gap-5'>
                        <TextInput
                            className="my-4"
                            placeholder="pencarian..."
                            onChange={handleSearchChange}
                        />
                        <Link href={searchUrl}><PrimaryButton className='my-5 w-full md:w-fit'><p className='w-full text-center'>Cari</p></PrimaryButton></Link>
                    </div>
                    <PrimaryButton className='my-5 w-full md:w-fit' onClick={() => setShowModel(true)}><p className='w-full text-center'>Tambah</p></PrimaryButton>
                </div>
                <TableItem
                    heads={['No.', 'Kode Barang', 'Kategori', 'Nama', 'Harga Eceran (Rp)', 'Harga Grosir (Rp)', 'Stok (pcs)', 'Min. Stock', 'Status', 'Aksi']}
                    contents={items}
                    onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>
            <ModalItem
                submit={e => submit(e)}
                data={data}
                errors={errors}
                isDelete={isDelete}
                categories={categories}
                processing={processing}
                setData={e => onChangeHandle(e)}
                showModel={showModel}
                onClick={e => onClickHandle(e)}
            />
            {items.data.length === 0 ? <p className='text-xl my-10 text-center dark:text-white'>Tidak ada data.</p> : <></>}
        </AuthenticatedLayout>
    );
}
