import{r as p}from"./index-2506bfc3.js";import"./index-0dfb046a.js";import{N as x,s as E,u as F,a as O,b as P,c as _,d as U}from"./index-150eb7c2.js";/**
 * React Router DOM v6.20.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function w(){return w=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},w.apply(this,arguments)}function T(e,t){if(e==null)return{};var i={},n=Object.keys(e),s,a;for(a=0;a<n.length;a++)s=n[a],!(t.indexOf(s)>=0)&&(i[s]=e[s]);return i}function j(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function K(e,t){return e.button===0&&(!t||t==="_self")&&!j(e)}const B=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"],N=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",W=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,M=p.forwardRef(function(t,i){let{onClick:n,relative:s,reloadDocument:a,replace:o,state:u,target:c,to:r,preventScrollReset:f,unstable_viewTransition:d}=t,m=T(t,B),{basename:L}=p.useContext(x),b,v=!1;if(typeof r=="string"&&W.test(r)&&(b=r,N))try{let l=new URL(window.location.href),h=r.startsWith("//")?new URL(l.protocol+r):new URL(r),g=E(h.pathname,L);h.origin===l.origin&&g!=null?r=g+h.search+h.hash:v=!0}catch{}let R=F(r,{relative:s}),C=z(r,{replace:o,state:u,target:c,preventScrollReset:f,relative:s,unstable_viewTransition:d});function k(l){n&&n(l),l.defaultPrevented||C(l)}return p.createElement("a",w({},m,{href:b||R,onClick:v||a?n:k,ref:i,target:c}))});var y;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(y||(y={}));var S;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(S||(S={}));function z(e,t){let{target:i,replace:n,state:s,preventScrollReset:a,relative:o,unstable_viewTransition:u}=t===void 0?{}:t,c=O(),r=P(),f=_(e,{relative:o});return p.useCallback(d=>{if(K(d,i)){d.preventDefault();let m=n!==void 0?n:U(r)===U(f);c(e,{replace:m,state:s,preventScrollReset:a,relative:o,unstable_viewTransition:u})}},[r,c,f,n,s,i,e,a,o,u])}export{M as L};
//# sourceMappingURL=index-54304c9c.js.map
