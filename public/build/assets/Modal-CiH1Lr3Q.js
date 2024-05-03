import{S as x}from"./SectionTitle-DyzwGDQa.js";import{o as w,d as h,b as d,w as n,k as l,a,r as p,E as b,h as k,i as $,j as S,m as y,v as f,p as v,n as E,e as B}from"./app-BstrQY2K.js";const C={class:"md:grid md:grid-cols-3 md:gap-6"},z={class:"mt-5 md:mt-0 md:col-span-2"},M={class:"px-4 py-5 sm:p-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg"},j={__name:"ActionSection",setup(o){return(t,e)=>(w(),h("div",C,[d(x,null,{title:n(()=>[l(t.$slots,"title")]),description:n(()=>[l(t.$slots,"description")]),_:3}),a("div",z,[a("div",M,[l(t.$slots,"content")])])]))}},N={class:"fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50","scroll-region":""},T=a("div",{class:"absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"},null,-1),V=[T],A={__name:"Modal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(o,{emit:t}){const e=o,g=t,c=p(),i=p(e.show);b(()=>e.show,()=>{var s;e.show?(document.body.style.overflow="hidden",i.value=!0,(s=c.value)==null||s.showModal()):(document.body.style.overflow=null,setTimeout(()=>{var r;(r=c.value)==null||r.close(),i.value=!1},200))});const m=()=>{e.closeable&&g("close")},u=s=>{s.key==="Escape"&&e.show&&m()};k(()=>document.addEventListener("keydown",u)),$(()=>{document.removeEventListener("keydown",u),document.body.style.overflow=null});const _=S(()=>({sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl"})[e.maxWidth]);return(s,r)=>(w(),h("dialog",{class:"z-50 m-0 min-h-full min-w-full overflow-y-auto bg-transparent backdrop:bg-transparent",ref_key:"dialog",ref:c},[a("div",N,[d(v,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:n(()=>[y(a("div",{class:"fixed inset-0 transform transition-all",onClick:m},V,512),[[f,o.show]])]),_:1}),d(v,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to-class":"opacity-100 translate-y-0 sm:scale-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100 translate-y-0 sm:scale-100","leave-to-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:n(()=>[y(a("div",{class:E(["mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto",_.value])},[i.value?l(s.$slots,"default",{key:0}):B("",!0)],2),[[f,o.show]])]),_:3})])],512))}};export{j as _,A as a};
