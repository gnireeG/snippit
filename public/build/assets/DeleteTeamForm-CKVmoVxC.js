import{r as p,T as u,c as y,w as e,o as T,f as t,a as i,b as o,n as w,u as r}from"./app-DQl85FQM.js";import{_ as g}from"./ActionSection-BtynKg-u.js";import{_ as x}from"./ConfirmationModal-B1e1CJ9i.js";import{_ as n}from"./DangerButton-DU4FFM5I.js";import{_ as h}from"./SecondaryButton-CFFTw-0X.js";import"./SectionTitle-Ca35mGqw.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Modal-C6XTP4ZV.js";const v=i("div",{class:"max-w-xl text-sm text-gray-600 dark:text-gray-400"}," Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team, please download any data or information regarding this team that you wish to retain. ",-1),C={class:"mt-5"},z={__name:"DeleteTeamForm",props:{team:Object},setup(m){const d=m,a=p(!1),l=u({}),c=()=>{a.value=!0},f=()=>{l.delete(route("teams.destroy",d.team),{errorBag:"deleteTeam"})};return(D,s)=>(T(),y(g,null,{title:e(()=>[t(" Delete Team ")]),description:e(()=>[t(" Permanently delete this team. ")]),content:e(()=>[v,i("div",C,[o(n,{onClick:c},{default:e(()=>[t(" Delete Team ")]),_:1})]),o(x,{show:a.value,onClose:s[1]||(s[1]=_=>a.value=!1)},{title:e(()=>[t(" Delete Team ")]),content:e(()=>[t(" Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted. ")]),footer:e(()=>[o(h,{onClick:s[0]||(s[0]=_=>a.value=!1)},{default:e(()=>[t(" Cancel ")]),_:1}),o(n,{class:w(["ms-3",{"opacity-25":r(l).processing}]),disabled:r(l).processing,onClick:f},{default:e(()=>[t(" Delete Team ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])]),_:1}))}};export{z as default};
