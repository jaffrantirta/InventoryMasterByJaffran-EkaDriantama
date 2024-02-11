import{r,_ as U,j as k,a as t,n as E,F}from"./app-c2e52a93.js";import{P as M}from"./PrimaryButton-d03adcf2.js";import{A as H}from"./AuthenticatedLayout-7e7bb6fa.js";import P from"./TableUser-60768eb4.js";import R from"./ModalUser-e30d8bbc.js";import{t as B}from"./transition-a4acc27a.js";import"./ApplicationLogo-b0e4221b.js";import"./Dropdown-e42d57b0.js";import"./Paginate-6440b45e.js";import"./TableHeader-c6fdd518.js";import"./InputError-dda5b5b1.js";import"./InputLabel-b6c5a941.js";import"./Modal-a9ea5355.js";import"./TextInput-aa3fc491.js";function ee({auth:w,status:_,users:m,roles:g}){const u=r.useRef(null),[y,s]=r.useState(!1),[f,o]=r.useState(!1),[i,n]=r.useState(!1),[p,d]=r.useState(0),{data:N,setData:l,post:b,patch:v,delete:S,processing:A,errors:h,reset:C,recentlySuccessful:D,hasErrors:c}=U({name:"",email:"",password:""}),T=e=>{e.preventDefault(),f&&v(route("user.update",{id:p})),i&&S(route("user.destroy",{id:p})),!f&&!i&&b(route("user.store")),j()},j=()=>{C(),s(!1),o(!1),n(!1),d(0),u.current.scrollTop=0},x=(e,a)=>{e==="edit"&&(l({name:a.name,email:a.email,password:a.password}),d(a.id),o(!0),s(!0)),e==="delete"&&(n(!0),d(a.id),s(!0)),e==="cancel"&&(s(!1),n(!1),o(!1))},I=e=>{e.field==="name"&&l("name",e.value),e.field==="email"&&l("email",e.value),e.field==="password"&&l("password",e.value)};return k(H,{user:w.user,roles:g,header:t("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Akun"}),children:[t(E,{title:"Akun"}),t("div",{ref:u}),t("div",{className:"p-5",children:t(B,{show:D||c,enterFrom:"opacity-0",leaveTo:"opacity-0",className:`transition ease-in-out ${c?"bg-red-200":"bg-slate-200"} p-3 rounded-3xl`,children:t("p",{className:"text-slate-900 dark:text-slate-600 text-center font-bold text-xl",children:c?h.message:"Sukses!"})})}),k("div",{className:"p-10 dark:text-slate-200",children:[t("div",{className:"flex justify-end",children:t(M,{className:"my-5 w-full md:w-fit",onClick:()=>s(!0),children:t("p",{className:"w-full text-center",children:"Tambah"})})}),t(P,{heads:["No.","Nama","Email","Aksi"],contents:m,onClick:(e,a)=>x(e,a)})]}),t(R,{submit:e=>T(e),data:N,errors:h,isDelete:i,processing:A,setData:e=>I(e),showModel:y,onClick:e=>x(e)}),m.data.length===0?t("p",{className:"text-xl my-10 text-center dark:text-white",children:"Tidak ada data."}):t(F,{})]})}export{ee as default};