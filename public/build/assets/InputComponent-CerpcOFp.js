import{r as u,B as y,o as d,d as o,q as f,G as g,a as m,t as b,e as s,n as p}from"./app-DmfK0vlX.js";const h=["value","placeholder","type","required","readonly"],k=["placeholder","type","rows","required","readonly"],x={__name:"InputComponent",props:{modelValue:String,label:{type:String,default:null},type:{type:String,default:"text",validator:e=>["text","password","email","number","textarea"].includes(e)},placeholder:{type:String,default:null},required:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(e,{expose:i}){const a=u(null),l=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);y(()=>{a.value.hasAttribute("autofocus")&&a.value.focus()}),i({focus:()=>a.value.focus()});const c=u(3);return(n,t)=>(d(),o("div",{class:p(["relative",[e.label?"pt-4":""]])},[f(m("label",{class:"absolute top-1.5 left-4 bg-secondary px-1.5 py-0",for:l},b(e.label),513),[[g,e.label&&!e.placeholder||e.label&&e.placeholder&&e.modelValue.length>0]]),e.type!=="textarea"?(d(),o("input",{key:0,id:l,ref_key:"input",ref:a,class:"border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm px-4 py-4 w-full",value:e.modelValue,onInput:t[0]||(t[0]=r=>n.$emit("update:modelValue",r.target.value)),placeholder:e.placeholder,type:e.type,required:e.required,readonly:e.readonly,spellcheck:"false"},null,40,h)):s("",!0),e.type==="textarea"?(d(),o("textarea",{key:1,id:l,ref_key:"input",ref:a,class:"border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm px-4 py-4 w-full",onInput:t[1]||(t[1]=r=>n.$emit("update:modelValue",r.target.value)),placeholder:e.placeholder,type:e.type,rows:c.value,required:e.required,readonly:e.readonly,spellcheck:"false"},null,40,k)):s("",!0)],2))}};export{x as _};
