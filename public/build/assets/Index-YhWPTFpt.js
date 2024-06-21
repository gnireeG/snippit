import{r as F,p as K,o as a,d as f,a as e,c as S,w as n,f as y,j as C,u as r,x as m,m as N,e as w,F as D,g as O,n as j,t as I,b,q as T,y as W,O as Q,z,k as X,A as Y}from"./app-ByDUnFy1.js";import{A as Z}from"./AppLayout-t1Ce6zM5.js";import{a as q}from"./DropdownLink-5bqHn02v.js";import{_ as M}from"./DialogModal-BN0-hn4E.js";import{h as k,_ as ee}from"./SnippitCard-DlV4d-dZ.js";import{I as B}from"./InputComponent-BHZTJiyQ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Modal-C6V6A3lU.js";import"./CodeMirror-D1aTg_c_.js";const te={class:"flex flex-col"},oe=e("i",{class:"bi bi-house-door-fill"},null,-1),le=["onDrop"],se=["onClick"],ne=e("i",{class:"bi bi-caret-right-fill"},null,-1),ae=[ne],re=["title","onClick"],ie=e("button",{title:"Options",class:"px-1"},[e("i",{class:"bi bi-three-dots"})],-1),de={class:"rounded-lg p-2 flex"},ue=["onClick"],ce=e("i",{class:"bi bi-input-cursor-text text-lg"},null,-1),pe=[ce],me=["onClick"],fe=e("i",{class:"bi bi-trash2 text-lg"},null,-1),he=[fe],be={key:0,class:"pl-1"},_e={key:1,class:"pl-3"},ve=["onSubmit"],ge=e("button",{type:"submit",title:"Add folder"},[e("i",{class:"bi bi-folder-plus"})],-1),we=["onUpdate:modelValue"],xe=e("button",{type:"submit",title:"Add folder"},[e("i",{class:"bi bi-folder-plus"})],-1),Fe=e("h3",{class:"heading-3"},"Delete folder",-1),ye=e("p",null,"All contents, including subfolders and Snippits will be deleted permanently.",-1),$e=e("h3",{class:"heading-3"},"Rename folder",-1),ke={__name:"FolderSelector",props:{folders:{type:Object,required:!0},root:{type:Boolean,default:!1}},emits:["navigate"],setup($,{emit:s}){const _=F(!1),i=F(""),h=F(null);function c(t){h.value=t.id,i.value=t.name,_.value=!0}function g(){_.value=!1,i.value="",h.value=null}function x(){k.put(route("app.folders.rename",{folder_id:h.value,name:i.value})).then(t=>{t.status==200&&(m.commit("renameFolder",{folder:t.data.folder}),m.commit("addAlert",{type:"success",message:t.data.message}),g())})}const d=s,u=F(!1),V=F(null),A=F("");function E(t){V.value=t,u.value=!0}function R(){u.value=!1}function H(){V.value&&k.delete(route("app.folders.delete",{folder_id:V.value.id})).then(t=>{t.status==200&&(u.value=!1,m.commit("deleteFolder",t.data.deleted_folder),m.commit("addAlert",{type:"success",message:t.data.message}),m.state.currentFolder.id==t.data.deleted_folder.id&&Q.visit(route("app.folders.index")))})}function U(t,l){if(t)L(t,l);else{let v=m.state.path.id;L(v,l)}}function L(t,l){k.post(route("app.folders.create"),{parent_id:t,name:l}).then(v=>{m.commit("addNewFolder",{folder:v.data,parentID:t})})}function G(t){!t.subfolders&&!t.loading?(t.loading=!0,k.get(route("app.folders.loadSubfoldersById",{folderId:t.id})).then(l=>{m.commit("addLoadedSubfolders",{subfolders:l.data,parentID:t.id})})):t.showSubfolders=!t.showSubfolders}function J(t){k.get(route("app.folders.loadFolderWithContent",{folderId:t.id})).then(l=>{let v="/app/folder/";l.data.path.forEach((o,p)=>{p<l.data.path.length-1?v+=o.slug+"/":v+=o.slug}),window.history.pushState({},"",v),m.commit("updateCurrentFolder",l.data.folder),d("navigate")})}function P(t,l){t.stopPropagation();const v=t.dataTransfer.getData("event"),o=t.dataTransfer.getData("snippitId");console.log(v,o,l),k.post(route("app.snippit.move"),{snippit_id:o,folder_id:l}).then(p=>{p.status==200&&(m.commit("addAlert",{type:"success",message:p.data.message}),m.commit("removeSnippit",{snippitId:o,folderId:l}))})}return(t,l)=>{const v=K("FolderSelector",!0);return a(),f(D,null,[e("div",{class:j([$.root?"py-2":""])},[e("div",te,[$.root?(a(),S(r(N),{key:0,onDragover:l[0]||(l[0]=C(()=>{},["prevent"])),onDrop:l[1]||(l[1]=o=>P(o,r(m).state.path.id)),href:t.route("app.folders.index"),class:"inline"},{default:n(()=>[oe,y(" Home")]),_:1},8,["href"])):w("",!0),(a(!0),f(D,null,O($.folders,o=>(a(),f("div",{class:"pl-1 mt-0.5",onDragover:l[3]||(l[3]=C(()=>{},["prevent"])),onDrop:p=>P(p,o.id)},[e("div",{class:j(["flex items-center gap-2 text-sm whitespace-nowrap px-1 py-0.5 rounded-md group",[r(m).state.currentFolder.id==o.id?"bg-secondary":"bg-primary hover"]])},[e("button",{title:"Load subfolders",onClick:p=>G(o),class:j(["transform transition-transform py-0.5",[o.showSubfolders?"rotate-90":""]])},ae,10,se),e("button",{title:o.name,onClick:p=>J(o),class:"w-full text-left truncate"},I(o.name),9,re),b(q,{align:"right",width:"28",class:"md:opacity-0 md:group-hover:opacity-100"},{trigger:n(()=>[ie]),content:n(()=>[e("div",de,[e("button",{class:"btn btn-transparent w-full",title:"Rename folder",onClick:p=>c(o)},pe,8,ue),e("button",{class:"btn btn-transparent w-full",title:"Delete folder",onClick:p=>E(o)},he,8,me)])]),_:2},1024)],2),o.subfolders&&o.subfolders.length>0&&o.showSubfolders?(a(),f("div",be,[b(v,{folders:o.subfolders,onNavigate:l[2]||(l[2]=p=>d("navigate"))},null,8,["folders"])])):w("",!0),o.showSubfolders?(a(),f("div",_e,[e("form",{onSubmit:C(()=>{U(o.id,o.newSubfolderName),o.newSubfolderName=""},["prevent"]),class:"flex gap-1"},[ge,T(e("input",{type:"text",class:"bg-transparent border-0 p-0.5 flex-grow focus:ring-0 focus:outline-none min-w-11",placeholder:"Add new folder","onUpdate:modelValue":p=>o.newSubfolderName=p},null,8,we),[[W,o.newSubfolderName]])],40,ve)])):w("",!0)],40,le))),256)),$.root?(a(),f("form",{key:1,onSubmit:l[5]||(l[5]=C(()=>{U(!1,A.value),A.value=""},["prevent"])),class:"flex gap-1 pl-2"},[xe,T(e("input",{type:"text",class:"bg-transparent border-0 p-0.5 flex-grow focus:ring-0 focus:outline-none min-w-11",placeholder:"Add new folder","onUpdate:modelValue":l[4]||(l[4]=o=>A.value=o)},null,512),[[W,A.value]])],32)):w("",!0)])],2),b(M,{show:u.value,onClose:R,maxWidth:"xl"},{title:n(()=>[Fe]),content:n(()=>[e("p",null,[y("Are you sure you want to delete the folder "),e("b",null,I(V.value.name),1),y("?")]),ye]),footer:n(()=>[e("button",{class:"btn",onClick:R},"Cancel"),e("button",{class:"btn btn-danger",onClick:H},"Delete")]),_:1},8,["show"]),b(M,{show:_.value,onClose:g,maxWidth:"xl"},{title:n(()=>[$e]),content:n(()=>[e("form",{onSubmit:C(x,["prevent"])},[b(B,{modelValue:i.value,"onUpdate:modelValue":l[6]||(l[6]=o=>i.value=o),label:"New folder name"},null,8,["modelValue"])],32)]),footer:n(()=>[e("button",{class:"btn",onClick:g},"Cancel"),e("button",{class:"btn btn-success",onClick:x},"Rename")]),_:1},8,["show"])],64)}}},Se={key:0,class:"flex gap-2"},Ce=e("i",{class:"bi bi-chevron-right"},null,-1),Ne={key:0,class:"bi bi-chevron-right"},De={__name:"FolderBreadcrumbs",setup($){const s=z(),_=X(()=>{let i=s.getters.simplePath;return i?(i.shift(),i=i.map((h,c)=>{const g="/folder/"+i.slice(0,c+1).map(x=>x.slug).join("/");return{...h,pathSlug:g}}),i):[]});return(i,h)=>r(s).state.path?(a(),f("div",Se,[b(r(N),{href:i.route("app.folders.index")},{default:n(()=>[y("Home")]),_:1},8,["href"]),Ce,(a(!0),f(D,null,O(_.value,(c,g)=>(a(),f(D,null,[b(r(N),{href:c.pathSlug},{default:n(()=>[y(I(c.name),1)]),_:2},1032,["href"]),g!==_.value.length-1?(a(),f("i",Ne)):w("",!0)],64))),256))])):w("",!0)}},Ve={class:"flex gap-4 relative flex-col md:flex-row"},Ae={class:"min-w-64 flex-grow relative"},Ie={class:"top-0 sticky max-h-48 md:max-h-none overflow-y-auto md:overflow-y-visible pb-10 md:pb-0"},je={class:"w-full mt-8"},Me={class:"flex justify-between items-center"},Be={class:"text-sm mb-2"},Oe={key:0,class:"heading-1"},Re={key:1,class:"heading-1"},Ue=e("button",{class:"btn"},[y("New "),e("i",{class:"bi bi-plus-lg"})],-1),Le={class:"rounded-lg p-2"},Pe=e("i",{class:"bi bi-code-slash"},null,-1),Te=e("i",{class:"bi bi-folder"},null,-1),We={class:"flex justify-end"},ze={class:"autogrid gap-4 w-full mt-4"},qe=e("i",{class:"bi bi-plus-circle-dotted text-2xl"},null,-1),Ee=e("p",null,"Create new Snippit",-1),He=e("h3",{class:"heading-3"},"New Folder",-1),Ge=["disabled"],lt={__name:"Index",props:{folder:Object,path:Object,simplePath:Object},setup($){const s=z(),_=F(""),i=$;Y(()=>{s.commit("initFolderData",{currentFolder:i.folder,path:i.path})});const h=F(!1),c=F("");function g(){c.value.length<3||(k.post(route("app.folders.create"),{parent_id:s.state.currentFolder.id,name:c.value}).then(x=>{s.commit("addNewFolder",{folder:x.data,parentID:s.state.currentFolder.id})}),h.value=!1,c.value="")}return(x,d)=>(a(),S(Z,{title:"Folders"},{default:n(()=>[e("div",null,[e("div",Ve,[e("div",Ae,[e("div",Ie,[r(s).state.path?(a(),S(ke,{key:0,root:!0,folders:r(s).state.path.subfolders,onNavigate:d[0]||(d[0]=u=>_.value="")},null,8,["folders"])):w("",!0)])]),e("div",je,[e("div",Me,[e("div",null,[e("p",Be,[b(De)]),r(s).state.currentFolder?(a(),f("h1",Oe,I(r(s).state.currentFolder.name),1)):(a(),f("h1",Re,"Root"))]),b(q,{align:"right",width:"48"},{trigger:n(()=>[Ue]),content:n(()=>[e("div",Le,[r(s).state.currentFolder?(a(),S(r(N),{key:0,href:x.route("app.snippit.showCreate")+"?folder_id="+r(s).state.currentFolder.id,class:"btn btn-transparent w-full block text-center"},{default:n(()=>[Pe,y(" Snippit")]),_:1},8,["href"])):w("",!0),e("button",{class:"btn btn-transparent w-full",onClick:d[1]||(d[1]=u=>h.value=!0)},[Te,y(" Folder")])])]),_:1})]),e("div",We,[b(B,{modelValue:_.value,"onUpdate:modelValue":d[2]||(d[2]=u=>_.value=u),placeholder:"Search",type:"search",bgClass:"bg-primary",size:"sm"},null,8,["modelValue"])]),e("div",ze,[r(s).state.currentFolder?(a(!0),f(D,{key:0},O(r(s).state.currentFolder.snippits,u=>(a(),S(ee,{snippit:u,draggable:!0,deleteAble:!0,searchValue:_.value},null,8,["snippit","searchValue"]))),256)):w("",!0),r(s).state.currentFolder?(a(),S(r(N),{key:1,title:"New Snippit",href:x.route("app.snippit.showCreate")+"?folder_id="+r(s).state.currentFolder.id,class:"border-2 border-dashed border-gray-400 flex justify-center items-center flex-col p-4"},{default:n(()=>[qe,Ee]),_:1},8,["href"])):w("",!0)])])])]),b(M,{show:h.value,onClose:d[5]||(d[5]=u=>h.value=!1),maxWidth:"xl"},{title:n(()=>[He]),content:n(()=>[e("div",null,[e("form",{onSubmit:C(g,["prevent"])},[b(B,{modelValue:c.value,"onUpdate:modelValue":d[3]||(d[3]=u=>c.value=u),label:"Folder Name"},null,8,["modelValue"])],32)])]),footer:n(()=>[e("button",{onClick:d[4]||(d[4]=u=>h.value=!1),class:"textlink"},"Cancel"),e("button",{class:"btn",disabled:c.value.length<3,onClick:g},"Save",8,Ge)]),_:1},8,["show"])]),_:1}))}};export{lt as default};
