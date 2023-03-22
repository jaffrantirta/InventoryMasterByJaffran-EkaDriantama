import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function Show({ auth, status, account }) {
    const [showModel, setShowModel] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [message, setMessage] = useState({ type: null, message: null, className: null })
    const [accoundId, setAccoundId] = useState(0)
    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        type: '',
    });
    const submit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            patch(route('account.update', { id: accoundId }));
            reset()
            setShowModel(false)
            setIsUpdate(false)
        } else if (isDelete) {
            destroy(route('account.destroy'), {
                id: accoundId,
                preserveScroll: true,
                onSuccess: () => {
                    setMessage({ type: 'success', message: 'Berhasil hapus akun.', className: 'text-green-600' })
                    setShowModel(false)
                    setIsDelete(false)
                },
                onError: () => {
                    setMessage({ type: 'error', message: `Ups! Sepertinya ada kesalahan`, className: 'text-red-600' })
                }
            });
        } else {
            post(route('account.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    setMessage({ type: 'success', message: 'Berhasil tambah data.', className: 'text-green-600' })
                    reset()
                    setShowModel(false)
                },
                onError: () => {
                    setMessage({ type: 'error', message: `Ups! Sepertinya ada kesalahan`, className: 'text-red-600' })
                }
            });
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Akun</h2>}
        >
            <Head title="Akun" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            {message.type !== null && (
                <div className="p-6 text-xl mb-4 font-medium">
                    <div className='bg-slate-200 p-6 rounded-3xl flex justify-between'>
                        <p className={`text-green-600 ${message.className}`}>{message.message}</p>
                        <button onClick={() => setMessage({ type: null, message: null, className: null })}>X</button>
                    </div>
                </div>)}

            <div className='p-10 dark:text-slate-200'>
                <div className='flex justify-end'>
                    <PrimaryButton className='my-5 w-full md:w-fit' onClick={() => setShowModel(true)}><p className='w-full text-center'>Tambah</p></PrimaryButton>
                </div>
                <table className=' w-full'>
                    <thead className='border-2 border-slate-700 dark:border-white'>
                        <tr className='text-center font-bold text-xl'>
                            <td className='border-2 border-slate-700 dark:border-white p-5'>No.</td>
                            <td className='border-2 border-slate-700 dark:border-white p-5'>Nama</td>
                            <td className='border-2 border-slate-700 dark:border-white p-5'>Tipe</td>
                            <td className='border-2 border-slate-700 dark:border-white p-5'>Aksi</td>
                        </tr>
                    </thead>
                    <tbody>
                        {account.length > 0 ? account.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className='border-2 border-slate-700 dark:border-white p-3 text-center'>{index + 1}</td>
                                    <td className='border-2 border-slate-700 dark:border-white p-3'>{item.name}</td>
                                    <td className='border-2 border-slate-700 dark:border-white p-3'>{item.type}</td>
                                    <td className='border-2 border-slate-700 dark:border-white p-3 text-center'>
                                        <div className='flex gap-3 justify-center'>
                                            <PrimaryButton onClick={() => {
                                                setData({
                                                    name: item.name,
                                                    type: item.type,
                                                });
                                                setAccoundId(item.id)
                                                setIsUpdate(true);
                                                setShowModel(true);
                                            }}>
                                                Edit
                                            </PrimaryButton>

                                            <PrimaryButton onClick={() => {
                                                setIsDelete(true)
                                                setAccoundId(item.id)
                                                setShowModel(true)
                                            }}>Hapus</PrimaryButton>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : <p>Tidak ada data.</p>}
                    </tbody>
                </table>
            </div>
            <Modal show={showModel}>
                <form className='p-10' onSubmit={submit}>
                    {isDelete ? (
                        <p className='dark:text-slate-100 text-2xl'>Yakin hapus akun?</p>
                    ) : (
                        <div>
                            <div>
                                <InputLabel htmlFor="name" value="Nama" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="type" value="Tipe" />

                                <TextInput
                                    id="type"
                                    name="type"
                                    value={data.type}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('type', e.target.value)}
                                />

                                <InputError message={errors.type} className="mt-2" />
                            </div>
                        </div>
                    )}
                    <div className="flex items-center justify-end mt-4">
                        <div className="ml-4 cursor-pointer text-slate-700 dark:text-slate-200" onClick={() => {
                            setShowModel(false)
                            setIsDelete(false)
                            setIsUpdate(false)
                        }} disabled={processing}>
                            Batal
                        </div>
                        <PrimaryButton className="ml-4" disabled={processing}>
                            {isDelete ? 'Hapus' : 'Simpan'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
