import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import TableJournal from '@/Pages/Journal/Partials/Tablejournal';
import ModalJournal from './Partials/ModalJournal';
import TextInput from '@/Components/TextInput';

export default function Show({ auth, journals, roles }) {
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
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Jurnal Umum
            </h2>}
        >
            <Head title="Jurnal Umum" />
            <div ref={bodyRef}></div>

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
                    <PrimaryButton className='my-5 w-full md:w-fit'><p className='w-full text-center'><Link href={route('journal.create')}>Tambah</Link></p></PrimaryButton>
                </div>
                <TableJournal
                    heads={['No.', 'Tanggal', 'Deskripsi', 'Kode akun', 'Reff', 'Debit', 'Kredit']}
                    contents={journals}
                    onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>
            <ModalJournal
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
