(function(o,f){typeof exports=="object"&&typeof module<"u"?f(exports,require("react/jsx-runtime"),require("react")):typeof define=="function"&&define.amd?define(["exports","react/jsx-runtime","react"],f):(o=typeof globalThis<"u"?globalThis:o||self,f(o.sicilian={},o.ReactJSXRuntime,o.React))})(this,function(o,f,u){"use strict";function S(e){const r=document.cookie.split("; ").find(c=>c.startsWith(`${e}=`));return r?r.split("=")[1]:null}const w=({storageKey:e,storageType:t,migrate:r})=>{const{version:c,strategy:n}=r;if(console.log("a!"),t==="local"){const{state:s,version:a}=JSON.parse(localStorage.getItem(e));c>a&&localStorage.setItem(e,JSON.stringify({state:n(s,a),version:c}))}else if(t==="cookie"){const{state:s,version:a}=JSON.parse(S(e));c>a&&(document.cookie=`${e}=${JSON.stringify({state:n(s,a),version:c})}`)}},B=({storageKey:e,storageType:t,migrate:r,initState:c})=>{try{let n=null;if(r&&t&&w({storageKey:e,storageType:t,migrate:r}),t==="local"?n=localStorage.getItem(e):t==="session"?n=sessionStorage.getItem(e):t==="cookie"&&(n=S(e)),n!==null)return JSON.parse(n)}catch{typeof window<"u"&&console.error("Caro-Kann : Failed to read from storage")}return{state:c,version:0}},h=e=>{var s;const t=(e==null?void 0:e.local)??(e==null?void 0:e.cookie)??(e==null?void 0:e.session)??"",r=e!=null&&e.local?"local":e!=null&&e.cookie?"cookie":e!=null&&e.session?"session":null,c=((s=e==null?void 0:e.migrate)==null?void 0:s.version)??0,n=e==null?void 0:e.migrate;return{storageKey:t,storageType:r,storageVersion:c,migrate:n}},v=({storageKey:e,storageType:t,storageVersion:r,value:c})=>{const n=JSON.stringify({state:c,version:r});try{t==="local"?localStorage.setItem(e,n):t==="session"?sessionStorage.setItem(e,n):t==="cookie"&&(document.cookie=`${e}=${n}`)}catch(s){typeof window<"u"&&console.error("Caro-Kann : Failed to write to storage",s)}},k=(e,t)=>{const r=h(t),c=r.storageType?B({...r,initState:e}).state:e,n=new Set;let s=c;return{getBoard:()=>s,setBoard:d=>{s=typeof d=="function"?d(s):d,r.storageType&&v({...r,value:s}),n.forEach(O=>O())},subscribe:d=>(n.add(d),()=>n.delete(d)),getInitState:()=>e}},I=e=>{if(!/=>/.test(e))throw new Error('Invalid caro-kann selector format: missing " => "');if(/{|}/.test(e))throw new Error("Invalid caro-kann selector format: contains curly braces({ })");if(/&|:|\?/.test(e))throw new Error("Invalid caro-kann selector format: contains disallowed special characters(? : &)");const t=e.split("=>")[1].trim(),r=t.match(/\[(?!["'])([^\]]+)(?!["'])\]/);if(r)throw new Error(`Invalid path detected: ${r[0]}`);return Array.from(t.matchAll(/(?:\.|^)(\w+)|\["(.+?)"\]/g)).map(n=>n[1]||n[2]).slice(1)},m=(e,t,r)=>{t.length===1?e[t[0]]=r:(e[t[0]]||(e[t[0]]={}),m(e[t[0]],t.slice(1),r))},b=(e,t)=>r=>{e(c=>{const n=I(t.toString()),s={...c};return typeof r=="function"?m(s,n,r(t(c))):m(s,n,r),s})},g=(e,t)=>{const{getBoard:r,setBoard:c,subscribe:n,getInitState:s}=u.useContext(e),a=i=>()=>t?t(i()):i();return[u.useSyncExternalStore(n,a(r),a(s)),c]};function y(e,t){const r=u.createContext(k(e,t));return{useBoard:a=>{const[l,i]=a?g(r,a):g(r);return a?[l,b(i,a),i]:[l,i]},useDerivedBoard:a=>g(r,a)[0],BoardContext:({value:a,children:l})=>f.jsx(r.Provider,{value:k(a),children:l})}}o.playTartakower=y,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
