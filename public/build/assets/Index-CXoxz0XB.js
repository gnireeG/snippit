import{A as x}from"./AppLayout-CBqugZIy.js";import{p as w,o as r,d as i,a as o,F as g,g as F,n as h,t as c,b as v,e as $,r as S,c as _,w as k,f as b}from"./app-Cli3YKDk.js";import{_ as C}from"./SnippitCard-BtdyYFs0.js";import"./DropdownLink-DCu1yEin.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./DialogModal-Bt2xCnrH.js";import"./Modal-CEdaP_Oo.js";const L={class:"flex flex-col"},y=["onClick"],O=o("i",{class:"bi bi-caret-right-fill"},null,-1),B=[O],j=["onClick"],I={key:0,class:"ml-2"},N={__name:"FolderSelector",props:{folders:{type:Object,required:!0},openedFolder:{type:Object,default:{slug:""}}},emits:["onFolderLoad"],setup(s,{emit:m}){const l=m;function p(e){!e.subfolders&&!e.loading?(e.loading=!0,axios.get(route("app.folders.loadSubfoldersById",{folderId:e.id})).then(a=>{e.subfolders=a.data,e.showSubfolders=!0,e.loading=!1})):e.showSubfolders=!e.showSubfolders}function n(e){axios.get(route("app.folders.loadFolderWithContent",{folderId:e.id})).then(a=>{let u="/folder/";a.data.path.forEach(t=>{u+=t.slug+"/"}),l("onFolderLoad",a.data.folder),window.history.pushState({},"",u)})}function d(e){l("onFolderLoad",e)}return(e,a)=>{const u=w("FolderSelector",!0);return r(),i("div",null,[o("div",L,[(r(!0),i(g,null,F(s.folders,t=>(r(),i("div",null,[o("div",{class:h(["flex gap-2 text-sm whitespace-nowrap px-1",[s.openedFolder.slug==t.slug?"bg-red-500":""]])},[o("button",{onClick:f=>p(t),class:h(["transform transition-transform",[t.showSubfolders?"rotate-90":""]])},B,10,y),o("button",{onClick:f=>n(t),class:"w-full text-left"},c(t.name),9,j)],2),t.subfolders&&t.subfolders.length>0&&t.showSubfolders?(r(),i("div",I,[v(u,{folders:t.subfolders,openedFolder:s.openedFolder,onOnFolderLoad:a[0]||(a[0]=f=>d(f))},null,8,["folders","openedFolder"])])):$("",!0)]))),256))])])}}},V={class:"p-8"},A={class:"heading-1"},E={class:"text-lg mt-2"},q={class:"italic"},z={class:"flex gap-4 relative mt-8"},D={class:"sticky top-0"},H={class:"autogrid gap-4 w-full"},P={__name:"Index",props:{folder:Object,path:Object},setup(s){const l=S(s.folder);function p(n){console.log(n),l.value=n}return(n,d)=>(r(),_(x,{title:"Folders"},{default:k(()=>[o("div",V,[o("h1",A,"Hello "+c(n.$page.props.auth.user.name),1),o("p",E,[b("You are currently in the "),o("b",q,c(n.$page.props.auth.user.current_team.name),1),b(" team.")]),o("p",null,c(l.value.name),1),o("button",{onClick:d[0]||(d[0]=e=>s.folder.name="hallo")},"test"),o("div",z,[o("div",D,[v(N,{folders:s.path.subfolders,onOnFolderLoad:d[1]||(d[1]=e=>p(e)),openedFolder:l.value},null,8,["folders","openedFolder"])]),o("div",H,[(r(!0),i(g,null,F(l.value.snippits,e=>(r(),_(C,{snippit:e},null,8,["snippit"]))),256))])])])]),_:1}))}};export{P as default};
