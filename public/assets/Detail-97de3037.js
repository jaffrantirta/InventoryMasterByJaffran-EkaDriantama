import{j as t,a as e,n as d}from"./app-c2e52a93.js";import{P as n}from"./PrimaryButton-d03adcf2.js";import{A as m}from"./AuthenticatedLayout-7e7bb6fa.js";import"./TextInput-aa3fc491.js";import c from"./TableTransactionShowDetail-52f9b785.js";import{h}from"./moment-fbc5633a.js";import"./ApplicationLogo-b0e4221b.js";import"./Dropdown-e42d57b0.js";import"./transition-a4acc27a.js";import"./TableHeader-c6fdd518.js";function D({auth:r,roles:i,transaction:a}){const o=(l,s)=>{l==="cancel"&&setShowModel(!1)};return console.log(a),t(m,{roles:i,user:r.user,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Detail Transaksi"}),children:[e(d,{title:"Detail Transaksi"}),t("div",{className:"m-10 font-bold",children:[t("p",{children:["Kode Transaksi ",a.reference_code]}),t("p",{children:["Tanggal ",h(a.created_at).format("LL")]}),t("p",{className:"text-xl md:text-4xl",children:["Jumlah Total Rp.",a.grand_total]}),e("a",{href:route("export.transaction.detail",{transaction_id:a.id}),children:e(n,{className:"my-5 w-full md:w-fit",children:e("p",{className:"w-full text-center",children:"Download detail"})})})]}),e("div",{className:"p-10 dark:text-slate-200",children:e(c,{heads:["No.","Kode barang.","Nama barang","Jumlah","Total"],contents:a,onClick:(l,s)=>o(l)})})]})}export{D as default};