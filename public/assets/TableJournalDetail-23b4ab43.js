import{a as e,j as l}from"./app-c2e52a93.js";import{P as d}from"./PrimaryButton-d03adcf2.js";import{T as i,a as r,n as c}from"./TableHeader-c6fdd518.js";function f({heads:n,contents:s,onClick:o}){return e("div",{children:e("div",{className:"overflow-x-auto",children:l("table",{className:"w-full",children:[e("thead",{className:"",children:e("tr",{className:"text-center font-bold text-xl",children:n.map((a,t)=>e(i,{title:a},t))})}),e("tbody",{children:s.map((a,t)=>l("tr",{className:"border-b",children:[e(r,{className:"text-center",children:t+1}),e(r,{children:a.account_code}),e(r,{children:a.account_name}),e(r,{className:"text-right",children:c(a.debit).format("0,0.00")}),e(r,{className:"text-right",children:c(a.credit).format("0,0.00")}),e(r,{className:"text-center",children:e(d,{children:"Hapus"})})]},t))})]})})})}export{f as default};