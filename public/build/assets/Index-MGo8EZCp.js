import{A as d}from"./AppLayout-8kXNQ4pq.js";import{Q as i,r as _,A as h,c as f,w as b,o as a,a as t,f as g,t as e,d as r,g as o,F as u}from"./app-B9mYPfgG.js";import"./DropdownLink-Bydu3QB-.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const v={class:"p-8"},x=t("h1",{class:"heading-1"},"Teams",-1),T={class:"text-lg mt-2"},w={class:"italic"},B=t("thead",null,[t("tr",null,[t("th",null,"Name"),t("th",null,"Owner"),t("th",null,"Members")])],-1),j={__name:"Index",props:{teams:Object},setup(c){const m=c,p=i().props.auth.user.current_team,l=_([]);return h(()=>{l.value=Object.values(m.teams).filter(n=>n.id!==p.id)}),(n,k)=>(a(),f(d,{title:"Teams"},{default:b(()=>[t("div",v,[x,t("p",T,[g("Current team: "),t("b",w,e(n.$page.props.auth.user.current_team.name),1)]),t("table",null,[B,t("tbody",null,[(a(!0),r(u,null,o(l.value,s=>(a(),r("tr",null,[t("td",null,e(s.name),1),t("td",null,e(s.owner.name),1),t("td",null,e(s.users_count),1)]))),256))])]),t("p",null,e(l.value),1),(a(),r(u,null,o(1e3,s=>t("p",null,"test "+e(s),1)),64))])]),_:1}))}};export{j as default};
