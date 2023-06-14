import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TableItem from "./Partials/TableItem";

export default function Show({ auth, roles, ...props }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={roles}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Selamat datang kembali!
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-red-300 flex flex-col items-center dark:bg-red-800 text-center overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Barang dengan stok hampir habis
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-6xl font-bold">
                            {props.out_of_stock}
                        </div>
                        <a
                            target="_blank"
                            href={route("export.stock", { type: "low" })}
                            className="flex border-2 rounded-3xl px-5 py-2 mb-5 cursor-pointer"
                        >
                            <img
                                className="w-5 h-5 mr-2"
                                src="https://cdn-icons-png.flaticon.com/512/724/724933.png"
                            />
                            <p>Download</p>
                        </a>
                    </div>
                </div>
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-amber-300 flex flex-col items-center dark:bg-amber-800 text-center overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Barang dengan stok menipis
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-6xl font-bold">
                            {props.low_stock}
                        </div>
                        <a
                            target="_blank"
                            href={route("export.stock", { type: "enough" })}
                            className="flex border-2 rounded-3xl px-5 py-2 mb-5 cursor-pointer"
                        >
                            <img
                                className="w-5 h-5 mr-2"
                                src="https://cdn-icons-png.flaticon.com/512/724/724933.png"
                            />
                            <p>Download</p>
                        </a>
                    </div>
                </div>
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-green-300 flex flex-col items-center dark:bg-green-800 text-center overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Barang dengan stok aman
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-6xl font-bold">
                            {props.high_stock}
                        </div>
                        <a
                            target="_blank"
                            href={route("export.stock", { type: "safe" })}
                            className="flex border-2 rounded-3xl px-5 py-2 mb-5 cursor-pointer"
                        >
                            <img
                                className="w-5 h-5 mr-2"
                                src="https://cdn-icons-png.flaticon.com/512/724/724933.png"
                            />
                            <p>Download</p>
                        </a>
                    </div>
                </div>
            </div>

            <hr className="my-10"></hr>

            <div className="p-10 dark:text-slate-200">
                <TableItem
                    heads={[
                        "No.",
                        "Kode Barang",
                        "Nama",
                        "Harga (Rp)",
                        "Stok",
                        "Min. Stock",
                        "Status",
                    ]}
                    contents={props.items}
                    onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>
        </AuthenticatedLayout>
    );
}
