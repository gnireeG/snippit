import{A as y,k as f,r as m,o as i,d as n,a as t,t as o,n as k,e as _,b as u,w as c,u as C,m as w,f as j,F as B}from"./app-DmfK0vlX.js";import{_ as N}from"./DialogModal-Cx-cxqWD.js";import{_ as T}from"./ShikiMonaco-C7rtziFf.js";const V={class:"bg-secondary rounded-lg px-4 py-3 flex flex-col jusitfy-between shadow-lg"},$={class:"h-full"},S={class:"flex justify-between"},A={class:"heading-3"},E=["title"],F={class:"mt-2"},P={class:"text-sm"},U={class:"flex justify-between items-center mt-4 border-t dark:border-slate-600 border-slate-400 pt-4"},z={class:"flex gap-2"},D=t("i",{class:"bi bi-eye"},null,-1),L=[D],M={key:0,class:"bi bi-copy"},O={key:1,class:"bi bi-clipboard-check"},W={class:"heading-3"},q={class:"bg-slate-50 text-gray-800 h-[75vh]"},G={key:0,class:"bi bi-copy"},H={key:1,class:"bi bi-clipboard-check"},R={__name:"SnippitCard",props:{snippit:Object},setup(e){y();const d=e;function I(p){}const b=f(()=>!!navigator.clipboard),h=()=>{navigator.clipboard.writeText(d.snippit.code),l.value=!0,setTimeout(()=>{l.value=!1},2e3)},r=m(!1);function g(){r.value=!0}const v=f(()=>{const p=[{original:"css",replacement:"css3"},{original:"html",replacement:"html5"},{original:"c++",replacement:"cplusplus"}];let s=d.snippit.language;const a=p.find(x=>x.original===d.snippit.language);return a&&(s=a.replacement),`devicon-${s}-plain colored`}),l=m(!1);return(p,s)=>(i(),n(B,null,[t("div",V,[t("div",$,[t("div",S,[t("h3",A,o(e.snippit.title),1),t("i",{class:k([v.value,"text-2xl"]),title:e.snippit.language},null,10,E)]),t("p",F,o(e.snippit.description),1),t("p",P,"Lang: "+o(e.snippit.language)+" id: "+o(e.snippit.id)+" team_id: "+o(e.snippit.team_id)+" user_id: "+o(e.snippit.user_id),1)]),t("div",U,[t("div",z,[t("button",{class:"btn btn-icon",title:"Preview Code",onClick:g},L),b.value?(i(),n("button",{key:0,class:"btn btn-icon",title:"Copy Code to clipboard",onClick:h},[l.value?(i(),n("i",O)):(i(),n("i",M))])):_("",!0)])])]),u(N,{show:r.value,onClose:s[1]||(s[1]=a=>r.value=!1),maxWidth:"4xl"},{title:c(()=>[t("h3",W,o(e.snippit.title),1)]),content:c(()=>[t("div",q,[u(T,{snippit:e.snippit,"onUpdate:snippit":s[0]||(s[0]=a=>void 0)},null,8,["snippit"])])]),footer:c(()=>[u(C(w),{class:"textlink",href:"#"},{default:c(()=>[j("Edit snippit")]),_:1}),b.value?(i(),n("button",{key:0,class:"btn btn-icon",title:"Copy Code to clipboard",onClick:h},[l.value?(i(),n("i",H)):(i(),n("i",G))])):_("",!0)]),_:1},8,["show"])],64))}};export{R as _};
