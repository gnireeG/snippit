import{A as m}from"./AppLayout-0ZbsLI_W.js";import{Q as d,r as i,k as p,c as _,w as h,o as n,a as e,f,t,d as r,g as b,F as g}from"./app-p96gd7mc.js";import"./DropdownLink-CaAEX7mT.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const v={class:"p-8"},x=e("h1",{class:"heading-1"},"Teams",-1),T={class:"text-lg mt-2"},k={class:"italic"},w=e("thead",null,[e("tr",null,[e("th",null,"Name"),e("th",null,"Owner"),e("th",null,"Members")])],-1),A={__name:"Index",props:{teams:Object},setup(o){const u=o,c=d().props.auth.user.current_team,s=i([]);return p(()=>{s.value=Object.values(u.teams).filter(a=>a.id!==c.id)}),(a,B)=>(n(),_(m,{title:"Teams"},{default:h(()=>[e("div",v,[x,e("p",T,[f("Current team: "),e("b",k,t(a.$page.props.auth.user.current_team.name),1)]),e("table",null,[w,e("tbody",null,[(n(!0),r(g,null,b(s.value,l=>(n(),r("tr",null,[e("td",null,t(l.name),1),e("td",null,t(l.owner.name),1),e("td",null,t(l.users_count),1)]))),256))])]),e("p",null,t(s.value),1)])]),_:1}))}};export{A as default};
