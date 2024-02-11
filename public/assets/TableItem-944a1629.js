import{j as s,a as e}from"./app-c2e52a93.js";import{D as m}from"./Dropdown-e42d57b0.js";import{P as k}from"./Paginate-6440b45e.js";import{T as u,a as r,n as f}from"./TableHeader-c6fdd518.js";import{P as i}from"./PrimaryButton-d03adcf2.js";import"./transition-a4acc27a.js";function T({heads:p,contents:c,onClick:h}){const x=t=>{const a=new Date,n=new Date;n.setTime(a.getTime()-6048e5);const o=n.toISOString().split("T")[0],l=a.toISOString().split("T")[0],d=route("export.item.history.stock",{start_date:o,end_date:l,item_id:t});window.location.href=d},g=t=>{const a=new Date,n=new Date;n.setMonth(a.getMonth()-1);const o=n.toISOString().split("T")[0],l=a.toISOString().split("T")[0],d=route("export.item.history.stock",{start_date:o,end_date:l,item_id:t});window.location.href=d};return s("div",{children:[s("p",{className:"font-bold text-lg text-center md:text-left my-3",children:["Total: ",c.total]}),e("div",{className:"overflow-x-auto",children:s("table",{className:"w-full",children:[e("thead",{className:"",children:e("tr",{className:"text-center font-bold text-xl",children:p.map((t,a)=>e(u,{title:t},a))})}),e("tbody",{children:c.data.map((t,a)=>{var n;return s("tr",{className:"border-b",children:[e(r,{className:"text-center",children:c.from+a}),e(r,{children:t.reference_code}),e(r,{children:t.categories.length>0?t.categories.map((o,l)=>e("p",{children:o.name},l)):e("p",{className:"font-light text-xs text-amber-400",children:"tidak memiliki kategori"})}),e(r,{children:t.name}),e(r,{className:"text-right",children:f(t.price).format("0,0")}),e(r,{className:"text-right",children:f((n=t.unit)==null?void 0:n.price).format("0,0")}),e(r,{className:"text-right",children:t.stock}),e(r,{className:"text-right",children:t.min_stock}),e(r,{className:"text-right",children:t.stock===0?e("p",{className:"text-red-500",children:"Stok habis"}):t.min_stock===null?e("p",{className:"text-gray-500",children:"Minimal stok tidak di set"}):t.stock<=t.min_stock?e("p",{className:"text-red-600 dark:text-red-200",children:"Stok segera habis"}):t.stock<=t.min_stock*1.25?e("p",{className:"text-amber-600",children:"Stok menipis"}):e("p",{className:"text-green-500",children:"Stok aman"})}),e(r,{className:"text-center p-0 grid cursor-pointer grid-cols-1 md:grid-cols-1 gap-2",children:s(m,{children:[e(m.Trigger,{children:"..."}),s(m.Content,{children:[e(i,{className:"flex m-1 w-fit justify-center",onClick:()=>h("edit",t),children:"Edit"}),e(i,{className:"flex m-1 w-fit justify-center",onClick:()=>h("delete",t),children:"Hapus"}),e(i,{className:"flex m-1 w-fit justify-center",onClick:()=>x(t.id),children:"Download riwayat stok 1 minggu"}),e(i,{className:"flex m-1 w-fit justify-center",onClick:()=>g(t.id),children:"Download riwayat stok 1 bulan"})]})]})})]},a)})})]})}),e(k,{contents:c})]})}export{T as default};