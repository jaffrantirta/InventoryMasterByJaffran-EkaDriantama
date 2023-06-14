import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import TextInput from "@/Components/TextInput";

export default function Show({ auth, items, roles, categories }) {
    const bodyRef = useRef(null);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
        hasErrors,
    } = useForm({
        start_date: "",
        end_date: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("item.store"));
    };

    return (
        <AuthenticatedLayout
            roles={roles}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Barang
                </h2>
            }
        >
            <Head title="Barang" />
            <div ref={bodyRef}></div>

            {hasErrors && (
                <div className="p-5">
                    <Transition
                        show={hasErrors}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out bg-red-200 p-3 rounded-3xl"
                    >
                        <p className="text-red-900 dark:text-red-600 text-center font-bold text-xl">
                            Oops! Ada kesalahan
                        </p>
                    </Transition>
                </div>
            )}
            <div className="p-5">
                <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out bg-slate-200 p-3 rounded-3xl"
                >
                    <p className="text-slate-900 dark:text-slate-600 text-center font-bold text-xl">
                        Sukses!
                    </p>
                </Transition>
            </div>

            <div className="p-10 dark:text-slate-200">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label
                            htmlFor="start_date"
                            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                        >
                            Start Date
                        </label>
                        <TextInput
                            id="start_date"
                            type="date"
                            className="w-full"
                            value={data.start_date}
                            onChange={(e) =>
                                setData("start_date", e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="end_date"
                            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                        >
                            End Date
                        </label>
                        <TextInput
                            id="end_date"
                            type="date"
                            className="w-full"
                            value={data.end_date}
                            onChange={(e) =>
                                setData("end_date", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href={route("export.journal", {
                                start_date: data.start_date,
                                end_date: data.end_date,
                            })}
                            className="flex border-2 rounded-3xl px-5 py-2 mb-5 cursor-pointer"
                            target="_blank"
                        >
                            <img
                                className="w-5 h-5 mr-2"
                                src="https://cdn-icons-png.flaticon.com/512/724/724933.png"
                                alt="Download Icon"
                            />
                            <p>Download Jurnal Umum</p>
                        </a>
                        <a
                            href={route("export.stock.history", {
                                start_date: data.start_date,
                                end_date: data.end_date,
                            })}
                            className="flex border-2 rounded-3xl px-5 py-2 mb-5 cursor-pointer"
                            target="_blank"
                        >
                            <img
                                className="w-5 h-5 mr-2"
                                src="https://cdn-icons-png.flaticon.com/512/724/724933.png"
                                alt="Download Icon"
                            />
                            <p>Download Kartu Stok</p>
                        </a>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
