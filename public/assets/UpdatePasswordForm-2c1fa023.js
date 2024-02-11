import{r as i,_ as v,j as a,a as s}from"./app-c2e52a93.js";import{I as d}from"./InputError-dda5b5b1.js";import{I as c}from"./InputLabel-b6c5a941.js";import{P as y}from"./PrimaryButton-d03adcf2.js";import{T as p}from"./TextInput-aa3fc491.js";import{t as _}from"./transition-a4acc27a.js";function S({className:w=""}){const l=i.useRef(),m=i.useRef(),{data:e,setData:t,errors:o,put:f,reset:n,processing:h,recentlySuccessful:g}=v({current_password:"",password:"",password_confirmation:""});return a("section",{className:w,children:[a("header",{children:[s("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Update Password"}),s("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Ensure your account is using a long, random password to stay secure."})]}),a("form",{onSubmit:r=>{r.preventDefault(),f(route("password.update"),{preserveScroll:!0,onSuccess:()=>n(),onError:u=>{u.password&&(n("password","password_confirmation"),l.current.focus()),u.current_password&&(n("current_password"),m.current.focus())}})},className:"mt-6 space-y-6",children:[a("div",{children:[s(c,{htmlFor:"current_password",value:"Current Password"}),s(p,{id:"current_password",ref:m,value:e.current_password,onChange:r=>t("current_password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"current-password"}),s(d,{message:o.current_password,className:"mt-2"})]}),a("div",{children:[s(c,{htmlFor:"password",value:"New Password"}),s(p,{id:"password",ref:l,value:e.password,onChange:r=>t("password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s(d,{message:o.password,className:"mt-2"})]}),a("div",{children:[s(c,{htmlFor:"password_confirmation",value:"Confirm Password"}),s(p,{id:"password_confirmation",value:e.password_confirmation,onChange:r=>t("password_confirmation",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s(d,{message:o.password_confirmation,className:"mt-2"})]}),a("div",{className:"flex items-center gap-4",children:[s(y,{disabled:h,children:"Save"}),s(_,{show:g,enterFrom:"opacity-0",leaveTo:"opacity-0",className:"transition ease-in-out",children:s("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Saved."})})]})]})]})}export{S as default};