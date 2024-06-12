import{A as D}from"./AppLayout-y5k_g6R1.js";import{_ as L}from"./ShikiMonaco-C7rtziFf.js";import{_ as S}from"./InputComponent-CerpcOFp.js";import{k as B,r as p,B as V,E as M,o as r,d as u,q as _,G as T,a as l,t as b,z as j,F as k,g as C,e as $,n as F,D as N,c as U,w as P,b as f,f as O}from"./app-DmfK0vlX.js";import"./DropdownLink-CwHfPcdG.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const A=["placeholder","required","readonly"],E={key:0,class:"absolute top-8 right-4 text-gray-400 text-xl",style:{"pointer-events":"none"}},z=l("i",{class:"bi bi-chevron-down"},null,-1),G=[z],H=l("i",{class:"bi bi-x"},null,-1),I=[H],J={key:2,class:"absolute w-full bg-primary max-h-36 overflow-auto shadow-md"},R=["title","onMousedown"],K={__name:"InputSearch",props:{label:{type:String,default:null},placeholder:{type:String,default:null},required:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},choices:{type:Object,required:!0},modelValue:String},emits:["select"],setup(t,{expose:h,emit:g}){const e=t,v=B(()=>e.choices.filter(d=>d.name.toLowerCase().includes(o.value.toLowerCase()))),o=p(""),n=p(null),a=p(!1);function s(d){n.value=d,w("select",d)}function y(){a.value=!1,n.value?o.value=n.value.name:o.value=""}function q(){n.value=null,o.value="",w("select",{id:null,name:""})}const w=g,m=p(null),x=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);return V(()=>{var d;m.value.hasAttribute("autofocus")&&m.value.focus(),o.value=((d=e.choices.find(i=>i.id==e.modelValue))==null?void 0:d.name)??"",n.value=e.choices.find(i=>i.id==e.modelValue)??null}),M(()=>e.modelValue,d=>{var i;o.value=((i=e.choices.find(c=>c.id==d))==null?void 0:i.name)??""}),h({focus:()=>m.value.focus()}),(d,i)=>(r(),u("div",{class:F(["relative",[t.label?"pt-4":""]])},[_(l("label",{class:"absolute top-1.5 left-4 bg-secondary px-1.5 py-0",for:x},b(t.label),513),[[T,t.label&&!t.placeholder||t.label&&t.placeholder&&o.value.length>0]]),_(l("input",{id:x,ref_key:"input",ref:m,class:"border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm px-4 py-4 w-full","onUpdate:modelValue":i[0]||(i[0]=c=>o.value=c),placeholder:t.placeholder,type:"text",required:t.required,readonly:t.readonly,onFocus:i[1]||(i[1]=c=>a.value=!0),onFocusout:y,spellcheck:"false"},null,40,A),[[j,o.value]]),n.value==null?(r(),u("button",E,G)):(r(),u("button",{key:1,title:"Clear selection",class:"absolute top-8 right-4 text-gray-400 text-xl",onClick:q},I)),a.value?(r(),u("div",J,[l("ul",null,[(r(!0),u(k,null,C(v.value,c=>(r(),u("li",null,[l("button",{title:"Select "+c.name,class:"bg-primary hover py-2 px-4 w-full text-left",onMousedown:ae=>s(c)},b(c.name),41,R)]))),256))])])):$("",!0)],2))}},Q=l("h1",{class:"heading-1"},"Create New Snippit",-1),W={class:"flex gap-4 mt-8 w-100 max-w-full flex-col lg:flex-row"},X={class:"bg-secondary p-4 rounded-md shadow-md w-full lg:w-96 flex flex-col gap-2"},Y=l("p",{class:"mt-2"},"Snippit will be saved in:",-1),Z={class:"text-gray-500"},ee={class:"whitespace-nowrap"},te={key:0,class:"bi bi-chevron-right text-sm px-1.5"},le={class:"bg-secondary rounded-md shadow-md flex-grow editor-container overflow-hidden p-4"},ue={__name:"Editor",props:{snippit:{type:Object,required:!1,default:null},parentFolder:{type:Object,required:!0},path:{type:Object,required:!0}},setup(t){function h(n){e.code=n.code}const g=t,e=N({title:"",description:"",code:"",language:"css",folder_id:null}),v=p([{id:"javascript",name:"JavaScript"},{id:"php",name:"PHP"},{id:"html",name:"HTML"},{id:"css",name:"CSS"},{id:"scss",name:"SCSS"},{id:"python",name:"Python"},{id:"java",name:"Java"},{id:"csharp",name:"C#"},{id:"c",name:"C"},{id:"cpp",name:"C++"},{id:"ruby",name:"Ruby"},{id:"go",name:"Go"},{id:"swift",name:"Swift"},{id:"kotlin",name:"Kotlin"},{id:"rust",name:"Rust"},{id:"typescript",name:"TypeScript"},{id:"dart",name:"Dart"},{id:"shell",name:"Shell"},{id:"powershell",name:"PowerShell"},{id:"plaintext",name:"Plain Text"}]);function o(n){e.language=n.id}return V(()=>{e.folder_id=g.parentFolder.id}),(n,a)=>(r(),U(D,{title:"Create new Snippit"},{default:P(()=>[l("div",null,[Q,l("div",W,[l("div",X,[f(S,{modelValue:e.title,"onUpdate:modelValue":a[0]||(a[0]=s=>e.title=s),type:"text",placeholder:"Title",label:"Title",required:""},null,8,["modelValue"]),f(S,{modelValue:e.description,"onUpdate:modelValue":a[1]||(a[1]=s=>e.description=s),type:"textarea",placeholder:"Description",label:"Description",required:""},null,8,["modelValue"]),f(K,{modelValue:e.language,"onUpdate:modelValue":a[2]||(a[2]=s=>e.language=s),placeholder:"Language",label:"Language",choices:v.value,onSelect:o},null,8,["modelValue","choices"]),Y,l("p",Z,[(r(!0),u(k,null,C(t.path,(s,y)=>(r(),u("span",ee,[O(b(s.name),1),y<t.path.length-1?(r(),u("i",te)):$("",!0)]))),256))])]),l("div",le,[f(L,{snippit:e,"onUpdate:snippit":a[3]||(a[3]=s=>h(s))},null,8,["snippit"])])])])]),_:1}))}};export{ue as default};
