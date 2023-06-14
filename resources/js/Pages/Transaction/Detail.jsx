import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import TextInput from "@/Components/TextInput";
import TableTransactionShowDetail from "./Partials/TableTransactionShowDetail";
import moment from "moment";

export default function Detail({ auth, roles, transaction }) {
    const onClickHandle = (e, item) => {
        if (e === "cancel") {
            setShowModel(false);
        }
    };
    console.log(transaction);
    return (
        <Authenticated
            roles={roles}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Detail Transaksi
                </h2>
            }
        >
            <Head title="Detail Transaksi" />

            <div className="m-10 font-bold">
                <p>Kode Transaksi {transaction.reference_code}</p>
                <p>Tanggal {moment(transaction.created_at).format("LL")}</p>
                <p className="text-xl md:text-4xl">
                    Jumlah Total Rp.{transaction.grand_total}
                </p>
                <a
                    href={route("export.transaction.detail", {
                        transaction_id: transaction.id,
                    })}
                >
                    <PrimaryButton className="my-5 w-full md:w-fit">
                        <p className="w-full text-center">Download detail</p>
                    </PrimaryButton>
                </a>
            </div>

            <div className="p-10 dark:text-slate-200">
                <TableTransactionShowDetail
                    heads={[
                        "No.",
                        "Kode barang.",
                        "Nama barang",
                        "Jumlah",
                        "Total",
                    ]}
                    contents={transaction}
                    onClick={(e, item) => onClickHandle(e, item)}
                />
            </div>
        </Authenticated>
    );
}
