import{A as p}from"./AppLayout-0ZbsLI_W.js";import c from"./DeleteUserForm-BvYY-691.js";import l from"./LogoutOtherBrowserSessionsForm-DUWjqOuu.js";import{S as s}from"./SectionBorder-BawQrThO.js";import u from"./TwoFactorAuthenticationForm-eA1QncuX.js";import f from"./UpdatePasswordForm-CdaBZLM-.js";import d from"./UpdateProfileInformationForm-D2j2y6rm.js";import{c as _,w as n,o as e,a as i,d as r,b as t,e as a,F as h}from"./app-p96gd7mc.js";import"./DropdownLink-CaAEX7mT.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ActionSection-CzsfLvBJ.js";import"./SectionTitle-DQ0cY49t.js";import"./DangerButton-CCbxlM6G.js";import"./DialogModal-DDCNggvN.js";import"./Modal-DuX1UI6c.js";import"./TextInput-DYAeGUqf.js";import"./SecondaryButton-Cxhg-0F8.js";import"./ActionMessage-D-EPanby.js";import"./PrimaryButton-CAUCLSJM.js";import"./InputLabel-B3cc5_qU.js";import"./FormSection-Ci5DrYBr.js";const g=i("h2",{class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"}," Profile ",-1),$={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},y={key:0},k={key:1},w={key:2},H={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(m){return(o,x)=>(e(),_(p,{title:"Profile"},{header:n(()=>[g]),default:n(()=>[i("div",null,[i("div",$,[o.$page.props.jetstream.canUpdateProfileInformation?(e(),r("div",y,[t(d,{user:o.$page.props.auth.user},null,8,["user"]),t(s)])):a("",!0),o.$page.props.jetstream.canUpdatePassword?(e(),r("div",k,[t(f,{class:"mt-10 sm:mt-0"}),t(s)])):a("",!0),o.$page.props.jetstream.canManageTwoFactorAuthentication?(e(),r("div",w,[t(u,{"requires-confirmation":m.confirmsTwoFactorAuthentication,class:"mt-10 sm:mt-0"},null,8,["requires-confirmation"]),t(s)])):a("",!0),t(l,{sessions:m.sessions,class:"mt-10 sm:mt-0"},null,8,["sessions"]),o.$page.props.jetstream.hasAccountDeletionFeatures?(e(),r(h,{key:3},[t(s),t(c,{class:"mt-10 sm:mt-0"})],64)):a("",!0)])])]),_:1}))}};export{H as default};
