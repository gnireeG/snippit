import{r as v,o as a,c as b,w as c,d,a as e,f as u,t as w,b as r,e as h,j,O as $,F as x,g as A,B as M,I as D,n as g,R as E,S as O,A as T,h as z,l as I,u as f,m as y,i as H,E as V,Z as F,Q as K}from"./app-xjV7HbQ7.js";import{_,a as N}from"./DropdownLink-B9wMdZmR.js";import{_ as C}from"./_plugin-vue_export-helper-DlAUqK2U.js";const Q={key:0,class:"flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"},R=["src","alt"],U={key:1,class:"inline-flex rounded-md"},Y={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"},Z=e("svg",{class:"ms-2 -me-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 8.25l-7.5 7.5-7.5-7.5"})],-1),G=e("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Account ",-1),J=e("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),P={__name:"ProfileDropdown",setup(o){v(!1);const l=()=>{$.post(route("logout"))};return(t,n)=>(a(),b(N,{align:"right",width:"48"},{trigger:c(()=>[t.$page.props.jetstream.managesProfilePhotos?(a(),d("button",Q,[e("img",{class:"h-8 w-8 rounded-full object-cover",src:t.$page.props.auth.user.profile_photo_url,alt:t.$page.props.auth.user.name},null,8,R)])):(a(),d("span",U,[e("button",Y,[u(w(t.$page.props.auth.user.name)+" ",1),Z])]))]),content:c(()=>[G,r(_,{href:t.route("profile.show")},{default:c(()=>[u(" Profile ")]),_:1},8,["href"]),t.$page.props.jetstream.hasApiFeatures?(a(),b(_,{key:0,href:t.route("api-tokens.index")},{default:c(()=>[u(" API Tokens ")]),_:1},8,["href"])):h("",!0),J,e("form",{onSubmit:j(l,["prevent"])},[r(_,{as:"button"},{default:c(()=>[u(" Log Out ")]),_:1})],32)]),_:1}))}},W=e("button",{title:"Open Notifications",class:"btn btn-icon btn-transparent btn-lg"},[e("i",{class:"bi bi-bell"})],-1),X={class:"p-4"},ee={key:0,class:"text-sm text-center"},q={__name:"NotificationDropdown",setup(o){const l=v([]);return(t,n)=>(a(),b(N,{align:"right",width:"48"},{trigger:c(()=>[W]),content:c(()=>[e("div",X,[l.value.length===0?(a(),d("p",ee,"No new Notifications.")):h("",!0)])]),_:1}))}},te={class:"inline-flex rounded-md"},se={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"},oe=e("svg",{class:"ms-2 -me-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"})],-1),ae={class:"w-60"},ne=e("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Team ",-1),re=e("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),le=e("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Switch Teams ",-1),ie=["onSubmit"],ce={class:"flex items-center"},de={key:0,class:"me-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},ue=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),pe=[ue],ge={__name:"TeamDropdown",setup(o){const l=t=>{$.put(route("current-team.update"),{team_id:t.id},{preserveState:!1})};return(t,n)=>t.$page.props.jetstream.hasTeamFeatures?(a(),b(N,{key:0,align:"right",width:"60"},{trigger:c(()=>[e("span",te,[e("button",se,[u(w(t.$page.props.auth.user.current_team.name)+" ",1),oe])])]),content:c(()=>[e("div",ae,[ne,r(_,{href:t.route("teams.show",t.$page.props.auth.user.current_team)},{default:c(()=>[u(" Team Settings ")]),_:1},8,["href"]),t.$page.props.jetstream.canCreateTeams?(a(),b(_,{key:0,href:t.route("teams.create")},{default:c(()=>[u(" Create New Team ")]),_:1},8,["href"])):h("",!0),t.$page.props.auth.user.all_teams.length>1?(a(),d(x,{key:1},[re,le,(a(!0),d(x,null,A(t.$page.props.auth.user.all_teams,s=>(a(),d("form",{key:s.id,onSubmit:j(p=>l(s),["prevent"])},[r(_,{as:"button"},{default:c(()=>[e("div",ce,[s.id==t.$page.props.auth.user.current_team_id?(a(),d("svg",de,pe)):h("",!0),e("div",null,w(s.name),1)])]),_:2},1024)],40,ie))),128))],64)):h("",!0)])]),_:1})):h("",!0)}},he=o=>(E("data-v-fdd94bbc"),o=o(),O(),o),me=he(()=>e("i",{class:"bi bi-list text-3xl"},null,-1)),fe=[me],_e={class:"flex gap-2 items-center"},ve={__name:"MobileHeader",props:{navopen:{type:Boolean,default:!1}},emits:["toggleMenu"],setup(o,{emit:l}){let t=0;const n=v(!0),s=()=>{const i=window.pageYOffset||document.documentElement.scrollTop;i<t||i<=60?n.value=!0:n.value=!1,t=i<=0?0:i};M(()=>{window.addEventListener("scroll",s)}),D(()=>{window.removeEventListener("scroll",s)}),$.on("finish",()=>{t=99999,n.value=!0});const p=l;return(i,m)=>(a(),d("div",{class:g(["fixed top-0 w-screen p-4 bg-secondary flex justify-between items-center z-30 transition-all duration-300 drop-shadow-md",{"translate-y-0":n.value,"-translate-y-full":!n.value}])},[e("button",{onClick:m[0]||(m[0]=k=>p("toggleMenu"))},fe),e("div",_e,[r(q),r(P)])],2))}},be=C(ve,[["__scopeId","data-v-fdd94bbc"]]),xe=z('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-741a1c11><path pathLength="1" class="moon-icon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" data-v-741a1c11></path><circle pathLength="1" class="sun-icon" cx="12" cy="12" r="5" data-v-741a1c11></circle><line pathLength="1" class="sun-icon" x1="12" y1="1" x2="12" y2="3" data-v-741a1c11></line><line pathLength="1" class="sun-icon" x1="12" y1="21" x2="12" y2="23" data-v-741a1c11></line><line pathLength="1" class="sun-icon" x1="4.22" y1="4.22" x2="5.64" y2="5.64" data-v-741a1c11></line><line pathLength="1" class="sun-icon" x1="18.36" y1="18.36" x2="19.78" y2="19.78" data-v-741a1c11></line><line pathLength="1" class="sun-icon" x1="1" y1="12" x2="3" y2="12" data-v-741a1c11></line><line pathLength="1" class="sun-icon" x1="21" y1="12" x2="23" y2="12" data-v-741a1c11></line><line pathLength="1" class="sun-icon" x1="4.22" y1="19.78" x2="5.64" y2="18.36" data-v-741a1c11></line><line pathLength="1" class="sun-icon" x1="18.36" y1="5.64" x2="19.78" y2="4.22" data-v-741a1c11></line></svg>',1),ye=[xe],L="theme-preference",we={__name:"Darkmodetoggle",props:{expand:{type:Boolean,required:!1,default:!1}},setup(o){const l=T();function t(){i.value=i.value==="light"?"dark":"light",s()}function n(){return localStorage.getItem(L)?localStorage.getItem(L)==="light"?"light":"dark":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function s(){localStorage.setItem(L,i.value),p()}function p(){var m;i.value==="dark"?document.body.classList.add("dark"):document.body.classList.remove("dark"),l.commit("setTheme",i.value),(m=document.querySelector("#theme-toggle"))==null||m.setAttribute("aria-label",i.value)}const i=v("light");return p(),M(()=>{i.value=n(),p()}),(m,k)=>(a(),d("div",{class:g([[i.value=="light"?"":"dark"],"dark-mode-toggle flex gap-2"])},[e("button",{title:"Toggle Theme",onClick:k[0]||(k[0]=Ge=>t()),class:"px-1.5"},ye)],2))}},$e=C(we,[["__scopeId","data-v-741a1c11"]]),S={__name:"Navitem",props:{routeName:{type:String,required:!0},title:{type:String,required:!1},icon:{type:String,required:!0},expand:{type:Boolean,required:!0}},setup(o){return(l,t)=>(a(),b(f(y),{href:l.route(o.routeName),title:o.title,class:g(["relative flex gap-2 items-center px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors",[l.route().current(o.routeName)?"bg-gray-50 dark:bg-slate-800 before:absolute before:h-full before:w-1 before:bg-slate-800 dark:before:bg-gray-200 before:left-0 before:top-0":""]])},{default:c(()=>[o.icon?(a(),d("i",{key:0,class:g(["text-xl bi px-2",o.icon])},null,2)):h("",!0),e("p",{class:g([o.expand?"opacity-100":"opacity-0","transition-opacity duration-500"])},[I(l.$slots,"default")],2)]),_:3},8,["href","title","class"]))}},ke={class:"hidden md:flex flex-col justify-between top-0 sticky h-screen bg-secondary overflow-hidden"},Le={class:"relative"},Se=e("i",{class:"bi bi-list text-3xl"},null,-1),Me=[Se],Te={class:"flex flex-col gap-2 mt-20"},Ne={class:"flex flex-col"},Ce={class:"p-4"},Be={key:0,class:"fixed w-screen h-screen z-20 bg-secondary"},je={class:"flex flex-col pt-20"},Ae=e("i",{class:"bi bi-house"},null,-1),Ie=e("i",{class:"bi bi-code-slash"},null,-1),Pe=e("i",{class:"bi bi-people"},null,-1),B={__name:"Navbar",props:{navopen:{type:Boolean,required:!0}},emits:["toggleMenu"],setup(o,{emit:l}){const t=l;function n(){t("toggleMenu")}return(s,p)=>(a(),d(x,null,[e("nav",ke,[e("div",Le,[e("div",{class:"absolute top-4 right-[20px]"},[e("button",{title:"Toggle Navigation",onClick:n},Me)]),e("div",Te,[r(S,{expand:o.navopen,routeName:"app",icon:"bi-house"},{default:c(()=>[u("Home")]),_:1},8,["expand"]),r(S,{expand:o.navopen,routeName:"app.folders.index",icon:"bi-code-slash"},{default:c(()=>[u("Snippits")]),_:1},8,["expand"]),r(S,{expand:o.navopen,routeName:"app.teams",icon:"bi-people"},{default:c(()=>[u("Teams")]),_:1},8,["expand"])])]),e("div",Ne,[e("div",Ce,[r($e,{expand:o.navopen},null,8,["expand"])])])]),o.navopen?(a(),d("nav",Be,[e("div",je,[r(f(y),{class:g(["text-xl p-2 hover:bg-primary",{"bg-primary":s.route().current("app")}]),href:s.route("app")},{default:c(()=>[Ae,u(" Home")]),_:1},8,["class","href"]),r(f(y),{class:g(["text-xl p-2 hover:bg-primary",{"bg-primary":s.route().current("app.folders.index")}]),href:s.route("app.folders.index")},{default:c(()=>[Ie,u(" Snippits")]),_:1},8,["class","href"]),r(f(y),{class:g(["text-xl p-2 hover:bg-primary",{"bg-primary":s.route().current("app.teams")}]),href:s.route("app.teams")},{default:c(()=>[Pe,u(" Teams")]),_:1},8,["class","href"])])])):h("",!0)],64))}},qe={class:"fixed bottom-4 right-4 flex flex-col gap-2"},De={class:"flex"},Ee={class:"p-3 bg-primary-inverted w-56 text-sm flex items-center"},Oe={class:"text-gray-600"},ze={class:"p-3 rounded-r-lg bg-primary-inverted flex items-center"},He=["onClick"],Ve=e("i",{class:"bi bi-x text-xl text-slate-900"},null,-1),Fe=[Ve],Ke={__name:"Alert",setup(o){const l=T();function t(s){switch(s){case"success":return"bg-green-500";case"error":return"bg-red-500";case"warning":return"bg-yellow-500";case"info":return"bg-blue-500"}}function n(s){switch(s){case"success":return"bi-check-circle-fill";case"error":return"bi-x-circle-fill";case"warning":return"bi-exclamation-circle-fill";case"info":return"bi-info-circle-fill"}}return(s,p)=>(a(),d("div",qe,[(a(!0),d(x,null,A(f(l).state.alerts,i=>(a(),d("div",De,[e("div",{class:g(["p-3 rounded-l-lg flex items-center",t(i.type)])},[e("i",{class:g(["bi text-xl text-slate-900",n(i.type)])},null,2)],2),e("div",Ee,[e("span",Oe,w(i.message),1)]),e("div",ze,[e("button",{title:"Dismiss alert",onClick:m=>f(l).commit("removeAlert",i)},Fe,8,He)])]))),256))]))}},Qe={class:"absolute top-4 right-4 gap-2 items-center hidden md:flex"},Re={class:"relative hidden md:block"},Ue={class:"md:hidden"},Ye={class:"pt-20 md:pt-12 px-2 md:px-4 lg:px-8"},Ze={__name:"AppLayout",props:{title:String},setup(o){const l=T();v(!1);const t=v(!1);return H(()=>{const{flash:n}=K().props;n.alert&&l.commit("addAlert",n.alert)}),V(t,n=>{n?(document.body.classList.add("overflow-hidden"),document.body.classList.add("md:overflow-auto")):(document.body.classList.remove("overflow-hidden"),document.body.classList.remove("md:overflow-auto"))}),M(()=>{document.body.classList.remove("overflow-hidden"),document.body.classList.remove("md:overflow-auto")}),$.on("finish",()=>{document.body.classList.remove("overflow-hidden"),document.body.classList.remove("md:overflow-auto")}),(n,s)=>(a(),d(x,null,[r(f(F),{title:o.title},null,8,["title"]),e("div",{class:g(["main-grid relative",[t.value?"open":""]])},[e("div",Qe,[r(ge),r(q),r(P)]),e("header",Re,[r(B,{navopen:t.value,onToggleMenu:s[0]||(s[0]=p=>t.value=!t.value)},null,8,["navopen"])]),e("header",Ue,[r(be,{navopen:t.value,onToggleMenu:s[1]||(s[1]=p=>t.value=!t.value)},null,8,["navopen"]),r(B,{navopen:t.value,onToggleMenu:s[2]||(s[2]=p=>t.value=!t.value)},null,8,["navopen"])]),e("main",Ye,[I(n.$slots,"default",{},void 0,!0)]),r(Ke)],2)],64))}},et=C(Ze,[["__scopeId","data-v-a33cc28b"]]);export{et as A};
