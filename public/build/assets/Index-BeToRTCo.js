import{x as T,y as b,r as k,p as W,o as a,d as u,a as e,c as S,w as c,f as x,u as m,m as V,e as w,F as $,g as D,n as N,t as C,b as g,j as A,q as I,z as j,O as q,A as B,B as M,k as z}from"./app-CmtrTn12.js";import{A as E}from"./AppLayout-msNqc7OA.js";import{a as O}from"./DropdownLink-COZVqnyX.js";import{_ as L}from"./DialogModal-BpDbJ2lH.js";import{_ as H}from"./SnippitCard-C95IMlBW.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Modal-DiVBbIAS.js";const F=T.create();F.interceptors.response.use(d=>d,d=>{var n,s;const o=((s=(n=d.response)==null?void 0:n.data)==null?void 0:s.message)||"An error occurred";return b.commit("addAlert",{type:"error",message:o}),Promise.reject(d)});const R={class:"flex flex-col"},G=e("i",{class:"bi bi-house-door-fill"},null,-1),J={class:"pl-1 mt-0.5"},K=["onClick"],Q=e("i",{class:"bi bi-caret-right-fill"},null,-1),X=[Q],Y=["title","onClick"],Z=e("button",{title:"Options"},[e("i",{class:"bi bi-three-dots"})],-1),ee={class:"rounded-lg p-2 flex"},te=e("button",{class:"btn btn-transparent w-full",title:"Rename folder"},[e("i",{class:"bi bi-input-cursor-text text-lg"})],-1),se=["onClick"],oe=e("i",{class:"bi bi-trash2 text-lg"},null,-1),le=[oe],ne={key:0,class:"pl-1"},ae={key:1,class:"pl-3"},re=["onSubmit"],de=e("button",{type:"submit",title:"Add folder"},[e("i",{class:"bi bi-folder-plus"})],-1),ie=["onUpdate:modelValue"],ue=e("button",{type:"submit",title:"Add folder"},[e("i",{class:"bi bi-folder-plus"})],-1),ce=e("h3",{class:"heading-3"},"Delete folder",-1),pe=e("p",null,"All contents, including subfolders and Snippits will be deleted permanently.",-1),fe={__name:"FolderSelector",props:{folders:{type:Object,required:!0},root:{type:Boolean,default:!1}},setup(d){const o=k(!1),n=k(null),s=k("");function i(t){n.value=t,o.value=!0}function f(){o.value=!1}function v(){n.value&&F.delete(route("app.folders.delete",{folder_id:n.value.id})).then(t=>{t.status==200&&(o.value=!1,b.commit("deleteFolder",t.data.deleted_folder),b.commit("addAlert",{type:"success",message:t.data.message}),b.state.currentFolder.id==t.data.deleted_folder.id&&q.visit(route("app.folders.index")))})}function p(t,r){if(t)h(t,r);else{let _=b.state.path.id;h(_,r)}}function h(t,r){F.post(route("app.folders.create"),{parent_id:t,name:r}).then(_=>{b.commit("addNewFolder",{folder:_.data,parentID:t})})}function P(t){!t.subfolders&&!t.loading?(t.loading=!0,F.get(route("app.folders.loadSubfoldersById",{folderId:t.id})).then(r=>{b.commit("addLoadedSubfolders",{subfolders:r.data,parentID:t.id})})):t.showSubfolders=!t.showSubfolders}function U(t){F.get(route("app.folders.loadFolderWithContent",{folderId:t.id})).then(r=>{let _="/folder/";r.data.path.forEach((l,y)=>{y<r.data.path.length-1?_+=l.slug+"/":_+=l.slug}),window.history.pushState({},"",_),b.commit("updateCurrentFolder",r.data.folder)})}return(t,r)=>{const _=W("FolderSelector",!0);return a(),u($,null,[e("div",{class:N([d.root?"py-2":""])},[e("div",R,[d.root?(a(),S(m(V),{key:0,href:t.route("app.folders.index"),class:"inline"},{default:c(()=>[G,x(" Home")]),_:1},8,["href"])):w("",!0),(a(!0),u($,null,D(d.folders,l=>(a(),u("div",J,[e("div",{class:N(["flex items-center gap-2 text-sm whitespace-nowrap px-1 py-0.5 rounded-md group",[m(b).state.currentFolder.id==l.id?"bg-secondary":"bg-primary hover"]])},[e("button",{title:"Load subfolders",onClick:y=>P(l),class:N(["transform transition-transform py-0.5",[l.showSubfolders?"rotate-90":""]])},X,10,K),e("button",{title:l.name,onClick:y=>U(l),class:"w-full text-left truncate"},C(l.name),9,Y),g(O,{align:"right",width:"28",class:"opacity-0 group-hover:opacity-100"},{trigger:c(()=>[Z]),content:c(()=>[e("div",ee,[te,e("button",{class:"btn btn-transparent w-full",title:"Delete folder",onClick:y=>i(l)},le,8,se)])]),_:2},1024)],2),l.subfolders&&l.subfolders.length>0&&l.showSubfolders?(a(),u("div",ne,[g(_,{folders:l.subfolders},null,8,["folders"])])):w("",!0),l.showSubfolders?(a(),u("div",ae,[e("form",{onSubmit:A(()=>{p(l.id,l.newSubfolderName),l.newSubfolderName=""},["prevent"]),class:"flex gap-1"},[de,I(e("input",{type:"text",class:"bg-transparent border-0 p-0.5 flex-grow focus:ring-0 focus:outline-none min-w-11",placeholder:"Add new folder","onUpdate:modelValue":y=>l.newSubfolderName=y},null,8,ie),[[j,l.newSubfolderName]])],40,re)])):w("",!0)]))),256)),d.root?(a(),u("form",{key:1,onSubmit:r[1]||(r[1]=A(()=>{p(!1,s.value),s.value=""},["prevent"])),class:"flex gap-1 pl-2"},[ue,I(e("input",{type:"text",class:"bg-transparent border-0 p-0.5 flex-grow focus:ring-0 focus:outline-none min-w-11",placeholder:"Add new folder","onUpdate:modelValue":r[0]||(r[0]=l=>s.value=l)},null,512),[[j,s.value]])],32)):w("",!0)])],2),g(L,{show:o.value,onClose:f,maxWidth:"xl"},{title:c(()=>[ce]),content:c(()=>[e("p",null,[x("Are you sure you want to delete the folder "),e("b",null,C(n.value.name),1),x("?")]),pe]),footer:c(()=>[e("button",{class:"btn",onClick:f},"Cancel"),e("button",{class:"btn btn-danger",onClick:v},"Delete")]),_:1},8,["show"])],64)}}},me=["value"],he={__name:"InputText",props:{modelValue:String},emits:["update:modelValue"],setup(d,{expose:o}){const n=k(null);return B(()=>{n.value.hasAttribute("autofocus")&&n.value.focus()}),o({focus:()=>n.value.focus()}),(s,i)=>(a(),u("input",{ref_key:"input",ref:n,class:"border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",value:d.modelValue,onInput:i[0]||(i[0]=f=>s.$emit("update:modelValue",f.target.value))},null,40,me))}},_e={key:0,class:"flex gap-2"},be=e("i",{class:"bi bi-chevron-right"},null,-1),ge={key:0,class:"bi bi-chevron-right"},ve={__name:"FolderBreadcrumbs",setup(d){const o=M(),n=z(()=>{let s=o.getters.simplePath;return s.shift(),s=s.map((i,f)=>{const v="/folder/"+s.slice(0,f+1).map(p=>p.slug).join("/");return{...i,pathSlug:v}}),s});return(s,i)=>m(o).state.path?(a(),u("div",_e,[g(m(V),{href:s.route("app.folders.index")},{default:c(()=>[x("Home")]),_:1},8,["href"]),be,(a(!0),u($,null,D(n.value,(f,v)=>(a(),u($,null,[g(m(V),{href:f.pathSlug},{default:c(()=>[x(C(f.name),1)]),_:2},1032,["href"]),v!==n.value.length-1?(a(),u("i",ge)):w("",!0)],64))),256))])):w("",!0)}},we={class:"p-8"},xe={class:"flex gap-4 relative mt-8"},ye={class:"min-w-64 flex-grow"},Fe={class:"top-0 sticky"},ke={class:"w-full"},$e={class:"flex justify-between"},Se={class:"text-sm mb-2"},Ce={key:0,class:"heading-1"},Ne={key:1,class:"heading-1"},Ve=e("button",{class:"btn"},[x("New "),e("i",{class:"bi bi-plus-lg"})],-1),Ae={class:"rounded-lg p-2"},De=e("button",{class:"btn btn-transparent w-full"},[e("i",{class:"bi bi-code-slash"}),x(" Snippit")],-1),Ie=e("i",{class:"bi bi-folder"},null,-1),je={class:"autogrid gap-4 w-full mt-4"},Be=e("h3",{class:"heading-3"},"New Folder",-1),Me=["disabled"],ze={__name:"Index",props:{folder:Object,path:Object,simplePath:Object},setup(d){const o=M(),n=d;B(()=>{o.commit("initFolderData",{currentFolder:n.folder,path:n.path})});const s=k(!1),i=k("");function f(){i.value.length<3||(F.post(route("app.folders.create"),{parent_id:o.state.currentFolder.id,name:i.value}).then(v=>{o.commit("addNewFolder",{folder:v.data,parentID:o.state.currentFolder.id})}),s.value=!1,i.value="")}return(v,p)=>(a(),S(E,{title:"Folders"},{default:c(()=>[e("div",we,[e("div",xe,[e("div",ye,[e("div",Fe,[m(o).state.path?(a(),S(fe,{key:0,root:!0,folders:m(o).state.path.subfolders},null,8,["folders"])):w("",!0)])]),e("div",ke,[e("div",$e,[e("div",null,[e("p",Se,[g(ve)]),m(o).state.currentFolder?(a(),u("h1",Ce,C(m(o).state.currentFolder.name),1)):(a(),u("h1",Ne,"Root"))]),g(O,{align:"right",width:"48"},{trigger:c(()=>[Ve]),content:c(()=>[e("div",Ae,[De,e("button",{class:"btn btn-transparent w-full",onClick:p[0]||(p[0]=h=>s.value=!0)},[Ie,x(" Folder")])])]),_:1})]),e("div",je,[m(o).state.currentFolder?(a(!0),u($,{key:0},D(m(o).state.currentFolder.snippits,h=>(a(),S(H,{snippit:h},null,8,["snippit"]))),256)):w("",!0)])])])]),g(L,{show:s.value,onClose:p[3]||(p[3]=h=>s.value=!1),maxWidth:"xl"},{title:c(()=>[Be]),content:c(()=>[e("div",null,[e("form",{onSubmit:A(f,["prevent"])},[g(he,{modelValue:i.value,"onUpdate:modelValue":p[1]||(p[1]=h=>i.value=h),label:"Folder Name"},null,8,["modelValue"])],32)])]),footer:c(()=>[e("button",{onClick:p[2]||(p[2]=h=>s.value=!1),class:"textlink"},"Cancel"),e("button",{class:"btn",disabled:i.value.length<3,onClick:f},"Save",8,Me)]),_:1},8,["show"])]),_:1}))}};export{ze as default};
