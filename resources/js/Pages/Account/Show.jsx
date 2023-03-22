import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';

export default function Show({ auth, status, account }) {
    const bodyRef = useRef(null)
    const [showModel, setShowModel] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [accoundId, setAccoundId] = useState(0)
    const { data, setData, post, patch, delete: destroy, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        type: '',
    });
    const submit = (e) => {
        e.preventDefault()
        if (isUpdate) {
            patch(route('account.update', { id: accoundId }))
            resetSetting()
        } else if (isDelete) {
            destroy(route('account.destroy', { id: accoundId }))
            resetSetting()
        } else {
            post(route('account.store'))
            resetSetting()
        }
    };
    const resetSetting = () => {
        reset()
        setShowModel(false)
        setIsUpdate(false)
        setIsDelete(false)
        bodyRef.current.scrollTop = 0
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
                <table className='w-full'>
                    <thead className=''>
                        <tr className='text-center font-bold text-xl'>
                            <td className='p-1'><div className='rounded-full p-5 bg-slate-600 dark:bg-slate-300 text-slate-100 dark:text-slate-900'>No.</div></td>
                            <td className='p-1'><div className='rounded-full p-5 bg-slate-600 dark:bg-slate-300 text-slate-100 dark:text-slate-900'>Nama</div></td>
                            <td className='p-1'><div className='rounded-full p-5 bg-slate-600 dark:bg-slate-300 text-slate-100 dark:text-slate-900'>Tipe</div></td>
                            <td className='p-1'><div className='rounded-full p-5 bg-slate-600 dark:bg-slate-300 text-slate-100 dark:text-slate-900'>Aksi</div></td>
                        </tr>
                    </thead>
                    <tbody>
                        {account.length > 0 ? account.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className='p-1'><div className='border-b p-3 text-center'>{index + 1}</div></td>
                                    <td className='p-1'><div className='border-b p-3'>{item.name}</div></td>
                                    <td className='p-1'><div className='border-b p-3'>{item.type}</div></td>
                                    <td className='p-1'><div className='border-b p-2 text-center'>
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
                                    </div>
                                    </td>
                                </tr>
                            )
                        }) : <p className='text-xl'>Tidak ada data.</p>}
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
