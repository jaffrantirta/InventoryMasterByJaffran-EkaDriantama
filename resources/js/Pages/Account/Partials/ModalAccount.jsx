import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import React from 'react'

export default function ModalAccount({ showModel, submit, isDelete, data, setData, errors, processing, onClick }) {
    return (
        <Modal show={showModel}>
            <form className='p-10' onSubmit={e => submit(e)}>
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
                                onChange={(e) => setData({ field: 'name', value: e.target.value })}
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="code" value="Kode" />

                            <TextInput
                                id="code"
                                name="code"
                                value={data.code}
                                className="mt-1 block w-full"
                                onChange={(e) => setData({ field: 'code', value: e.target.value })}
                            />

                            <InputError message={errors.code} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="classification" value="Klasifikasi" />

                            <TextInput
                                id="classification"
                                name="classification"
                                value={data.classification}
                                className="mt-1 block w-full"
                                onChange={(e) => setData({ field: 'classification', value: e.target.value })}
                            />

                            <InputError message={errors.classification} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="initial_balance" value="Saldo awal (Rp)" />

                            <TextInput
                                id="initial_balance"
                                name="initial_balance"
                                value={data.initial_balance}
                                type={'number'}
                                className="mt-1 block w-full"
                                onChange={(e) => setData({ field: 'initial_balance', value: e.target.value })}
                            />

                            <InputError message={errors.initial_balance} className="mt-2" />
                        </div>
                    </div>
                )}
                <div className="flex items-center justify-end mt-4">
                    <div className="ml-4 cursor-pointer text-slate-700 dark:text-slate-200" onClick={() => onClick('cancel')} disabled={processing}>
                        Batal
                    </div>
                    <PrimaryButton className="ml-4" disabled={processing}>
                        {isDelete ? 'Hapus' : 'Simpan'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    )
}
