import{j as a,a as e,n}from"./app-c2e52a93.js";import{A as o}from"./AuthenticatedLayout-7e7bb6fa.js";import c from"./TableItem-38e3d496.js";import"./ApplicationLogo-b0e4221b.js";import"./Dropdown-e42d57b0.js";import"./transition-a4acc27a.js";import"./TableHeader-c6fdd518.js";function k({auth:t,roles:d,...r}){return a(o,{user:t.user,roles:d,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Dashboard"}),children:[e(n,{title:"Dashboard"}),e("div",{className:"py-12",children:e("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:e("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:"Selamat datang kembali!"})})})}),a("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-2",children:[e("div",{className:"max-w-7xl sm:px-6 lg:px-8",children:a("div",{className:"bg-red-300 flex flex-col items-center dark:bg-red-800 text-center overflow-hidden shadow-sm sm:rounded-lg",children:[e("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:"Barang dengan stok hampir habis"}),e("div",{className:"p-6 text-gray-900 dark:text-gray-100 text-6xl font-bold",children:r.out_of_stock}),a("a",{target:"_blank",href:route("export.stock",{type:"low"}),className:"flex border-2 rounded-3xl px-5 py-2 mb-5 cursor-pointer",children:[e("img",{className:"w-5 h-5 mr-2",src:"https://cdn-icons-png.flaticon.com/512/724/724933.png"}),e("p",{children:"Download"})]})]})}),e("div",{className:"max-w-7xl sm:px-6 lg:px-8",children:a("div",{className:"bg-amber-300 flex flex-col items-center dark:bg-amber-800 text-center overflow-hidden shadow-sm sm:rounded-lg",children:[e("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:"Barang dengan stok menipis"}),e("div",{className:"p-6 text-gray-900 dark:text-gray-100 text-6xl font-bold",children:r.low_stock}),a("a",{target:"_blank",href:route("export.stock",{type:"enough"}),className:"flex border-2 rounded-3xl px-5 py-2 mb-5 cursor-pointer",children:[e("img",{className:"w-5 h-5 mr-2",src:"https://cdn-icons-png.flaticon.com/512/724/724933.png"}),e("p",{children:"Download"})]})]})}),e("div",{className:"max-w-7xl sm:px-6 lg:px-8",children:a("div",{className:"bg-green-300 flex flex-col items-center dark:bg-green-800 text-center overflow-hidden shadow-sm sm:rounded-lg",children:[e("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:"Barang dengan stok aman"}),e("div",{className:"p-6 text-gray-900 dark:text-gray-100 text-6xl font-bold",children:r.high_stock}),a("a",{target:"_blank",href:route("export.stock",{type:"safe"}),className:"flex border-2 rounded-3xl px-5 py-2 mb-5 cursor-pointer",children:[e("img",{className:"w-5 h-5 mr-2",src:"https://cdn-icons-png.flaticon.com/512/724/724933.png"}),e("p",{children:"Download"})]})]})})]}),e("hr",{className:"my-10"}),e("div",{className:"p-10 dark:text-slate-200",children:e(c,{heads:["No.","Kode Barang","Nama","Harga (Rp)","Stok","Min. Stock","Status"],contents:r.items,onClick:(l,s)=>onClickHandle(l,s)})})]})}export{k as default};