import{a as d}from"./Modal-CiH1Lr3Q.js";import{o as i,c as r,w as n,a as t,k as o}from"./app-BstrQY2K.js";const m={class:"px-6 py-4"},x={class:"text-lg font-medium text-gray-900 dark:text-gray-100"},f={class:"mt-4 text-sm text-gray-600 dark:text-gray-400"},h={class:"flex flex-row justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 text-end"},p={__name:"DialogModal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(e,{emit:a}){const l=a,c=()=>{l("close")};return(s,y)=>(i(),r(d,{show:e.show,"max-width":e.maxWidth,closeable:e.closeable,onClose:c},{default:n(()=>[t("div",m,[t("div",x,[o(s.$slots,"title")]),t("div",f,[o(s.$slots,"content")])]),t("div",h,[o(s.$slots,"footer")])]),_:3},8,["show","max-width","closeable"]))}};export{p as _};
